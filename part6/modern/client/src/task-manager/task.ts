import {TaskStatus} from "./task-status";
import {TaskPriority} from "./task-priority";

export interface ITask {
    id: number;
    attachments: any[];
    subject: string;
    status: TaskStatus;
    priority: TaskPriority;
    startDate: Date;
    dueDate: Date;
    completedDate: Date;
    percentComplete: number;
    reminder: Date;
    isCompleted: boolean;
    isBeingEdited: boolean;
}