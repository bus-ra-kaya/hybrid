import express from 'express';
import type {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

const APP_NAME = process.env.APP_NAME;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESERVED = new Set(['admin', 'support', 'api', APP_NAME]);
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

router.post('/check-email', asyncHandler(async(req: Request, res: Response) => {
  
  const rawEmail = req.body.email;

  if(typeof rawEmail !== 'string') {
    return res.status(400).json({error: 'Invalid email'});
  }

  const email = rawEmail.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: email},
    select: {id: true},
  });
  res.json({exists: !!user});
}))

// need to add rate limiting and delay time (whether info exists or not) to both endpoints

// need to consider locality with toLowerCase()

// separate the name into two, a display name and a canonical name which is the same but lower case.?

router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const {email: rawEmail, username: rawUsername, password} = req.body;

  if(!rawEmail || !rawUsername || !password){
    return res.status(400).json({error: 'All fields are required.'});
  }
  if (typeof password !== "string") {
    return res.status(400).json({ error: "Invalid password" });
  }
  if(typeof rawUsername !== 'string'){
    return res.status(400).json({ error: "Invalid username" });
  }
  if(typeof rawEmail !== 'string'){
    return res.status(400).json({error: 'Invalid email'});
  }

  const email = rawEmail.trim().toLowerCase();
  const username = rawUsername.trim().toLowerCase();

  if(username.length < 3 || username.length > 20){
    return res.status(400).json({error: 'Username must be between 3 and 20 characters long'});
  };
  if(RESERVED.has(username)){
    return res.status(400).json({ error: `Username cannot be ${username}`});
  };

  if(!EMAIL_REGEX.test(email)){
    return res.status(400).json({ error: 'Invalid email format'});
  }

  if(password.length < 8){
    return res.status(400).json({error: 'Password must be at least 8 characters long'});
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

  try {
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
  } catch(err: unknown){
    if(
      err &&
      typeof err === 'object' && 'code' in err && err.code === 'P2002' && 'meta' in err){
        const meta = err.meta as { target?: string[]};
        const field = meta.target?.[0];

        if (field === 'email') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    if (field === 'username') {
      return res.status(409).json({ error: 'Username already taken' });
    }
    return res.status(409).json({ error: 'User already exists' });
  }
  throw err;
  }
}));

// might need to go over the err type, meta and field

router.post('/login', asyncHandler (async (req: Request, res: Response) => {
  const{ email: rawEmail, password } = req.body;

  if( !rawEmail ){
    return res.status(400).json({error: 'Email is required.'});
  }
  if(!password){
    return res.status(400).json({error: 'Password is required.'});
  }
  if(typeof rawEmail !== 'string'){
    return res.status(400).json({error: 'Invalid email'});
  }
  if(typeof password !== 'string'){
    return res.status(400).json({error: 'Invalid password'});
  }

  const email = rawEmail.trim().toLowerCase();

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