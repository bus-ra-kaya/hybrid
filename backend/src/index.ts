import "dotenv/config";
import { prisma } from "./prisma.js";
import express from "express";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/posts", async (req, res) => {
    
  const posts = await prisma.post.findMany({
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

		const formatted = posts.map(post => ({
		  id: post.id,
			text: post.content,
			date: post.createdAt,
			username: post.author.username,
			avatarUrl: post.author.avatarUrl,
			likes: post._count.likes,
			comments: post._count.comments,
	}));

    res.json(formatted);
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})
