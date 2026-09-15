import { useEffect, useState } from "react";
import './TasksPage.css'
import '../DefaultCss.css'


function TaskPage({ tokenProp }) {

    const[message, setMessage] = useState("")

    useEffect(() => { 
        setMessage("Tasks")
    }, [tokenProp])

    return (
        <div>
            {message && (
                <h1 className ="Title">{message}</h1>
            )}
            <div className="TasksContainer">
                <div>
                    <p className="MediumFont">Not Started</p>
                    <button className="TaskButton">+</button>
                </div>
            
                <p className="MediumFont">In Progress</p>
                <p className="MediumFont">Finished</p>

            </div>
        </div>
    
  )
}


export default TaskPage;