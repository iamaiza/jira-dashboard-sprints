const Task = {
  sprintId: async (parent, args, { prisma }) => {
    const sprint = await prisma.sprint.findUnique({
      where: { id: parseInt(parent.sprintId) },
    });
    return sprint;
  },
  assigneeId: async (parent, args, { prisma }) => {
    if (parent.assigneeId) {
      const assignee = await prisma.user.findUnique({
        where: { id: parseInt(parent?.assigneeId) },
      });
      return assignee;
    } else {
      return null;
    }
  },
  reporterId: async (parent, args, { prisma }) => {
    if (parent.reporterId) {
      const reporter = await prisma.user.findUnique({
        where: { id: parseInt(parent.reporterId) },
      });
      return reporter;
    } else {
      return null;
    }
  },
  viewerId: async (parent, args, { prisma }) => {
    if (parent.viewerId) {
      const reviewer = await prisma.user.findUnique({
        where: { id: parseInt(parent.viewerId) },
      });
      return reviewer;
    } else {
      return null;
    }
  },
  qaId: async (parent, args, { prisma }) => {
    if (parent.qaId) {
      const qa = await prisma.user.findUnique({
        where: { id: parseInt(parent.qaId) },
      });
      return qa;
    } else {
      return null;
    }
  },
  comments: async (parent, args, { prisma }) => {
    const comments = await prisma.comment.findMany({
      where: { taskId: parseInt(parent.id) },
    });
    return comments;
  },
  issues: async (parent, args, { prisma }) => {
    const issue = await prisma.issue.findMany({
      where: { taskId: parseInt(parent.id) },
    });
    console.log(issue);
    return issue;
  },
};

module.exports = Task;
