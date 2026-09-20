import '../DefaultCss.css'
import './ProjectsPage.css'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { addProject, getProjects } from '../Services/ProjectService'

function ProjectsPage({ tokenProp, setProjectId }) {

    const [addingProject, setAddingProject] = useState(false)
    const [name, setName] = useState("")
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Opening Project Page")
        const fetchProjects = async () => {
            const response = await getProjects(tokenProp)

            if (response)
                setProjects(await response.json())
            else
                setProjects([])
        }

        fetchProjects()
      

    }, [tokenProp])

    async function SubmitProject()
    { 
        await addProject(name, tokenProp)  

    }

   

    return (
       
        <div className="">
            <AddProject
                addingProject={addingProject}
                setAddingProject={setAddingProject}
                setName={setName}
                SubmitProject={SubmitProject}
            />
            <h1 className="Title">Projects</h1>

          
            <button className="GreyHover AddProjectButton" onClick={() => setAddingProject(true)} >Add Project</button>
       
       

            <div className="ProjectsContainer">
      
                {projects.map(project => (
                    <div className="IndividualProjectContainer GreyHover" key={project.id} onClick={() => {
                        setProjectId(project.id)
                        navigate("/task")
                    }} >
                        <h2 style={{color: 'black', fontSize: '2em'}} >{project.name}</h2>
                    </div>
                ))}
            </div>
        
        </div>
      
    );
}

export default ProjectsPage;

function AddProject({ addingProject, setAddingProject, setName, SubmitProject })
    {
        return addingProject && (
            <>
                <div className="Overlay"></div>

                <div className="AddProjectContainer">
                    <div className="AddTaskTitleClose">
                        <h2>Add Project</h2>
                        {<button className="ExitButton DarkPurpleHover" onClick={() => setAddingProject(false)} >X</button> }
                    </div>

                    <form onSubmit={(event) => {
                        event.preventDefault()
                        SubmitProject()
                        setAddingProject(false)
                    }} >
                        <div className="IndividualFormContainer">
                            <p>Title</p>
                            <input type="text" placeholder="Task" className="Input" onChange={(event) => setName(event.target.value)} /> 
                        </div>
             
                       
                         <input type="submit" placeholder="Add" className="Submit" />
                        
                    </form>
                </div>
            </>
        )
    }