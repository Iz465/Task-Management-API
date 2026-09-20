import { useEffect, useState } from "react";
import './TasksPage.css'
import '../DefaultCss.css'
import { getProject } from '../Services/ProjectService';
import { addTask, getTasks } from "../Services/TaskService";


function TaskPage({ tokenProp, projectId }) {

 
    const [addingTask, setAddingTask] = useState(false)
    const [project, setProject] = useState()
    const [name, setName] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [tasks, setTasks] = useState([])
  
    useEffect(() => { 

        const fetchProjects = async () => {

            let response = await getProject(tokenProp, projectId)
            if (response.ok)
                setProject(await response.json())
            else
                setProject()

            response = await getTasks(tokenProp, projectId)
            if (response.ok)
            {
                var data = await response.json()
                setTasks(data)
                console.log(data)
                
            }
                
            else
                console.log("Cant get tasks");
                
        }

        fetchProjects()
        
        
    }, [tokenProp])

    async function CallAddTask()
    {
        let response = await addTask(tokenProp, projectId, name, dueDate)
        if (response.ok)
            setAddingTask(false);

        response = await getTasks(tokenProp, projectId)
        if (response.ok) 
            setTasks(await response.json())

    }


 

    return (
        <div>
            <AddTask addingTask={addingTask} CallAddTask={CallAddTask} setAddingTask={setAddingTask} setName={setName} setDueDate={setDueDate} />
            {project && (
                <h1 className="Title">{project.name}</h1>
            )}
            <div className="TasksContainer">

                <div className="IndividualTaskContainer">
                    <div className="NotStartedContainer">
                        <h2 className="MediumFont">Not Started</h2>
                        <button className="TaskButton GreyHover" onClick={() => setAddingTask(true)} > + </button>
                    </div>
                    {tasks.map(task => (
                        task.status == 0 && (
                         < div key = { task.name } >
                        <p>{task.name}</p>
                        </div>
                        )
                       
                    ))}
                </div>

                <div className="IndividualTaskContainer">
                    <h2 className="MediumFont">In Progress</h2>
                    {tasks.map(task => (
                        task.status == 1 && (
                            < div key={task.name}>
                                <p>{task.name}</p>
                            </div>
                            
                        )
                    ))}
                </div>

                <div className="IndividualTaskContainer">
                    <h2 className="MediumFont">Finished</h2>
                    {tasks.map(task => (
                        task.status == 2 && (
                            <div key={task.name}>
                                <p>{task.name}</p>
                            </div>
                        )
                    ))}
                </div>
               
            </div>
        </div>
    
  )

}

export default TaskPage;

function AddTask({ addingTask, CallAddTask, setAddingTask, setName, setDueDate }) {


    return addingTask && (
        <>
            <div className="Overlay"></div>

            <div className="AddTaskContainer">
                <div className="AddTaskTitleClose">
                    <h2>Add Task</h2>
                    <button className="ExitButton DarkPurpleHover" onClick={() => setAddingTask(false)} >X</button>
                </div>

                <form onSubmit={(event) => {
                    event.preventDefault()
                    CallAddTask()
                }} >
                    <div className="IndividualFormContainer">
                        <p>Task</p>
                        <input type="text" placeholder="Task" className="Input" onChange={(event) => setName(event.target.value)} />
                    </div>

                    <div className="IndividualFormContainer">
                        <p>Due Date</p>
                        <input type="text" placeholder="Due Date" className="Input" onChange={(event) => setDueDate(event.target.value)} />
                    </div>

                    <div>
                        <input type="submit" placeholder="Add" className="Submit" />
                    </div>
                </form>
            </div>
        </>
    )
}


