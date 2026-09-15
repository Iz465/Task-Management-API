import { Routes, Route } from 'react-router-dom';
import AuthenticationPage from './Pages/AuthenticationPage';
import CreateAccountPage from './Pages/CreateAccountPage';
import LoginPage from './Pages/LoginPage';
import { useState } from 'react';
import  TaskPage  from './Pages/TaskPage';

function App() {

    const[token, setToken] = useState("")

    return (
        <div>
         

            <Routes>
                <Route path="/" element={<AuthenticationPage />} />
                <Route path="/create" element={<CreateAccountPage />} />
                <Route path="/login" element={<LoginPage setTokenProp={setToken} />} />
                <Route path="/task" element={<TaskPage tokenProp={token} />} />
            </Routes>
        </div>
    ) 
}

export default App
