const Task = {
    sprintId: async(parent, args, { prisma }) => {
        const sprint = await prisma.sprint.findUnique({ where: { id: parseInt(parent.sprintId) } })
        return sprint;
    },
    assigneeId: async(parent, args, { prisma }) => {
        const assignee = await prisma.user.findUnique({ where: { id: parseInt(parent.assigneeId) } });
        return assignee;
    },
};

module.exports = Task;