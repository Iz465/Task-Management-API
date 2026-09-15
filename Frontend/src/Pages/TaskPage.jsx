import { useEffect, useState } from "react";
import './TasksPage.css'
import '../DefaultCss.css'


function TaskPage({ tokenProp }) {

    const [message, setMessage] = useState("")
    const [addingTask, setAddingTask] = useState(false)

    useEffect(() => { 
        setMessage("Tasks")
    }, [tokenProp])


    function AddTask()
    {
        return addingTask && (
            <>
                <div className="Overlay"></div>
   
                <div className="AddTaskContainer">
                    <div className="AddTaskTitleClose">
                        <h2>Add Task</h2>
                        <button className="ExitButton DarkPurpleHover" onClick={() => setAddingTask(false)} >X</button>
                    </div>
                   
                    <form>
                        <div className="IndividualFormContainer">
                            <p>Task</p>
                            <input type="text" placeholder="Task" className="Input"/>
                        </div>

                        <div className="IndividualFormContainer">
                            <p>Due Date</p>
                            <input type="text" placeholder="Due Date" className="Input"/>
                        </div>

                        <div>
                            <input type="submit" placeholder="Add" className="Submit"/>
                        </div>
                    </form>
                </div>
            </>
            )   
    }

    return (
        <div>
            <AddTask />
            {message && (
                <h1 className ="Title">{message}</h1>
            )}
            <div className="TasksContainer">

                <div className="NotStartedContainer IndividualTaskContainer">
                    <h2 className="MediumFont">Not Started</h2>
                    <button className="TaskButton DarkPurpleHover" onClick={() => setAddingTask(true)} > + </button>
                </div>

                <div className="IndividualTaskContainer">
                    <h2 className="MediumFont">In Progress</h2>
                </div>

                <div className="IndividualTaskContainer">
                    <h2 className="MediumFont">Finished</h2>
                </div>
               
            </div>
        </div>
    
  )
}


export default TaskPage;