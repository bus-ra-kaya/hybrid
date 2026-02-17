import type { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
  throw new Error('JWT_SECRET is not defined');
}



declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      }
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  let token;
  if (authHeader) {
    token = authHeader.split(' ')[1];
  }

  if(!token){
    return res.status(401).json({error: 'Access token required.'});
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {userId: string};
    //might need to go over this line

    req.user = {id: decoded.userId};

    next();
  } catch (err){
    console.log(err);
    return res.status(401).json({error: 'Invalid or expired token'});
  }

}

