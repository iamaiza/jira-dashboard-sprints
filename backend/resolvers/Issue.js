const Issue = {
    taskId: async(parent, args, { prisma }) => {
        const task = await prisma.task.findUnique({ where: { id: parseInt(parent.taskId) } })
        return task;
    },
    sprintId: async(parent, args, { prisma }) => {
        const sprint = await prisma.sprint.findUnique({ where: { id: parseInt(parent.sprintId) } })
        return sprint;
    },
    assigneeId: async(parent, args, { prisma }) => {
        const assignee = await prisma.user.findUnique({ where: { id: parseInt(parent.assigneeId) } })
        return assignee;
    },
    reporterId: async(parent, args, { prisma }) => {
        const reporter = await prisma.user.findUnique({ where: { id: parseInt(parent.reporterId) } });
        return reporter;
    },
    viewerId: async(parent, args, { prisma }) => {
        const reviewer = await prisma.user.findUnique({ where: { id: parseInt(parent.viewerId) } });
        return reviewer;
    }, 
    qaId: async(parent, args, { prisma }) => {
        const qa = await prisma.user.findUnique({ where: { id: parseInt(parent.qaId) } });
        return qa;
    }, 
    comments: async(parent, args, { prisma }) => {
        const comment = await prisma.comment.findMany({ where: { issueId: parseInt(parent.id) } })
        return comment;
    }
};

module.exports = Issue;