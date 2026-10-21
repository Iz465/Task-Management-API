import '../DefaultCss.css'
import './ProjectsPage.css'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { addProject, deleteProject, getProjects } from '../Services/ProjectService'

function ProjectsPage({ tokenProp, setProjectId }) {
    const [addingProject, setAddingProject] = useState(false)
    const [projectName, setProjectName] = useState("")
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()
    const [currentOptions, SetCurrentOptions] = useState(null)


    useEffect(() => {
      
        SetProjects()
        
    }, [tokenProp])


    async function SetProjects() { 

        const response = await getProjects(tokenProp)
        setProjects(await response.json())
    }


    async function SubmitProject() {
        await addProject(projectName, tokenProp)
        SetProjects()
        
    }

    async function DeleteProject(projectId) {
      
        await deleteProject(tokenProp, projectId)
        SetProjects()  
    }


    return (
        <div>
            <AddProject addingProject={addingProject} setAddingProject={setAddingProject} setProjectName={setProjectName}
                SubmitProject={SubmitProject} />

            <div className="Title">
                <h1>Projects</h1>

                <button className="GreyHover GreenButton MediumButton"
                    onClick={() => { setAddingProject(true), SetCurrentOptions(null) }} >
                    +
                </button>
            </div>

            <div className="ProjectsContainer">
                {projects.map(project => (

                    <div className="IndividualProjectContainer GreyHover" key={project.id}
                        style={{ zIndex: currentOptions === project.id ? 10 : 'auto' }}
                        onClick={() => { setProjectId(project.id), navigate("/task") }} >

                        <img src="https://placehold.co/600x400" />
                        <h2> {project.name}</h2>

                        <div className="ProjectDetails">
                            <p> Opened 8:22 AM </p>

                            <p style={{fontSize: '30px', cursor: 'pointer' }}
                                onClick={(e) => { e.stopPropagation(), e.preventDefault(), SetCurrentOptions(
                                    currentOptions === project.id ? null : project.id
                                )}} >
                                ⋮ </p>
                        </div>

                        {currentOptions === project.id && (
                            <div className="ProjectOptions" onClick={(e) => e.stopPropagation()} >
                                <p>Rename</p>
                                <p onClick={() => DeleteProject(project.id) } >Delete</p>
                                <p>Open in new tab</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectsPage

function AddProject({ addingProject, setAddingProject, setProjectName, SubmitProject })
{
    return addingProject && (
        <>
            <div className="Overlay"></div>

            <div className="AddProjectContainer">

                <div className="AddTaskTitleClose">
                    <h2>Add Project</h2>
                    <button className="ExitButton DarkPurpleHover"
                        onClick={() => {setAddingProject(false) }} > X
                    </button>
                </div>

                <form onSubmit={(event) => { event.preventDefault(), SubmitProject(), setAddingProject(false) }} >
                    <div className="IndividualFormContainer">
                        <p>Title</p>
                        <input type="text" placeholder="Task" className="Input" onChange={(event) => setProjectName(event.target.value)} />
                    </div>
                    <input type="submit" placeholder="Add" className="Submit" />
                </form>

            </div>
        </>
    )
}