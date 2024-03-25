const User = {
    tasks: async (parent, args, { prisma }) => {
        const task = await prisma.task.findUnique({ where: { assigneeId: parseInt(parent.id) } })
    }
};

module.exports = User;