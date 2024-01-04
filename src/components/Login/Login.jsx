import { useEffect, useState } from "react"
import "./Login.css"
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("user@gmail.com");
    const [password, setPassword] = useState("123456");
    const navigate = useNavigate();
    const { login, isAuth } = useAuth();
    const handleSubmit = (ev) => {
        ev.preventDefault()
        login(email, password);
    }

    useEffect(() => {
        if (isAuth) navigate('/', { replace: true })
    }, [isAuth, navigate])

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" className="form-input" value={email} onChange={e => setEmail(e.target.validationMessage)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="button button--primary block" >login</button>
                </div>
            </form>
        </div>
    )
}

export default Login