import express from 'express';
import type {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

// need to add rate limiting and delay time (whether info exists or not) to both endpoints

router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const {email, username, password} = req.body;

  if(!email || !username || !password){
    return res.status(400).json({error: 'All fields are required.'});
  }
  if (typeof password !== "string") {
    return res.status(400).json({ error: "Invalid password" });
  }
  if(password.trim().length < 8){
    return res.status(400).json({error: 'Password must be at least 8 characters long'})
  }

  const existingUser = await prisma.user.findFirst({
    where:{
      OR: [
        { email },
        { username }
      ]
    }
  });

  if(existingUser){
    return res.status(409).json({
      error: existingUser.email === email
      ? 'Email already in use'
      : 'Username already taken'
    });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword
    },
    select: {
      id: true,
      username: true,
      avatarUrl: true,
    }
  });

  const token = jwt.sign(
    {userId: user.id},
    JWT_SECRET,
    {expiresIn: '7d'}
  );

  res.status(201).json({
    message: 'User created successfully',
    token,
    user
  });
}));

router.post('/login', asyncHandler (async (req: Request, res: Response) => {
  const{ email, password } = req.body;

  if( !email ){
    return res.status(400).json({error: 'Email is required.'});
  }
  else if( ! password){
    return res.status(400).json({error: 'Password is required.'});
  }

  const user = await prisma.user.findUnique({
    where: {email}
  });

  if(!user){
    return res.status(401).json({error: 'Invalid credentials'});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(401).json({error: 'Invalid credentials'});
  }

  const token = jwt.sign(
    {userId: user.id},
    JWT_SECRET,
    {expiresIn: '7d'}
  );

  const userWithoutPassword = {
    id: user.id,
    username: user.username,
    avatarUrl: user.avatarUrl
  };

  res.json({
    message: 'Login successful',
    token,
    user: userWithoutPassword
  });
}));

export default router;