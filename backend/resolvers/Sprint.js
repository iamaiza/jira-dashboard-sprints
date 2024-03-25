const Sprint = {
    tasks: async(parent, args, { prisma }) => {
        const sprint = await prisma.task.findUnique({ where: { sprintId: parseInt(parent.id) } });
        return sprint;
    },
};

module.exports = Sprint;