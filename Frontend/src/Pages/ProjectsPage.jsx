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
        const response = await getProjects(tokenProp)
        if (response)
            setProjects(await response.json())

    }

   

    return (
       
        <div className="">
            <AddProject
                addingProject={addingProject}
                setAddingProject={setAddingProject}
                setName={setName}
                SubmitProject={SubmitProject}
            />
    
            <div className="TestTitle">
                <h1>Projects</h1>
                <button
                    className="GreyHover AddProjectButton"
                    onClick={() => setAddingProject(true)}
                >
                    +
                </button>
            </div>

        
      
            
       
       

            <div className="ProjectsContainer">
      
                {projects.map(project => (
                    <div className="IndividualProjectContainer GreyHover" key={project.id} onClick={() => {
                        setProjectId(project.id)
                        navigate("/task")
                    }} >
                        <img src="https://placehold.co/600x400"/>
                        <h2 style={{ color: 'whitesmoke', fontSize: '30px', textAlign: 'left' }} >{project.name}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '3fr .5fr', alignItems: 'center' }}>
                            <p stye={{ fontWeight: '100' }} >Opened 8:22 AM </p>
                            <p style={{fontSize:'35px', color:'white'}} >⋮</p>
                        </div>
                 
                       
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