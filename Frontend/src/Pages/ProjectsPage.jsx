import '../DefaultCss.css'
import './ProjectsPage.css'
import { useState } from 'react'
import { addProject } from '../Services/ProjectService'

function ProjectsPage({ tokenProp }) {

    const [addingProject, setAddingProject] = useState(false)
    const [name, setName] = useState("")

    async function SubmitProject()
    { 
        console.log("Submitting the project!")
        console.log(tokenProp)
        await addProject(name, tokenProp)
    }

   

    return (
       
        <div className="PageContainer">
            <AddProject
                addingProject={addingProject}
                setAddingProject={setAddingProject}
                setName={setName}
                SubmitProject={SubmitProject}
            />
            <h1 className="Title">Projects</h1>
            <div className="ProjectsContainer">
                <button className="GreyHover" onClick={() => setAddingProject(true)} >Add Project</button>
            
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
                        <button className="ExitButton DarkPurpleHover" onClick={() => setAddingProject(false)} >X</button>
                    </div>

                    <form onSubmit={(event) => {
                        event.preventDefault()
                        SubmitProject()
                        setAddingProject(false)
                    }} >
                        <div className="IndividualFormContainer">
                            <p>Name</p>
                            <input type="text" placeholder="Task" className="Input" onChange={(event) => setName(event.target.value) } />
                        </div>

                        <div>
                            <input type="submit" placeholder="Add" className="Submit" />
                        </div>
                    </form>
                </div>
            </>
        )
    }