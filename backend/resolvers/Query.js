const { verify } = require("jsonwebtoken")

const Query = {
    currentUser: async(_, args, { prisma }) => {
        const userId = args.userId;
        const secret = process.env.JWT_SECRET_KEY || "myjwtsecretkey";
        const decodedToken = verify(userId, secret);
        const id = decodedToken?.userId;

        if(!id) {
            return { message: "User not found." }
        }
        const user = await prisma.user.findUnique({ where: { id } })
        return user;
    },
    users: async(_, args, { prisma }) => {
        const users = await prisma.user.findMany();
        return users;
    },
    sprints: async(_, args, { prisma }) => {
        const sprints = await prisma.sprint.findMany();
        return sprints;
    },
    sprint: async(_, args, { prisma }) => {
        const id = args.id;
        const sprint = await prisma.sprint.findUnique({ where: { id: parseInt(id) } })
        if(!sprint) {
            return { message: "No sprint found with this id" }
        }
        return sprint;
    },
    tasks: async(_, args, { prisma }) => {
        const tasks = await prisma.task.findMany();
        return tasks;
    },
}

module.exports = Query;