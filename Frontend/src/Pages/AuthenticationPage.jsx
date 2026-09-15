
import '../DefaultCss.css'
import { Link } from "react-router-dom"
import './AuthenticationPage.css'

function LoginPage() {

  
    return (
        <div className="PageContainer">
            <h1 className="Title">Welcome To Task Management</h1>
            <div className="buttonContainer">
                <Link to="/create"><button className="LargeButton GreyHover">Create Account</button></Link>
                <Link to="/login"><button className="LargeButton GreyHover">Login</button></Link>
            </div>
        
        </div>
       
        
  )
}

export default LoginPage