import { useEffect, useState } from "react"
import { Task } from "../tools/types"
import { tasksStore } from "../tools/storage"

export const Tasks = () => {

    const [tasks, setTasks] = useState<Task[]>([])
    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"))
    }, [tasksStore])

    console.log(tasks)

    return (
        <>
            {
                tasks.map((element) => {
                    return (
                        <div className="app-body-tasks__element">
                            <input type="checkbox" checked={element.completed} />
                            <input type="text" value={element.task} />
                        </div>
                    )
                })
            }
        </>
    )
}
