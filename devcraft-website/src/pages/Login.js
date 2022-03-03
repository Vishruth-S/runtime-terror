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
                <h2>You are already logged in</h2>
                : <div class="formC">
                    <h2 class="title">
                        welcome
                    </h2>
                    <div className="form">
                        <input
                            placeholder="Email..."
                            onChange={(event) => {
                                setLoginEmail(event.target.value);
                            }}
                        />
                        <input
                            placeholder="Password..."
                            type="password"
                            onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }}
                        />

                        <button onClick={login}> Login</button>
                    </div>

                    < div class="bottom">
                        <span>
                            Don't have an account?
                        </span>
                        <a href="/register">
                            Sign Up
                        </a>
                    </div>


                </div>
            }

        </>
    );
}

export default Login;