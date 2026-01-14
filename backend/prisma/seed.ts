import {prisma } from '../src/prisma.js'

try{
	await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
	data: { email: "alice@wonder.land", 
					username: "AliceInCodeLand", 
					password: "pass123" },
	});

	const bob = await prisma.user.create({
	data: { email: "bob@builder.com", 
					username: "BobTheCoder", 
					password: "pass123" },
	});

	const charlie = await prisma.user.create({
		data: { email: "charlie@chocolate.factory", 
						username: "CharlieChoco", 
						password: "pass123" },
	});

	const post1 = await prisma.post.create({
  	data: { content: "Just built a bug-free castle in one day! 🏰", 
						authorId: alice.id },
	});

	const post2 = await prisma.post.create({
  	data: { content: "Coding adventures are better with chocolate. 🍫", 
						authorId: bob.id },
	});

	const post3 = await prisma.post.create({
  	data: { content: "Debugging is like being a detective in a crime movie where you are also the murderer. 🕵️‍♀️",
    				authorId: charlie.id,},
	});

	await prisma.comment.createMany({
  	data: [
		{ content: "Love this! 🏰", 
			postId: post1.id, 
			authorId: bob.id },

		{ content: "Chocolate makes everything better 🍫", 
			postId: post2.id, 
			authorId: alice.id },

		{ content: "I feel personally attacked 😂", 
			postId: post3.id, 
			authorId: charlie.id },

		{ content: "Detective mode ON 🔎", 
			postId: post3.id, 
			authorId: bob.id },
  		],
	});


	await prisma.like.createMany({
		data: [
			{ postId: post1.id, userId: alice.id },
			{ postId: post1.id, userId: charlie.id },
			{ postId: post2.id, userId: alice.id },
			{ postId: post3.id, userId: bob.id },
			{ postId: post3.id, userId: charlie.id },
		],
	});

	console.log("Seed successfully added to the database.");
}
catch(err){
	console.error(err);
}
finally{
	await prisma.$disconnect();
}