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
}

export interface TaskProps {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    assigneeId: User | null;
    sprintId: SprintProps | null;
}