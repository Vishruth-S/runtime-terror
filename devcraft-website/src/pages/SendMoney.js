import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config';

const SendMoney = () => {

    // get phone number of user to send
    // check if user with phone number exist - if yes retrieve details
    // enter amount to send
    // check if amount greater than balance
    // fill transaction details
    // update accounts[0].balance of FromUser
    // update accounts[0].balance of ToUser
    // end

    const [allUsers, setAllUsers] = useState([])
    const [receiverphone, setReceiverphone] = useState('')
    const [amount, setAmount] = useState(0)
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    const usersCollectionRef = collection(db, "users")

    let users;
    const getAllUsers = async () => {
        const data = await getDocs(usersCollectionRef)
        users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setAllUsers(users)
    }

    useEffect(() => {
        getAllUsers()
    }, [])


    const makeTransaction = async () => {
        const receiver = allUsers.filter(u => u.phone === receiverphone)[0]
        const senderdocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(senderdocRef);
        const senderData = docSnap.data()
        const senderAccount = senderData.accounts[0]
        const senderAccountRef = doc(db, "accounts", senderAccount);
        const senderAccountSnap = await getDoc(senderAccountRef)
        const senderAccountData = senderAccountSnap.data()
        // console.log(receiver)
        // console.log(receiverDetails)
        // TODO ----- if not found check
        if (Number(amount) > Number(senderAccountData.balance))
            return alert("Insufficient funds")
        const transactionsCollectionRef = collection(db, "transactions")
        let date = new Date()
        date = date.toString().slice(0, 10)

        await addDoc(transactionsCollectionRef,
            {
                fromUser: user.uid,
                toUser: receiver.uid,
                date: date,
                category: "personal",
                amount: Number(amount)
            }
        ).then(async () => {
            const receiverAccount = receiver.accounts[0]
            await updateDoc(senderAccountRef, {
                balance: increment(-1 * amount)
            });

            const receiverAccountRef = doc(db, "accounts", receiverAccount);
            await updateDoc(receiverAccountRef, {
                balance: increment(amount)
            });
            alert("successfull")
        }
        ).catch(e => alert(e))
    }

    return (
        <div>
            <h2>Send money</h2>
            <input placeholder='phone number' onChange={e => setReceiverphone(e.target.value)} />
            <input type="number" onChange={e => setAmount(e.target.value)} />
            <button onClick={makeTransaction}>send money</button>
        </div>

    )
}

export default SendMoney