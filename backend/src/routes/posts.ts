import express from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get("/", asyncHandler(async (req: Request, res: Response) => {
  const take = 10;
  const skip = Number.parseInt(req.query.offset as string) || 0;
    
  const posts = await prisma.post.findMany({
    take:take +1,
    skip:skip,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          username: true,
          avatarUrl: true,
        },
      },
      _count: {
      select: {
        likes: true,
        comments: true,
      }
    }
    },
    });


  const hasNextPage = posts.length > take;
  const results = hasNextPage ? posts.slice(0, take) : posts;

  const formatted = results.map(post => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      username: post.author?.username || "Deleted user",
      avatarUrl: post.author?.avatarUrl || null,
      likes: post._count.likes,
      comments: post._count.comments,
  }));

    res.json({
      data: formatted,
      hasNextPage
    });
}))

export default router;