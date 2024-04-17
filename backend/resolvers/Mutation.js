const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const { encryptToken, encryptEmail, decryptEmail } = require("../utils");
const nodemailer = require("nodemailer");

const Mutation = {
  registerUser: async (_, args, { prisma }) => {
    const {
      name,
      email,
      password,
      imgUrl,
      jobTitle,
      department,
      organization,
      location,
    } = args.data;
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (isUser) {
      return { message: "User already exists" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        imgUrl,
        jobTitle,
        department,
        organization,
        location,
      },
    });
    const secret = process.env.JWT_SECRET_KEY || "myjwtsecretkey";
    const token = sign({ userId: user.id }, secret);
    return { token, user };
  },
  loginUser: async (_, args, { prisma }) => {
    const { email, password } = args.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "User not found." };
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return { message: "Incorrect password" };
    }
    const secret = process.env.JWT_SECRET_KEY || "myjwtsecretkey";
    const token = sign({ userId: user.id }, secret);
    return { token, user };
  },
  forgotPassword: async (_, args, { prisma }) => {
    const { email } = args.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "User not found" };
    }
    const token = crypto.randomBytes(64).toString("hex");
    const encryptedToken = encryptToken(token);
    const encryptedEmail = encryptEmail(email);

    const resetPasswordLink = `http://localhost:3000/reset-password?email=${encryptedEmail}&token=${encryptedToken}`;
    const transporter = nodemailer.createTransport({
      host: "smtp.yopmail.com",
      port: 25,
      auth: {
        user: "lh3000",
        pass: "1234567890",
      },
    });

    const mailOptions = {
      from: "lh3000@gmail.com",
      to: user?.email,
      subject: "Forgot Password",
      html: `Click on the following link to change your password: <a href="${resetPasswordLink}">${resetPasswordLink}</a>`,
    };

    const info = await transporter.sendMail(mailOptions);
    if (info.rejected.length > 0) {
      return { message: "Failed to send the link. Try again later." };
    }
    return {
      message: "Link sent to your email successfully. You can visit it now.",
    };
  },
  resetPassword: async (_, args, { prisma, req }) => {
    const { email } = args;
    const { newPassword, confirmPassword } = args.data;
    if (typeof email === "string") {
      const decryptedEmail = decryptEmail(email);

      const user = await prisma.user.findUnique({
        where: { email: decryptedEmail },
      });
      if (!user) {
        return { message: "No user found with this email" };
      }
      if (
        newPassword !== confirmPassword ||
        newPassword.length !== confirmPassword.length
      ) {
        return { message: "Password mismatch." };
      }

      const isMatch = await bcrypt.compare(newPassword, user?.password);
      if (isMatch) {
        return {
          message: "New password matches with previous one. Try another one.",
        };
      }
      const hashPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { email: decryptedEmail },
        data: { password: hashPassword },
      });
      return { message: "Success!" };
    }
    return { message: "Invalid email" };
  },
  updateUser: async (_, args, { prisma }) => {
    const id = args.id;
    const { jobTitle, department, organization, location } = args.data;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      console.log("Couldn't find user");
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { jobTitle, department, organization, location },
    });
    return updatedUser;
  },
  deleteUser: async (_, args, { prisma }) => {
    const id = args.id;
    const { field, value } = args.data;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      return { message: "User not found." };
    }

    let deletedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        jobTitle: field === "jobTitle" ? value : user.jobTitle,
        department: field === "department" ? value : user.department,
        organization: field === "organization" ? value : user.organization,
        location: field === "location" ? value : user.location,
      },
    });

    return deletedUser;
  },
  createSprint: async (_, args, { prisma }) => {
    const { title, description, status, startDate, endDate } = args.data;
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const sprint = await prisma.sprint.create({
      data: {
        title,
        description,
        status,
        startDate: date1.toISOString(),
        endDate: date2.toISOString(),
      },
    });
    return sprint;
  },
  createTask: async (_, args, { prisma }) => {
    const {
      title,
      description,
      status,
      attachment,
      sprintId,
      assigneeId,
      priority,
    } = args.data;
    const parseAssigneeId = parseInt(assigneeId);
    const parseSprintId = parseInt(sprintId);

    if (assigneeId !== "none" && !isNaN(assigneeId)) {
      const user = await prisma.user.findUnique({
        where: {
          id: parseAssigneeId,
        },
      });
      if (!user) {
        return { message: "User not found." };
      }
    }

    const sprint = await prisma.sprint.findUnique({
      where: { id: parseSprintId },
    });
    if (!sprint) {
      return { message: "No sprint found." };
    }

    let taskData = {
      title,
      description,
      status,
      attachment,
      priority,
      sprintId: parseSprintId,
    };

    if(assigneeId !== "none") {
      taskData = {...taskData, assigneeId: parseAssigneeId }
    }

    const task = await prisma.task.create({
      data: taskData,
    });

    return task;
  },
  updateDescription: async (_, args, { prisma }) => {
    const id = args.id;
    const { description } = args.data;
    const updatedDesc = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { description },
    });
    return updatedDesc;
  },
  createComment: async (_, args, { prisma }) => {
    const { text, userId, issueId, taskId } = args.data;
    const parseTaskId = parseInt(taskId);
    const parseUserId = parseInt(userId);
    const parseIssueId = parseInt(issueId);

    const user = await prisma.user.findUnique({
      where: { id: parseUserId },
    });
    if (!user) {
      return { message: "User not found" };
    }
    if (taskId) {
      const task = await prisma.task.findUnique({
        where: { id: taskId && parseTaskId },
      });
      if (!task) {
        return { message: "Task not found" };
      }
    }

    if (issueId) {
      const issue = await prisma.issue.findUnique({
        where: { id: parseIssueId },
      });
      if (!issue) {
        return { message: "Issue not found" };
      }
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        userId: parseUserId,
        taskId: parseTaskId,
        issueId: parseIssueId,
      },
    });
    return comment;
  },
  updateComment: async (_, args, { prisma }) => {
    const id = args.id;
    const { text } = args.data;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { text },
    });
    return updatedComment;
  },
  deleteComment: async (_, args, { prisma }) => {
    const id = args.id;
    const deletedComment = await prisma.comment.delete({
      where: { id: parseInt(id) },
    });
    return deletedComment;
  },
  updateTaskStatus: async (_, args, { prisma }) => {
    const id = args.id;
    const { status } = args.data;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });
    if (!task) {
      return { message: "Task not found" };
    }
    const updatedStatus = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    return updatedStatus;
  },
  createIssue: async (_, args, { prisma }) => {
    const {
      issueType,
      status,
      attachment,
      description,
      label,
      priority,
      taskId,
      assigneeId,
      reporterId,
      viewerId,
      qaId,
      sprintId,
      summary,
    } = args.data;

    const parseAssigneeId = parseInt(assigneeId);
    const parseReporterId = parseInt(reporterId);
    const parseReviewerId = parseInt(viewerId);
    const parseQaId = parseInt(qaId);
    const parseSprintId = parseInt(sprintId);
    const parseTaskId = parseInt(taskId);

    const user = await prisma.user.findMany({
      where: {
        OR: [
          { id: parseAssigneeId },
          { id: parseReporterId },
          { id: parseReviewerId },
          { id: parseQaId },
        ],
      },
    });
    if (!user) {
      return { message: "User not found" };
    }

    const task = await prisma.task.findUnique({
      where: { id: parseTaskId },
    });
    if (!task) {
      return { message: "Task not found" };
    }

    const sprint = await prisma.sprint.findUnique({
      where: { id: parseSprintId },
    });
    if (!sprint) {
      return { message: "Sprint not found" };
    }

    const issue = await prisma.issue.create({
      data: {
        issueType,
        status,
        attachment,
        description,
        label,
        priority,
        taskId: parseTaskId,
        assigneeId: parseAssigneeId,
        reporterId: parseReporterId,
        viewerId: parseReviewerId,
        qaId: parseQaId,
        sprintId: parseSprintId,
        summary,
      },
    });

    await prisma.task.update({
      where: { id: parseTaskId },
      data: {
        status,
        reporterId: parseReporterId,
        priority,
        assigneeId: parseAssigneeId,
        sprintId: parseSprintId,
        viewerId: parseReviewerId,
        qaId: parseQaId,
      },
    });

    return issue;
  },
  updateIssueDesc: async (_, args, { prisma }) => {
    const id = args.id;
    const { description } = args.data;

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
    });
    if (!issue) {
      return { message: "Issue not found" };
    }
    const updatedDesc = await prisma.issue.update({
      where: { id: parseInt(id) },
      data: { description },
    });

    return updatedDesc;
  },
  updateTitle: async (_, args, { prisma }) => {
    const { title, id } = args.data;
    const parseTaskId = parseInt(id);
    const task = await prisma.task.findUnique({
      where: { id: parseTaskId },
    });
    if (!task) {
      return { message: "Task not found" };
    }

    const updatedTitle = await prisma.task.update({
      where: { id: parseTaskId },
      data: { title },
    });
    return updatedTitle;
  },
  updateStatus: async (_, args, { prisma }) => {
    const { status, taskId } = args.data;
    const parseTaskId = parseInt(taskId);
    const task = await prisma.task.findUnique({
      where: { id: parseTaskId },
    });
    if (!task) {
      return { message: "Task not found" };
    }

    const updatedStatus = await prisma.task.update({
      where: { id: parseTaskId },
      data: { status },
    });
    return updatedStatus;
  },
  updateSprintTitle: async (_, args, { prisma }) => {
    const { title, id } = args.data;
    const parseSprintId = parseInt(id);
    const sprint = await prisma.sprint.findUnique({
      where: { id: parseSprintId },
    });
    if (!sprint) {
      return { message: "Sprint not found" };
    }
    const updatedTitle = await prisma.sprint.update({
      where: { id: parseSprintId },
      data: { title },
    });

    return updatedTitle;
  },

  updateIssueLabelType: async (_, args, { prisma }) => {
    const { id, type, label } = args.data;
    const parseId = parseInt(id);

    const issue = await prisma.issue.findUnique({ where: { id: parseId } });
    if (!issue) {
      return { message: "No issue found." };
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: parseId },
      data: { label, issueType: type },
    });

    return updatedIssue;
  },
  updateTaskIssue: async (_, args, { prisma }) => {
    const { priority, id, sprintId, assigneeId, reporterId, viewerId, qaId } =
      args.data;
    const parseid = parseInt(id);

    console.log(assigneeId);

    const task = await prisma.task.findUnique({
      where: { id: parseid },
    });

    if (!task) {
      return { message: "No task found." };
    }

    const updateData = await prisma.task.update({
      where: { id: parseid },
      data: {
        priority,
        sprintId: parseInt(sprintId),
      },
    });
    const issue = await prisma.issue.findMany({
      where: { taskId: parseid },
    });

    for (const isu of issue) {
      await prisma.issue.update({
        where: { id: isu.id },
        data: {
          priority,
          sprintId: parseInt(sprintId),
        },
      });
    }
    return updateData;
  },
  updateTaskUsers: async (_, args, { prisma }) => {
    const { id, assigneeId, reporterId, viewerId, qaId } = args.data;
    const parseId = parseInt(id);
    const task = await prisma.task.findUnique({ where: { id: parseId } });
    if (!task) {
      return { message: "No task found." };
    }
    const updatedTask = await prisma.task.update({
      where: { id: parseId },
      data: {
        assigneeId: assigneeId
          ? parseInt(assigneeId)
          : parseInt(task?.assigneeId?.id),
        reporterId: reporterId
          ? parseInt(reporterId)
          : parseInt(task?.reporterId?.id),
        viewerId: viewerId ? parseInt(viewerId) : parseInt(task?.viewerId?.id),
        qaId: qaId ? parseInt(qaId) : parseInt(task?.qaId?.id),
      },
    });

    const issue = await prisma.issue.findMany({
      where: { taskId: parseId },
    });
    for (const isu of issue) {
      await prisma.issue.update({
        where: { id: isu.id },
        data: {
          assigneeId: assigneeId
            ? parseInt(assigneeId)
            : parseInt(isu?.assigneeId?.id),
          reporterId: reporterId
            ? parseInt(reporterId)
            : parseInt(isu?.reporterId?.id),
          viewerId: viewerId ? parseInt(viewerId) : parseInt(isu?.viewerId?.id),
          qaId: qaId ? parseInt(qaId) : parseInt(isu?.qaId?.id),
        },
      });
    }
    return updatedTask;
  },
};

module.exports = Mutation;
