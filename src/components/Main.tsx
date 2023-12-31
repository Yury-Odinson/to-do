import { useEffect, useState } from "react"
import { setCurrentTask, tasksStore } from "../tools/storage"
import { Task } from "../tools/types"
import { TaskElement } from "./TaskElement"

export const Main = () => {

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [loaded, setLoaded] = useState(false)
    const [tab, setTab] = useState("All" || "Active" || "Completed")

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

    // loading task on request active/inactive
    const loadSpecificTask = (value: boolean) => {
        const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
        setTasks(allTasks.filter((element: Task) => element.completed === value))
    }

    const activeTab = (tabName: string) => {
        return tab === tabName ? "app-footer__buttonActive" : "app-footer__button"
    }

    return (
        <div className="app">
            <div className="app-header">
                <h1>todos</h1>
            </div>
            <div className="app-body">
                <div className="app-body-entry">
                    <button className="app-body__button"
                        onClick={() => {
                            setCurrentTask({ task, completed, id });
                            setLoaded(false);
                            setTask("");
                        }} />
                    <input className="app-body__input" placeholder="What needs to be done?" onChange={(e) => setTask(e.target.value)} value={task} />
                </div>

                <div className="app-body-tasks">
                    {
                        tasks.map((element) => {
                            return (
                                <TaskElement task={element.task} completed={element.completed} id={element.id} key={element.id} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="app-footer">
                <span>{tasks.length !== 0 ? `${tasks.length} items` : null}</span>
                <button className={activeTab("All")} onClick={() => {
                    setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
                    setTab("All")
                }}>All</button>
                <button className={activeTab("Active")} onClick={() => {
                    loadSpecificTask(false);
                    setTab("Active")
                }}>Active</button>
                <button className={activeTab("Completed")} onClick={() => {
                    loadSpecificTask(true);
                    setTab("Completed")
                }}>Completed</button>
                <button className="app-footer__button" onClick={() => {
                    tasksStore.length = 0;
                    clearTasks();
                    setLoaded(false);
                }}>Clear Completed</button>
            </div>
        </div>
    )
}
