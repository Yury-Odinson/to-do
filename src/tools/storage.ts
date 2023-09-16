import { Task } from "./types"

export const tasksStore: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]") || []

export const setCurrentTask = ({ task, completed }: Task) => {
    tasksStore.push({ task, completed })
    return localStorage.setItem("tasks", JSON.stringify(tasksStore))
}
