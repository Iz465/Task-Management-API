import '../DefaultCss.css'
import { useState } from 'react'
import { login } from '../Services/LoginService'
import { useNavigate } from "react-router-dom"



function LoginPage({setTokenProp}) {

    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function Login() {

        const result = await login(username, password)

        if (result.ok)
        {
            setMessage(`Welcome Back ${username}`)
            const token = await result.text()

            setTokenProp(token)
            console.log(`Token is: ${token}`)

            navigate("/task")
        }
         
        else
            setMessage("Invalid Username or Password")

    }

    return (
        <div className="PageContainer">
            <h1 className="Title">Login</h1>
            {message && (
                <h2>{message}</h2>
            )}
            <div className="FormContainer">
                <form onSubmit={(event) => {
                    event.preventDefault()
                    Login()
                }} >
                    <div className="IndividualFormContainer">
                        <h2>Username</h2>
                        <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value) } />
                    </div>
                    <div className="IndividualFormContainer">
                        <h2>Password</h2>
                        <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    </div>

                    <input type="submit" placeholder="Submit" className="Submit" />
                </form>
            </div>
        </div>
   
      
  );
}

export default LoginPage;