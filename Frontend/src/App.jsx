import { Routes, Route } from 'react-router-dom';
import AuthenticationPage from './Pages/AuthenticationPage';
import CreateAccountPage from './Pages/CreateAccountPage';
import LoginPage from './Pages/LoginPage';
import { useState } from 'react';
import TaskPage from './Pages/TaskPage';
import ProjectsPage from './Pages/ProjectsPage'

function App() {

    const [token, setToken] = useState("")
    const [projectId, setProjectId] = useState()

    return (
        <div>
         

            <Routes>
                <Route path="/" element={<AuthenticationPage />} />
                <Route path="/create" element={<CreateAccountPage setTokenProp={setToken} />} />
                <Route path="/login" element={<LoginPage setTokenProp={setToken} />} />
                <Route path="/projects" element={<ProjectsPage tokenProp={token} setProjectId={setProjectId} />} />
                <Route path="/task" element={<TaskPage tokenProp={token} projectId={projectId} />} />
            </Routes>
        </div>
    ) 
}

export default App
