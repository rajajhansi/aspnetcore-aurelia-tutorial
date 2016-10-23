import {TaskStatus} from "./task-status";
import {TaskPriority} from "./task-priority";
import {TaskFilter} from "./task-filter";
import {ITask} from "./task";
import {IEnumMapKeyValuePair} from "../common/enumMapKeyValuePair";
import {EnumConverter} from "../common/enum-converter";
import {inject} from "aurelia-framework";
import moment from "moment";
import $ from "jquery";

var taskFiltersFunc = [
   (t:ITask) => (t.status >= TaskStatus.NotStarted && t.status <= TaskStatus.Deferred),
   (t:ITask) => (t.status !== TaskStatus.Completed),
   (t:ITask) => (t.status === TaskStatus.Completed),
   (t:ITask) => (moment() > moment(t.dueDate))
];
export class TaskManager {
    tasks: Array<ITask>;
    filteredTasks: Array<ITask>;
    currentTask: ITask;
    currentFilter: TaskFilter;
    taskStatuses: IEnumMapKeyValuePair[];
    taskPriorities: IEnumMapKeyValuePair[];
    taskFilters: IEnumMapKeyValuePair[];
    isDebug: boolean;
    currentId: number;
    constructor() {
        this.currentId = -1;
        this.currentFilter = TaskFilter.All;
        this.isDebug = true;
        this.taskStatuses = EnumConverter.enumToMap(TaskStatus);
        this.taskPriorities = EnumConverter.enumToMap(TaskPriority);
        this.taskFilters = EnumConverter.enumToMap(TaskFilter);
        this.tasks = new Array<ITask>();
        this.filteredTasks = new Array<ITask>();
        this.currentTask = null;
    }

    search() {

    }
    
    seedTasks() {
        for(var i = 0; i < 5; i++) {
            var task: ITask = {
                id: i, attachments: null, subject: "Task " + i, status: TaskStatus.NotStarted,
                priority: TaskPriority[(i % 3).toString()], startDate: new Date(), dueDate: new Date(2016, 9, 20 + i),
                completedDate: null,  percentComplete: 0, reminder: new Date(2016, 9, 19 + i),
                isCompleted: false, isBeingEdited: false
            };
            this.tasks.push(task);
        }
        this.currentTask = this.tasks[0];
        this.currentTask = {  id: -1, attachments: null, subject: "Task ", status: TaskStatus.NotStarted,
                priority: TaskPriority.Normal, startDate: new Date(), dueDate: new Date(),
                completedDate: null,  percentComplete: 0, reminder: new Date(),
                isCompleted: false, isBeingEdited: false};
    }

    filterTasks(taskFilter: TaskFilter) {
        this.filteredTasks = this.tasks.filter(taskFiltersFunc[taskFilter]);
        this.currentTask = ((this.filteredTasks.length > 0) ? this.filteredTasks[0] : null);
        this.currentFilter = taskFilter;
    }

    activate() {
        //$(".dropdown-toggle").dropdown();
    }
    // get isCompleted(): boolean {
    //     var completed = (this.currentTask.status === TaskStatus.Completed);
    //     console.log("Completed: " + completed);
    //     return completed;
    // }

    getTaskIndex(id: number) : number {
       return this.tasks.findIndex((t:ITask) => t.id === id);
    }

    completeTask(id: number) {
        var index = this.getTaskIndex(id);
        if(this.tasks[index].isCompleted) {
            this.tasks[index].status = TaskStatus.Completed;
            this.tasks[index].percentComplete = 100;
            this.tasks[index].completedDate = new Date();
        } else {
            this.tasks[index].status = TaskStatus.NotStarted;
            this.tasks[index].percentComplete = 0;
            this.tasks[index].completedDate = null;
        }

        this.currentTask = this.tasks[index];
        console.log("Inside completeTask, task status = " + this.currentTask.status);
    }

    selectTask(id: number) {
        var index = this.getTaskIndex(id);
        if(index !== -1) {
            this.currentTask = this.tasks[index];
            console.log("Inside selectTask, task status = " + this.currentTask.status);
        }
        return true;
    }

    createTask() {
        ++this.currentId;
        var today = new Date();
        this.currentTask = {  id: this.currentId, attachments: null, subject: "Task ", status: TaskStatus.NotStarted,
                priority: TaskPriority.Normal, startDate: today, dueDate: new Date(today.getFullYear(), today.getMonth(), 
                today.getDay() + 10),
                completedDate: null,  percentComplete: 0, reminder: new Date(today.getFullYear(), today.getMonth(), 
                today.getDay() + 9),
                isCompleted: false, isBeingEdited: true};
        this.tasks.push(this.currentTask);
        return true;
    }

    editTask(id: number) {
        var index = this.getTaskIndex(id);
        if(index !== -1) {
            if(!this.tasks[index].isBeingEdited) {
                this.tasks[index].isBeingEdited = true;
                this.currentTask = this.tasks[id];
            }
        }
    }

    updateTask(id: number) {
        console.log("Updating task " + id);
        // make sure that the id matches the id of the current Task being edited/saved
        if(id === this.currentTask.id) {
            var index = this.getTaskIndex(id);
            this.tasks[index] = this.currentTask;
        }
        return true;
    }

    deleteTask(id: number) {
        console.log("Deleting task " + id);
        var index = this.getTaskIndex(id);
        this.tasks.splice(index,1);
        console.log("Deleted task " + id);
        console.log(this.tasks);
    }

    setCompletion() {
        console.log("Is number " + Number.isInteger(this.currentTask.status));
        this.currentTask.isCompleted = this.currentTask.status === TaskStatus.Completed;
        this.currentTask.percentComplete = (this.currentTask.isCompleted ? 100 : 0);
        this.currentTask.completedDate = (this.currentTask.isCompleted ? new Date() : null);
        console.log("Inside setCompletion, currentTask.status =" + this.currentTask.status);
        console.log("Inside setCompletion, currentTask.isCompleted = ", this.currentTask.isCompleted);
    }
    saveTask() {
        console.log("Saving task " + this.currentTask.id);
        var index = this.getTaskIndex(this.currentTask.id);
        this.tasks[index] = this.currentTask;
        return true;
    }
}