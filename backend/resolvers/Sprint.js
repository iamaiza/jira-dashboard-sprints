const Sprint = {
    tasks: async(parent, args, { prisma }) => {
        const sprint = await prisma.task.findMany({ where: { sprintId: parseInt(parent.id) } });
        return sprint;
    },
    issues: async(parent, args, { prisma }) => {
        const issue = await prisma.issue.findMany({ where: { sprintId: parseInt(parent.id) } })
        console.log(issue);
        return issue;
    }
};

module.exports = Sprint;