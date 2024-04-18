export interface User {
  id: string;
  name: string;
  email: string;
  imgUrl: string;
  jobTitle: string;
  department: string;
  organization: string;
  location: string;
}

export interface Password {
  password: string;
}

export interface SprintProps {
  id: string;
  title: string;
  description?: string;
  status: string[];
  startDate: string;
  endDate: string;
  tasks: TaskProps[];
}

export interface TaskProps {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assigneeId: User | null;
  reporterId: User | null;
  viewerId: User | null;
  qaId: User | null;
  sprintId: SprintProps | null;
  comments: CommentProps[];
}

export interface CommentProps {
  id: string;
  text: string;
  userId: User | null;
  taskId: TaskProps | null;
  issueId: IssueProps | null
}

export interface DragResult {
  destination?: {
    droppableId: string;
    index: number;
  };
  source: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
  type?: string;
}

export interface IssueProps {
  id: string;
  issueType: string;
  status: string;
  summary?: string;
  description?: string;
  attachment?: string;
  assigneeId: User | null;
  reporterId: User | null;
  viewerId: User | null;
  qaId: User | null;
  taskId: TaskProps | null;
  sprintId: SprintProps | null;
  label: string;
  priority: string
  comments: CommentProps[]
}

export interface UserListProps {
  imgUrl?: string;
  name: string;
  id?: string
}

export interface TitleProps {
  title: string;
  isUpdateTitle: boolean;
  setTitle: (value: string) => void;
  updateTitleHandler: () => void;
  setIsUpdatedTitle: (value: boolean) => void;
}

export interface Detail1Props {
  desc: string;
  comment: string;
  setDesc: (value: string) => void;
  setComment: (value: string) => void;
  createCommentHandler: () => void;
  updateDescHandler: () => void;
  hideEditor: () => void;
  showEditor: string;
  setShowEditor: (value: string) => void;
}

export interface Detail2Props {
  updateTask: string;
  setUpdateTask: (value: string) => void;
  assignee: User | null;
  sprint: SprintProps | null;
  priority: string;
  reporter: User | null;
  viewer?: User | null;
  qa?: User | null;
  label?: string;
  issueType?: string;
  task: TaskProps | null;
  isTask: boolean;
  issue?: IssueProps | null;
}

export interface TaskUsersProps {
  user: User | null;
  showList: boolean;
  setShowList: (value: boolean) => void;
  isClicked: string;
  setIsClicked: (value: string) => void
  users: User[];
  updateUsersHandler: (value1: User | null, value2: string) => void;
  selectedUser: string;
}