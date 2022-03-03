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
// import './Register.css'
function Register() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(true);
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            alert(error.message);
        }
    };


    const logout = async () => {
        await signOut(auth);
    };

    return (
        <div className="formC">
            <div className="form_container">
                <h3> Register User </h3>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    type="password"
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />

                <button onClick={register}> Create User</button>
            </div>


            {/* <h4> User Logged In: </h4> */}
            {user ? mounted && <RegisterDetails /> : null}
            {/* {user ? <button onClick={logout}> Sign Out </button> : null} */}
        </div>

    );
}

export default Register;