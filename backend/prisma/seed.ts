import { prisma } from '../src/prisma.js';

try {
const user1 = await prisma.user.create({
  data: { 
    email: "sarah.chen@techcorp.io", 
    username: "sarahcodes", 
    password: "$2b$10$YQeH8K7qvJZmVXhF4nK4H.xJ9pBGF3z8VqYH6MnE4rLkN2pW8sT9S",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahcodes"
  },
});

const user2 = await prisma.user.create({
  data: { 
    email: "marcus.dev@startup.com", 
    username: "marcusbuilds", 
    password: "$2b$10$zX9mN4kL2pQ8rT6yH3vW5.eR7fG9hJ1kM2nP4qS6tU8vX0yZ2aB4c",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcusbuilds"
  },
});

const user3 = await prisma.user.create({
  data: { 
    email: "elena.rodriguez@freelance.net", 
    username: "elenadesigns", 
    password: "$2b$10$aB3cD5eF7gH9iJ1kL3mN5.oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5i",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=elenadesigns"
  },
});

const user4 = await prisma.user.create({
  data: { 
    email: "james.wilson@agency.co", 
    username: "jameswrites", 
    password: "$2b$10$kM5nO7pQ9rS1tU3vW5xY7.zA1bC3dE5fG7hI9jK1lM3nO5pQ7rS9t",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jameswrites"
  },
});

const user5 = await prisma.user.create({
  data: { 
    email: "priya.patel@innovate.dev", 
    username: "priyaengineers", 
    password: "$2b$10$uV3wX5yZ7aB9cD1eF3gH5.iJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9c",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=priyaengineers"
  },
});

const user6 = await prisma.user.create({
  data: { 
    email: "alex.kim@cloudnative.io", 
    username: "alexkube", 
    password: "$2b$10$dE5fG7hI9jK1lM3nO5pQ7.rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7l",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexkube"
  },
});

const user7 = await prisma.user.create({
  data: { 
    email: "nina.okonkwo@studio.design", 
    username: "ninacreates", 
    password: "$2b$10$mN5oP7qR9sT1uV3wX5yZ7.aB9cD1eF3gH5iJ7kL9mN1oP3qR5sT7u",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ninacreates"
  },
});

const user8 = await prisma.user.create({
  data: { 
    email: "tom.anderson@backend.dev", 
    username: "tomscales", 
    password: "$2b$10$vW3xY5zA7bC9dE1fG3hI5.jK7lM9nO1pQ3rS5tU7vW9xY1zA3bC5d",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=tomscales"
  },
});

const user9 = await prisma.user.create({
  data: { 
    email: "lisa.nakamura@frontend.pro", 
    username: "lisareacts", 
    password: "$2b$10$eF3gH5iJ7kL9mN1oP3qR5.sT7uV9wX1yZ3aB5cD7eF9gH1iJ3kL5m",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisareacts"
  },
});

const user10 = await prisma.user.create({
  data: { 
    email: "david.moore@security.tech", 
    username: "davidsecures", 
    password: "$2b$10$nO1pQ3rS5tU7vW9xY1zA3.bC5dE7fG9hI1jK3lM5nO7pQ9rS1tU3v",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=davidsecures"
  },
});

  const post1 = await prisma.post.create({
    data: { 
      content: "Spent the last three days refactoring legacy code. Finally got test coverage above 80%. Small victories matter.", 
      authorId: user1.id 
    },
  });

  const post2 = await prisma.post.create({
    data: { 
      content: "Hot take: Documentation is just as important as the code itself. Your future self will thank you.", 
      authorId: user2.id 
    },
  });

  const post3 = await prisma.post.create({
    data: { 
      content: "Designers and developers need to collaborate earlier in the process. Saved our team weeks on the recent project by having daily syncs.", 
      authorId: user3.id 
    },
  });

  const post4 = await prisma.post.create({
    data: { 
      content: "Working on a technical blog post about state management patterns. Anyone interested in reviewing a draft?", 
      authorId: user4.id 
    },
  });

  const post5 = await prisma.post.create({
    data: { 
      content: "Just deployed to production on a Friday afternoon. Yes, I like to live dangerously. (Everything went fine, somehow.)", 
      authorId: user5.id 
    },
  });

  const post6 = await prisma.post.create({
    data: { 
      content: "Kubernetes finally clicked for me after setting up a homelab cluster. Hands-on experience > tutorials every time.", 
      authorId: user6.id 
    },
  });

  const post7 = await prisma.post.create({
    data: { 
      content: "Reminder: Accessibility isn't a feature, it's a requirement. Just finished an audit and we have work to do.", 
      authorId: user7.id 
    },
  });

  const post8 = await prisma.post.create({
    data: { 
      content: "Database optimization turned a 30-second query into 200ms. Proper indexing and query analysis are superpowers.", 
      authorId: user8.id 
    },
  });

  const post9 = await prisma.post.create({
    data: { 
      content: "CSS Grid has completely changed how I approach layouts. Can't believe I relied so heavily on flexbox for everything before.", 
      authorId: user9.id 
    },
  });

  const post10 = await prisma.post.create({
    data: { 
      content: "Security audit results came back. We're implementing 2FA and rotating all API keys this week. Better safe than sorry.", 
      authorId: user10.id 
    },
  });

  await prisma.comment.createMany({
    data: [
      { 
        content: "80% is impressive for legacy code! What testing framework are you using?", 
        postId: post1.id, 
        authorId: user2.id 
      },
      { 
        content: "This. I've been burned too many times by undocumented APIs.", 
        postId: post2.id, 
        authorId: user8.id 
      },
      { 
        content: "Completely agree. Our design-dev handoffs got so much smoother once we started collaborating in Figma together.", 
        postId: post3.id, 
        authorId: user9.id 
      },
      { 
        content: "I'd love to review! Been researching state management myself lately.", 
        postId: post4.id, 
        authorId: user1.id 
      },
      { 
        content: "You're braver than I am. Our team has a strict no-deploy-Friday policy after last year's incident.", 
        postId: post5.id, 
        authorId: user6.id 
      },
      { 
        content: "Same here! Nothing beats actually breaking things and fixing them yourself.", 
        postId: post6.id, 
        authorId: user5.id 
      },
      { 
        content: "This is so important. Happy to help with remediation if you need an extra pair of eyes.", 
        postId: post7.id, 
        authorId: user3.id 
      },
      { 
        content: "Query optimization is seriously underrated. What tools do you use for analysis?", 
        postId: post8.id, 
        authorId: user4.id 
      },
      { 
        content: "Grid is amazing! The combination of Grid for layout + Flexbox for components is chef's kiss.", 
        postId: post9.id, 
        authorId: user7.id 
      },
      { 
        content: "Good call on the rotation. We automated our key rotation last quarter and it's been a lifesaver.", 
        postId: post10.id, 
        authorId: user10.id 
      },
      { 
        content: "Jest with React Testing Library. The learning curve was steep but worth it.", 
        postId: post1.id, 
        authorId: user1.id 
      },
      { 
        content: "Friday deploys build character though, right? Right?", 
        postId: post5.id, 
        authorId: user2.id 
      },
      { 
        content: "Would love your input on the section about Context API vs Redux. Sending you a link.", 
        postId: post4.id, 
        authorId: user4.id 
      },
      { 
        content: "We use pganalyze for Postgres. Game changer for identifying slow queries.", 
        postId: post8.id, 
        authorId: user8.id 
      },
      { 
        content: "The early collaboration point can't be stressed enough. Cuts down on so many back-and-forth revisions.", 
        postId: post3.id, 
        authorId: user6.id 
      },
    ],
  });

  await prisma.like.createMany({
    data: [
      { postId: post1.id, userId: user2.id },
      { postId: post1.id, userId: user3.id },
      { postId: post1.id, userId: user8.id },
      { postId: post2.id, userId: user1.id },
      { postId: post2.id, userId: user4.id },
      { postId: post2.id, userId: user8.id },
      { postId: post3.id, userId: user6.id },
      { postId: post3.id, userId: user9.id },
      { postId: post4.id, userId: user1.id },
      { postId: post4.id, userId: user5.id },
      { postId: post5.id, userId: user2.id },
      { postId: post5.id, userId: user6.id },
      { postId: post5.id, userId: user7.id },
      { postId: post6.id, userId: user5.id },
      { postId: post6.id, userId: user10.id },
      { postId: post7.id, userId: user3.id },
      { postId: post7.id, userId: user9.id },
      { postId: post8.id, userId: user4.id },
      { postId: post8.id, userId: user10.id },
      { postId: post9.id, userId: user3.id },
      { postId: post9.id, userId: user7.id },
      { postId: post10.id, userId: user6.id },
      { postId: post10.id, userId: user10.id },
    ],
  });

  console.log("Seed successfully added to the database.");
} catch (err) {
  console.error(err);
} finally {
  await prisma.$disconnect();
}