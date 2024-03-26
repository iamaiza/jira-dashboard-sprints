const Sprint = {
    tasks: async(parent, args, { prisma }) => {
        const sprint = await prisma.task.findMany({ where: { sprintId: parseInt(parent.id) } });
        return sprint;
    },
};

module.exports = Sprint;