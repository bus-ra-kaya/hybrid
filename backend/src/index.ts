import "dotenv/config";
import { prisma } from "./prisma.js";
import type { ErrorRequestHandler } from "express";
import express from "express";

interface EnhancedError extends Error{
	status?: number;
	statusCode?: number;
}

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/posts", async (req, res) => {
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
})

const errorHandler: ErrorRequestHandler = ((err: EnhancedError, req, res, next)=> {
	console.error(err.stack);

	const status = err.status || err.statusCode || 500;
	res.status(status).json({
		error: status >= 500 ? "Internal Server Error": err.message,
		logId: Date.now()
	});
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})
