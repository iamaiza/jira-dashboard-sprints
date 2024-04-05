const Task = {
    sprintId: async(parent, args, { prisma }) => {
        const sprint = await prisma.sprint.findUnique({ where: { id: parseInt(parent.sprintId) } })
        return sprint;
    },
    assigneeId: async(parent, args, { prisma }) => {
        const assignee = await prisma.user.findUnique({ where: { id: parseInt(parent.assigneeId) } });
        return assignee;
    },
    reporterId: async(parent, args, { prisma }) => {
        const reporter = await prisma.user.findUnique({ where: { id: parseInt(parent.reporterId) } });
        return reporter;
    },
    comments: async(parent, args, { prisma }) => {
        const comments = await prisma.comment.findMany({ where: { taskId: parseInt(parent.id) } });
        return comments;
    },
    issues: async(parent, args, { prisma }) => {
        const issue = await prisma.issue.findMany({ where: { taskId: parseInt(parent.id) } })
        console.log(issue);
        return issue
    },
};

module.exports = Task;