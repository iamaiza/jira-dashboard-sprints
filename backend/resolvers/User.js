const User = {
    tasks: async (parent, args, { prisma }) => {
        const task = await prisma.task.findMany({ where: { assigneeId: parseInt(parent.id) } })
        return task;
    },
    comments: async(parent, args, { prisma }) => {
        const comments = await prisma.comment.findMany({ where: { userId: parseInt(parent.id) } });
        return comments;
    }
};

module.exports = User;