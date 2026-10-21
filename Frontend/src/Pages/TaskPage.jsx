import { useEffect, useState } from "react";
import './TasksPage.css'
import '../DefaultCss.css'
import { getProject } from '../Services/ProjectService';
import { addTask, getTasks, updateTask, deleteTask } from "../Services/TaskService";


function TaskPage({ tokenProp, projectId }) {

 
    const [addingTask, setAddingTask] = useState(false)
    const [project, setProject] = useState()
    const [name, setName] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [tasks, setTasks] = useState([])
    const [taskId, setTaskId] = useState()

    const time = new Date().toISOString().split("T")[0];


    useEffect(() => { 

        GetProject()
        GetTasks()
             
    }, [tokenProp])

    async function GetProject()
    {
        let response = await getProject(tokenProp, projectId)
        if (response.ok)
            setProject(await response.json())
        else
            setProject()
    }


    async function GetTasks()
    { 
        const response = await getTasks(tokenProp, projectId)
        if (response.ok) 
            setTasks(await response.json())

        else
            console.log("Can't fetch tasks");
    }

    async function CallAddTask()
    {
        let response = await addTask(tokenProp, projectId, name, dueDate)
        if (response.ok)
            setAddingTask(false);

        GetTasks()
        setDueDate("")

    }

    async function UpdateTask(status, taskId) {
   
        await updateTask(tokenProp, status, taskId)
     
        GetTasks()
    } 

    async function DeleteTask(taskId) {
        await deleteTask(tokenProp, taskId)

        GetTasks()
    }

 

    return (
        <div>
            <AddTask addingTask={addingTask} CallAddTask={CallAddTask} setAddingTask={setAddingTask} setName={setName} setDueDate={setDueDate} />
            {project && (
                <h1 className="Title" title={project.name} style={{
                    maxWidth: '50%', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }} >
                    { project.name } </h1>
            )}
            <div className="TasksContainer">

                <TaskStatus TaskType={"Not Started"} TaskStatus={0} setAddingTask={setAddingTask} UpdateTask={UpdateTask} setTaskId={setTaskId} taskId={taskId}
                    tasks={tasks} time={time} DeleteTask={DeleteTask} />

                <TaskStatus TaskType={"InProgress"} TaskStatus={1} setAddingTask={setAddingTask} UpdateTask={UpdateTask} setTaskId={setTaskId} taskId={taskId}
                    tasks={tasks} time={time} DeleteTask={DeleteTask} />

                <TaskStatus TaskType={"Complete"} TaskStatus={2} setAddingTask={setAddingTask} UpdateTask={UpdateTask} setTaskId={setTaskId} taskId={taskId}
                    tasks={tasks} time={time} DeleteTask={DeleteTask} />
               
            </div>
        </div>
    
  )

}

export default TaskPage;

function TaskStatus({TaskType, TaskStatus, setAddingTask, UpdateTask, setTaskId, taskId, tasks, time, DeleteTask }) {

    return (
        <div className="IndividualTaskContainer">
            <div className="NotStartedContainer">
                <h2 className="MediumFont">{TaskType}</h2>
                {TaskStatus == 0 && (<button className="TaskButton GreenButton GreyHover" onClick={() => setAddingTask(true)} > + </button>) }
            </div>
            <div onDragOver={(e) => e.preventDefault()} onDrop={() => UpdateTask(`${TaskType}`, taskId)}>
                {tasks.map(task => (
                    task.status == TaskStatus && (
                        <div key={task.id} className="IndividualTasks" draggable={"true"}
                            onDragEnter={() => setTaskId(task.id)}>
                            <p>{task.name}</p>

                            <button className="SmallButton RedButton"
                                onClick={() => DeleteTask(task.id)} >🗑</button>
                            {task.status != 2 && (
                   
                                    task.dueDate > time
                                        ? <p>{task.dueDate} ⏳</p>
                                        : <p>{task.dueDate} 🔴</p>
                                
                            )}
                        
                        </div>
                    )
                ))}
            </div>

        </div>
    )
}


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
                        <input type="date" placeholder="Due Date" className="Input" onChange={(event) => setDueDate(event.target.value)} />
                    </div>

                    <div>
                        <input type="submit" placeholder="Add" className="Submit" />
                    </div>
                </form>
            </div>
        </>
    )
}


