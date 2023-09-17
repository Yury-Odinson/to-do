import { useEffect, useState } from "react"
import { setCurrentTask, tasksStore } from "../tools/storage"
import { Task } from "../tools/types"
import { TaskElement } from "./TaskElement"

export const Main = () => {

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (loaded) return;
        setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
        setLoaded(true);
    }, [loaded])

    // default value in the task completed
    const completed = false

    // generate random id from the task
    const id = (Math.floor(Math.random() * (100000 - 1)) + 1).toString()

    // remove all tasks
    const clearTasks = () => localStorage.clear()

    return (
        <div className="app">
            <div className="app-header">
                <h1>todos</h1>
            </div>
            <div className="app-body">
                <button className="app-body__button"
                    onClick={() => {
                        setCurrentTask({ task, completed, id });
                        setLoaded(false);
                    }}>add task</button>
                <input placeholder="What needs to be done?" onChange={(e) => setTask(e.target.value)} />

                <div className="app-body-tasks">
                    {
                        tasks.map((element) => {
                            return (
                                <TaskElement task={element.task} completed={false} id={element.id} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="app-footer">
                <span>{tasks.length !== 0 ? `${tasks.length} items` : null}</span>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
                <button onClick={() => {
                    tasksStore.length = 0;
                    clearTasks();
                    setLoaded(false);
                }}>Clear Completed</button>
            </div>
        </div>
    )
}
