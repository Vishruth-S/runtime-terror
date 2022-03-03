import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';

const SendMoney = () => {

    // get phone number of user to send
    // check if user with phone number exist - if yes retrieve details
    // enter amount to send
    // check if amount greater than balance
    // fill transaction details
    // update accounts[0].balance of FromUser
    // update accounts[0].balance of ToUser
    // end

    const [receiverDetails, setRecieverDetails] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const usersCollectionRef = collection(db, "users")

    const getAllUsers = async () => {
        const data = await getDocs(usersCollectionRef)
        setAllUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    const getRecieverDetails = (phone) => {
        const receiver = allUsers.filter(u => u.phone === phone)
        setRecieverDetails(receiver)
    }


    return (
        <div>SendMoney
            <button onClick={() => getRecieverDetails("1234")}>Click me</button>
        </div>

    )
}

export default SendMoney