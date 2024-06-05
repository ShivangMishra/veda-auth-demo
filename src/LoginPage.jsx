import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import custos_home from './assets/custos_home.png';
import {fetchAuthorizationEndpoint, fetchToken} from "./api/auth.js";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log("CODE: " + code);
        if (code !== null && code !== "") {
            fetchToken({code}).then((data) => {
                console.log(JSON.stringify("TOKEN DATA: " + data))
            });
        }
    }, []);

    const loadAuthURL = async () => {
        await fetchAuthorizationEndpoint()
    }

    return (
        <div className="container pt-5">
            <div className="row align-items-start justify-content-center">
                <div className="col" style={{minWidth: "300px", maxWidth: "600px"}}>
                    <h2>Welcome to VEDA Auth Central</h2>
                    <p className="h2-sub">Sign up and start authenticating</p>
                    <img style={{width: "70%"}} src={custos_home} alt="Custos Home"/>
                </div>
                <div className="col" style={{maxWidth: "350px", minWidth: "300px"}}>
                    <div className="w-100">
                        <div className="p-2 text-center">
                            <h3>Login</h3>
                            <button className="btn btn-primary mt-3" onClick={loadAuthURL}>Institution Login</button>
                        </div>
                    </div>
                    <div className="d-flex flex-row mt-3 mb-3">
                        <hr style={{flex: 1, backgroundColor: "#203A43"}}/>
                        <div style={{padding: "5px 10px"}}>OR</div>
                        <hr style={{flex: 1, backgroundColor: "#203A43"}}/>
                    </div>
                    <div className="w-100 mt-3">
                        <form className="p-2">
                            <div className="mb-2">
                                <label className="form-input-label" htmlFor="form-input-username">Username</label>
                                <input className="form-control form-control-sm" id="form-input-username"
                                       value={username} onChange={e => setUsername(e.target.value)}
                                       placeholder="Username"/>
                            </div>
                            <div className="mb-2">
                                <label className="form-input-label" htmlFor="form-input-password">Password</label>
                                <input className="form-control form-control-sm" id="form-input-password" type="password"
                                       value={password} onChange={e => setPassword(e.target.value)}
                                       placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-secondary mt-3">
                                Login
                            </button>
                            {error && <div className="text-danger w-100 mt-4 text-left form-error-message">
                                Invalid Username or Password
                            </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;