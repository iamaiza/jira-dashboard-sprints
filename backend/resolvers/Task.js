const Task = {
    sprintId: async(parent, args, { prisma }) => {
        const sprint = await prisma.sprint.findUnique({ where: { id: parseInt(parent.sprintId) } })
        return sprint;
    },
    assigneeId: async(parent, args, { prisma }) => {
        const assignee = await prisma.user.findUnique({ where: { id: parseInt(parent.assigneeId) } });
        return assignee;
    },
    comments: async(parent, args, { prisma }) => {
        const comments = await prisma.comment.findMany({ where: { taskId: parseInt(parent.id) } });
        return comments;
    }
};

module.exports = Task;