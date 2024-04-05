const User = {
    aTasks: async (parent, args, { prisma }) => {
        const task = await prisma.task.findMany({ where: { assigneeId: parseInt(parent.id) } })
        return task;
    },
    rTasks: async(parent, args, { prisma }) => {
        const task = await prisma.task.findMany({ where: { reporterId: parseInt(parent.id) } })
        return task;
    },
    comments: async(parent, args, { prisma }) => {
        const comments = await prisma.comment.findMany({ where: { userId: parseInt(parent.id) } });
        return comments;
    },
    aIssues: async(parent, args, { prisma }) => {
        const issue = await prisma.issue.findMany({ where: { assigneeId: parseInt(parent.id) } })
        console.log(issue);
        return issue
    },
    rIssues: async(parent, args, { prisma }) => {
        const issue = await prisma.issue.findMany({ where: { reporterId: parseInt(parent.id) } })
        console.log(issue);
        return issue
    },
    vIssues: async(parent, args, { prisma }) => {
        const issue = await prisma.issue.findMany({ where: { viewerId: parseInt(parent.id) } })
        console.log(issue);
        return issue
    },
    qaIssues: async(parent, args, { prisma }) => {
        const issue = await prisma.issue.findMany({ where: { qaId: parseInt(parent.id) } })
        console.log(issue);
        return issue
    },
};

module.exports = User;