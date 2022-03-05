import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import RegisterDetails from "../Components/RegisterDetails";
import { useNavigate } from "react-router-dom";
import '../css/Register.css'
function Register() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [nextStep, setNextStep] = useState(false)

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(true);
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async (e) => {
        e.preventDefault()
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            // console.log(user);
            setNextStep(true)
        } catch (error) {
            alert(error.message);
        }
    };


    const logout = async () => {
        await signOut(auth);
    };

    return (
        <div className="reg-container">
            {!user &&
                <div className="form_container">
                    <h3 className="mb-1 mt-2"> Sign Up </h3>
                    <hr />
                    {!nextStep && <form onSubmit={e => register(e)}>
                        <div className="reg-email-box">
                            <p className="reg-email">Email</p>
                            <input
                                placeholder="user@email.com"
                                onChange={(event) => {
                                    setRegisterEmail(event.target.value);
                                }}
                                className="reg-input"
                                required
                            />
                        </div>
                        <div className="reg-pass-box">
                            <p className="reg-pass">Password</p>
                            <input
                                placeholder="password"
                                type="password"
                                onChange={(event) => {
                                    setRegisterPassword(event.target.value);
                                }}
                                className="reg-input"
                                required
                            />

                        </div>
                        <div>
                            <button className="reg-btn" type="submit"> Next </button>
                        </div>
                    </form>}
                </div>

            }
            {/* <h4> User Logged In: </h4> */}
            {nextStep && user && user.uid ? mounted && <RegisterDetails /> : null}
            {/* {user ? <button onClick={logout}> Sign Out </button> : null} */}

        </div>

    );
}

export default Register;