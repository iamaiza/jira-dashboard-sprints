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
        const tasks = await prisma.task.findMany({
            where: { assigneeId: id }
        })
        return user;
    },
    users: async(_, args, { prisma }) => {
        const users = await prisma.user.findMany();
        return users;
    },
    sprints: async(_, args, { prisma }) => {
        const sprints = await prisma.sprint.findMany({
            orderBy: [
                {
                    id: "asc"
                }
            ]
        });
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
        const tasks = await prisma.task.findMany({
            orderBy: [
                {
                    id: "asc"
                }
            ]
        });
        return tasks;
    },
    task: async(_, args, { prisma }) => {
        const id = args.id;
        const task = await prisma.task.findUnique({ where: { id: parseInt(id) } })
        if(!task) {
            return { message: "No task found with this id" }
        }
        return task;
    },
    issues: async(_, args, { prisma }) => {
        const issues = await prisma.issue.findMany({
            orderBy: [
                {
                    id: "asc"
                }
            ]
        });
        return issues;
    },
    issue: async(_, args, { prisma }) => {
        const id = args.id;
        const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } })
        if(!issue) {
            return { message: "No issue found with this id" }
        }
        return issue;
    }
}

module.exports = Query;