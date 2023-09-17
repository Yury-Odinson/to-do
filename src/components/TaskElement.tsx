import { useState } from "react"
import { Task } from "../tools/types"

export const TaskElement = ({ task, completed, id }: Task) => {

    const [className, setClassName] = useState("app-body-tasks__element")

    const setCompletedTask = (id: string) => {
        const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
        allTasks.map((element: Task) => {
            if (element.id === id) {
                element.completed = !element.completed
                if (element.completed === true) {
                    setClassName("app-body-tasks__elementCompleted")
                } else {
                    setClassName("app-body-tasks__element")
                }
            }
        })
        localStorage.clear()
        return localStorage.setItem("tasks", JSON.stringify(allTasks))
    }

    return (
        <div className={className} id={id} key={id} onClick={() => setCompletedTask(id)}>
            <input className="task__checkbox" type="checkbox" defaultChecked={completed} />
            <input className="task__text" type="text" defaultValue={task} readOnly />
        </div>
    )
}
