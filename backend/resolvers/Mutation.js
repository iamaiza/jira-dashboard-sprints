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
    const parseSprintId = parseInt(sprintId)
    console.log(typeof parseInt(assigneeId));
    console.log(typeof parseInt(sprintId));
    const user = await prisma.user.findUnique({
      where: { id: parseAssigneeId },
    });
    if (!user) {
      return { message: "User not found." };
    }
    const sprint = await prisma.sprint.findUnique({
      where: { id: parseSprintId },
    });
    if (!sprint) {
      return { message: "No sprint found." };
    }
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        attachment,
        priority,
        assigneeId: parseAssigneeId,
        sprintId: parseSprintId,
      },
    });

    return task;
  },
};

module.exports = Mutation;
