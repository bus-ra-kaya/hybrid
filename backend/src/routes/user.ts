import express from 'express';
import type { Request, Response} from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { prisma } from '../prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// will need to rewrite the file location and whatnot once I switch to cloud for storing the images

// how does the cb error exactly work?

// use fs.promises instead of sync methods?

// return full url in response?

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/profile-images');

    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true});
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {

    const userId = req.user?.id;
    const ext = path.extname(file.originalname);
    const filename = `${userId}-${Date.now()}${ext}`;
    cb(null, filename);
  }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = /^image\/(jpeg|png|webp)$/;
  const allowedExtensions = /\.(jpe?g|png|webp)$/i;
    const isMimeTypeValid = allowedMimeTypes.test(file.mimetype);
  const isExtensionValid = allowedExtensions.test(path.extname(file.originalname));

  if(isMimeTypeValid && isExtensionValid){
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {fileSize: 5 * 1024 * 1024}
});

// a little confused about multer error handling and the callback function

router.post('/me/avatar', authenticateToken, (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large (max 5MB)' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
},  asyncHandler( async (req: Request, res: Response) => {

  if(!req.user){
    return res.status(401).json({error: 'Invalid or expired token'});
  }
  if(!req.file){
    return res.status(400).json({error: 'No file uploaded'});
  }

  const userId = req.user.id;

  const existingUser = await prisma.user.findUnique({
    where: { id: userId},
    select: { avatarUrl: true}
  });

  if ( existingUser?.avatarUrl){
    const oldFilePath = path.join(__dirname, '..', existingUser.avatarUrl);
    if (fs.existsSync(oldFilePath)){
      fs.unlinkSync(oldFilePath);
    }
  }

  const imagePath = path.join('uploads','profile-images', req.file.filename);
  try {
    await prisma.user.update({
      where: {id: userId},
      data: { avatarUrl: imagePath}
    })

    res.status(200).json({
        message: 'Profile image updated',
        avatarUrl: imagePath,
      });
    } catch (err) {
      const uploadedFilePath = path.join(__dirname, '..', imagePath);
      if (fs.existsSync(uploadedFilePath)){
        fs.unlinkSync(uploadedFilePath);
      }
      throw err;
    }
}));

router.get('/me/avatar', authenticateToken, asyncHandler(async (req: Request, res: Response) => {

  if (!req.user?.id) {
  return res.status(401).json({ error: 'Unauthorized' });
}
  const userId = req.user?.id;

 const user = await prisma.user.findUnique({
    where: { id: userId},
    select: { avatarUrl: true}
  });

  if (!user?.avatarUrl){
    return res.status(404).json({ error: 'Avatar not found' });
  }

  const filePath = path.join(__dirname, '..', user.avatarUrl);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Avatar file not found' });
  }

  res.sendFile(filePath);
}))

export default router;
