import { useState } from "react"
import { Tasks } from "./Tasks"
import { setCurrentTask } from "../tools/storage"

export const Main = () => {

    const [task, setTask] = useState("")
    const completed = false

    const clearTasks = () => localStorage.clear()

    return (
        <div className="app">
            <div className="app-header">
                <h1>todos</h1>
            </div>

            <div className="app-body">

                <button onClick={() => setCurrentTask({ task, completed })}>add task</button>
                <input className="app-body__input" placeholder="What needs to be done?" onChange={(e) => setTask(e.target.value)} />

                <div className="app-body-tasks">
                    <Tasks />
                </div>

            </div>


            <div className="app-footer">
                <span>2 items</span>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
                <button onClick={() => clearTasks()}>Clear Completed</button>

            </div>

        </div>
    )
}