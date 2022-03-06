import React from 'react'
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
// import './Reg.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import { CreateBankAccount } from '../pages/CreateBankAccount'
import '../css/Register.css'
import { useAlert } from 'react-alert'

const RegisterDetails = () => {
    const alert = useAlert()
    const [uid, setUid] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [dob, setDob] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [validated, setValidated] = useState(false);

    // const usersCollectionRef = collection(db, "users")
    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setUid(currentUser.uid);
        setEmail(currentUser.email)
    });
    const createUser = async () => {
        console.log("ohi")
        await setDoc(doc(db, "users", uid),
            {
                uid: uid,
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                aadhar: aadhar,
                accounts: [],
                transactions: [],
                cards: []
            }
        )
        console.log("hi")
        await CreateBankAccount(user)
        alert.show("Account created successfully")
        setRedirect(true)
    }

    const [state, setState] = useState("loading (4 sec)...");
    useEffect(() => {
        let isMounted = true;
        fetchData();
        return () => {
            isMounted = false;
        };

        // simulate some Web API fetching
        function fetchData() {
            setTimeout(() => {
                if (isMounted) setState("data fetched")
                else;
            }, 4000);
        }
    }, []);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return
        }
        event.preventDefault()
        setValidated(true);
        createUser()
    };


    return (
        <div>
            {!redirect
                ?
                <div>
                    <h3 className="mt-2"> Add details </h3>
                    <hr className="reg2-hr" />
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="10" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Name"
                                onChange={e => setName(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="10" controlId="validationCustom02">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder='phone'
                                onChange={e => setPhone(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="10" controlId="validationCustom03">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                required
                                placeholder='dob'
                                type="date"
                                onChange={e => setDob(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="10" controlId="validationCustom04">
                            <Form.Label>Aadhar</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder='aadhar'
                                onChange={e => setAadhar(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="10">
                            <Form.Check
                                required
                                label="I Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                        <div className='sbutton  ml-3 mt-3'>
                            <button className='reg-btn' type="submit">Create account</button>
                        </div>
                    </Form>
                </div>
                : <Navigate to="/overview" />
            }
        </div >
    )
}

export default RegisterDetails