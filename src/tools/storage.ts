import { Task } from "./types"

export const tasksStore: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]") || []

export const setCurrentTask = ({ task, completed, id }: Task) => {
    tasksStore.push({ task, completed, id })
    return localStorage.setItem("tasks", JSON.stringify(tasksStore))
}
