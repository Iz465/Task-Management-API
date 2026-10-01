import { Routes, Route } from 'react-router-dom';
import AuthenticationPage from './Pages/AuthenticationPage';
import CreateAccountPage from './Pages/CreateAccountPage';
import LoginPage from './Pages/LoginPage';
import { useState } from 'react';
import TaskPage from './Pages/TaskPage';
import ProjectsPage from './Pages/ProjectsPage'
import logo from '../public/IceLogo.png'

function App() {

    const [token, setToken] = useState("")
    const [projectId, setProjectId] = useState()

    return (
        <div>

            <div className="SideBorder">
             
            </div>
            <div className="TopContainer">
                <div className="IndividualTopContainer">
                    <img src={logo} style={{ objectFit: 'cover', width: '30px' }} />
                    <p style={{ fontWeight: 'bold' }} >Task Stuff</p>
                </div>
                <div className="IndividualTopContainer">
                    <p>Time</p>
                    <p>Login</p>
                </div>
                

            </div>
    

            <div style={{ display: 'flex' }} >

                { 
                    <div className="SideContainer" >

                        <div className="Sidebar"  >
                            <h2 >Home</h2>
                            <h2 >Projects</h2>
                            <h2 >Settings</h2>
                        </div>
                    </div>
                }
                <div style={{ width: '100%'}} >
                    <Routes>
                        <Route path="/" element={<AuthenticationPage />} />
                        <Route path="/create" element={<CreateAccountPage setTokenProp={setToken} />} />
                        <Route path="/login" element={<LoginPage setTokenProp={setToken} />} />
                        <Route path="/projects" element={<ProjectsPage tokenProp={token} setProjectId={setProjectId} />} />
                        <Route path="/task" element={<TaskPage tokenProp={token} projectId={projectId} />} />
                    </Routes>
                </div>
            </div>

        </div>
    ) 
}

export default App
