import { Task } from "./types"

export const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]") || []

export const setCurrentTask = ({ task, completed }: Task) => {
    tasks.push({ task, completed })
    return localStorage.setItem("tasks", JSON.stringify(tasks))

}
