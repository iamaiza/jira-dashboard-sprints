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