import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registerUser($data: RegisterUserInput!) {
    registerUser(data: $data) {
      token
      user {
        name
        email
        imgUrl
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($data: LoginUserInput!) {
    loginUser(data: $data) {
      token
      user {
        name
        email
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($data: ForgotPasswordInput!) {
    forgotPassword(data: $data) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!, $data: ResetPasswordInput!) {
    resetPassword(email: $email, data: $data) {
      message
    }
  }
`;

export const CURRENT_USER = gql`
  query ($userId: String) {
    currentUser(userId: $userId) {
      id
      name
      email
      imgUrl
      jobTitle
      department
      organization
      location
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      jobTitle
      department
      organization
      location
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!, $data: DeleteUserInput!) {
    deleteUser(id: $id, data: $data) {
      field
      value
    }
  }
`;

export const CREATE_SPRINT = gql`
  mutation createSprint($data: CreateSprintInput!) {
    createSprint(data: $data) {
      title
      description
      status
      startDate
      endDate
    }
  }
`;

export const SPRINTS = gql`
  query {
    sprints {
      id
      title
      startDate
      endDate
    }
  }
`;

export const SPRINT = gql`
  query($id: String!) {
    sprint(id: $id) {
      id
      title
      description
      status
      startDate
      endDate
      tasks {
        title
        priority
        status
        assigneeId {
          id
          imgUrl
        }
      }
    }
  }
`;

export const USERS = gql`
  query {
    users {
      id
      name
      imgUrl
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask($data: CreateTaskInput!) {
    createTask(data: $data) {
      id
      title
      assigneeId {
        id
      }
      sprintId {
        id
      }
    }
  }
`;

export const TASKS = gql`
  query {
    tasks {
      id
      title
      description
      status
      assigneeId {
        id
      }
      sprintId {
        id
      }
      priority
    }
  }
`;

export const TASK = gql`
  query($id: String!) {
    task(id: $id) {
      id
      title
      description
      status
      assigneeId {
        id
        name
        imgUrl
      }
      sprintId {
        id
        title
        status
      }
      priority
    }
  }
`;

export const UPDATE_DESCRIPTION = gql`
  mutation updateDescription($id: String!, $data: UpdateDescriptionInput!) {
    updateDescription(id: $id, data: $data) {
      description
    }
  }
`;