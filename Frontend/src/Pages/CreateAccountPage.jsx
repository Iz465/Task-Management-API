import '../DefaultCss.css'
import { createUser } from '../Services/LoginService'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"


function CreateAccountPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState ("") 
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    async function CreateUser() {

        console.log(`Username: ${username}`)
        const isCreated = await createUser(username, password, email)
       

        if (isCreated.ok) { 

            console.log(`token: ${await isCreated.text()}`)
            setMessage("Account Created") 
            navigate("/task")
        }
          
        else
            setMessage("Unable To Create Account")


    }

    return (
        <div className="PageContainer">
            <h1 className="Title">Create Account</h1>
            {message && (
                <h2>{message}</h2>
            )}
            

            <form className="FormContainer" onSubmit={(event) => {
                event.preventDefault()
                CreateUser(event)
            }} >
                <div className="IndividualFormContainer">
                    <h2>Username</h2>
                    <input type="text" placeholder="Username" className="Input" onChange={(event) => setUsername(event.target.value) } />
                </div>
                <div className="IndividualFormContainer">
                    <h2>Password</h2>
                    <input type="password" placeholder="Password" className="Input" onChange={(event) => setPassword(event.target.value) } />
                </div>
                <div className="IndividualFormContainer">
                    <h2>Email</h2>
                    <input type="text" placeholder="Email" className="Input" onChange={(event) => setEmail(event.target.value) } />
                </div>
           
                <input type="submit" placeholder="Create" className="Input Submit" />
            </form>
        </div>
  )
}

export default CreateAccountPage