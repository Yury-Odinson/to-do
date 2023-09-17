import { useEffect, useState } from "react"
import { setCurrentTask, tasksStore } from "../tools/storage"
import { Task } from "../tools/types"

export const Main = () => {

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (loaded) return;
        setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
        setLoaded(true);
    }, [loaded])

    const completed = false
    const id = (Math.floor(Math.random() * (100000 - 1)) + 1).toString()

    const clearTasks = () => localStorage.clear()

    return (
        <div className="app">
            <div className="app-header">
                <h1>todos</h1>
            </div>
            <div className="app-body">
                <button onClick={() => {
                    setCurrentTask({ task, completed, id });
                    setLoaded(false);
                }}>add task</button>
                <input className="app-body__input" placeholder="What needs to be done?" onChange={(e) => setTask(e.target.value)} />
                <div className="app-body-tasks">
                    {
                        tasks.map((element) => {
                            return (
                                <div className="app-body-tasks__element" id={element.id} key={element.id}>
                                    <input className="task__checkbox" type="checkbox" defaultChecked={element.completed} />
                                    <input className="task__input" type="text" defaultValue={element.task} readOnly />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="app-footer">
                <span>2 items</span>
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
