import { useEffect, useState } from "react"
import { Task } from "../tools/types"

export const TaskElement = ({ task, id }: Task) => {

    const [className, setClassName] = useState("app-body-tasks__element")

    useEffect(() => setClass(id), [className])

    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")

    const setClass = (id: string) => {
        allTasks.map((element: Task) => {
            if (element.id === id) {
                if (element.completed === true) {
                    setClassName("app-body-tasks__elementCompleted")
                } else {
                    setClassName("app-body-tasks__element")
                }
            }
        })
    }

    const setCompletedTask = (id: string) => {
        allTasks.map((element: Task) => {
            if (element.id === id) {
                element.completed = !element.completed
                setClass(id)
            }
        })
        localStorage.clear()
        return localStorage.setItem("tasks", JSON.stringify(allTasks))
    }

    return (
        <div className={className} id={id} key={id} onClick={() => setCompletedTask(id)}>
            <input className="task__text" type="text" defaultValue={task} readOnly />
        </div>
    )
}
