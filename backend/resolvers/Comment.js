const Comment = {
    userId: async(parent, args, { prisma }) => {
        const user = await prisma.user.findUnique({ where: { id: parseInt(parent.userId) } });
        return user;
    },
    taskId: async(parent, args, { prisma }) => {
        const task = await prisma.task.findUnique({ where: { id: parseInt(parent.taskId) } });
        return task;
    }
};

module.exports = Comment;