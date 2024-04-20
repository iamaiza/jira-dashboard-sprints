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
  query ($id: String!) {
    sprint(id: $id) {
      id
      title
      description
      status
      startDate
      endDate
      tasks {
        id
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
      # assigneeId {
      #   id
      # }
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
        name
      }
      reporterId {
        id
        name
      }
      sprintId {
        id
        title
      }
      priority
    }
  }
`;

export const TASK = gql`
  query ($id: String!) {
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
      reporterId {
        id
        name
        imgUrl
      }
      viewerId {
        id
        name
        imgUrl
      }
      qaId {
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
      comments {
        id
        text
        userId {
          id
          name
          imgUrl
        }
      }
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

export const CREATE_COMMENT = gql`
  mutation createComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      id
      text
      userId {
        id
        name
        imgUrl
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($id: String!, $data: UpdateCommentInput!) {
    updateComment(id: $id, data: $data) {
      text
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id) {
      id
      text
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation updateTaskStatus($id: String!, $data: UpdateTaskStatusInput!) {
    updateTaskStatus(id: $id, data: $data) {
      status
    }
  }
`;

export const CREATE_ISSUE = gql`
  mutation createIssue($data: CreateIssueInput!) {
    createIssue(data: $data) {
      id
      label
      status
      summary
      description
      priority
      issueType
      attachment
    }
  }
`;

export const ISSUES = gql`
  query {
    issues {
      id
      issueType
      status
      taskId {
        id
        title
        status
      }
      assigneeId {
        id
        name
      }
      reporterId {
        id
        name
      }
      viewerId {
        id
        name
      }
      qaId {
        id
        name
      }
      sprintId {
        id
        title
      }
      priority
    }
  }
`;

export const ISSUE = gql`
  query issue($id: String!) {
    issue(id: $id) {
      id
      issueType
      status
      summary
      description
      attachment
      label
      taskId {
        id
        title
        description
        status
      }
      assigneeId {
        id
        name
        imgUrl
      }
      reporterId {
        id
        name
        imgUrl
      }
      viewerId {
        id
        name
        imgUrl
      }
      qaId {
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
      comments {
        id
        text
        userId {
          id
          name
          imgUrl
        }
      }
    }
  }
`;

export const UPDATE_ISSUE_DESC = gql`
  mutation updateIssueDesc($id: String!, $data: UpdateDescriptionInput!) {
    updateIssueDesc(id: $id, data: $data) {
      description
    }
  }
`;

export const UPDATE_TITLE = gql`
  mutation updateTitle($data: TitleInput!) {
    updateTitle(data: $data) {
      id
      title
    }
  }
`;

export const UPDATE_TASK_STATUS = gql`
  mutation updateStatus($data: UpdateStatusInput!) {
    updateStatus(data: $data) {
      taskId
      status
    }
  }
`;

export const UPDATE_SPRINT_TITLE = gql`
  mutation updateSprintTitle($data: TitleInput!) {
    updateSprintTitle(data: $data) {
      id
      title
    }
  }
`;

export const UPDATE_ISSUE_LABEL_TYPE = gql`
  mutation updateIssueLabelType($data: UpdateIssueLabelTypeInput!) {
    updateIssueLabelType(data: $data) {
      id
      label
      type
    }
  }
`;

export const UPDATE_TASK_ISSUE = gql`
  mutation updateTaskIssue($data: UpdateTaskIssueInput!) {
    updateTaskIssue(data: $data) {
      id
      priority
    }
  }
`;

export const UPDATE_TASK_USERS = gql`
  mutation updateTaskUsers($data: UpdateTaskUsersInput!) {
    updateTaskUsers(data: $data) {
      id
    }
  }
`;

export const UPDATE_IMG_URL = gql`
  mutation updateProfilePhoto($data: UpdateProfilePhotoInput!){
    updateProfilePhoto(data: $data) {
      imgUrl
    }
  }
`;