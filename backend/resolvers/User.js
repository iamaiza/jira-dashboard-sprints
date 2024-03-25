const User = {
    tasks: async (parent, args, { prisma }) => {
        const task = await prisma.task.findUnique({ where: { assigneeId: parseInt(parent.id) } })
        return task;
    }
};

module.exports = User;