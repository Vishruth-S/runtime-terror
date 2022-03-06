import { useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
// import './Login.css'
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});
    const navigate = useNavigate()
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            ).then(
                navigate('/')
            );
            // console.log(user);
        } catch (error) {
            alert(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <>
            {user ?
                <div>
                    <h2>You are already logged in</h2>
                    <button onClick={logout}>logout</button>
                </div>
                :
                <>
                    <Navbar />
                    <div className="reg-bg">
                        <div className="reg-container">
                            <h3 className="mb-1 mt-2"> Login </h3>
                            <hr className="reg-hr" />
                            <div className="form">
                                <div className="reg-email-box">
                                    <p className="reg-email">Email</p>
                                    <input
                                        placeholder="user@email.com"
                                        onChange={(event) => {
                                            setLoginEmail(event.target.value);
                                        }}
                                        className="reg-input"
                                    />
                                </div>
                                <div className="reg-pass-box">
                                    <p className="reg-pass">Password</p>
                                    <input
                                        placeholder="Password..."
                                        type="password"
                                        onChange={(event) => {
                                            setLoginPassword(event.target.value);
                                        }}
                                        className="reg-input"
                                    />
                                </div>
                                <button className="reg-btn" onClick={login}> Login</button>
                            </div>

                            < div class="bottom mt-4">
                                <span>
                                    Don't have an account?
                                </span>
                                <a href="/register">
                                    Sign Up
                                </a>
                            </div>

                        </div>
                    </div>
                </>
            }

        </>
    );
}

export default Login;