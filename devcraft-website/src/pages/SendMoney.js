import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config';
import '../css/Sendmoney.css'

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
    const [filteredUsers, setFilteredUsers] = useState([])
    const [selected, setSelected] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})

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


    const filterUsers = (num) => {
        setSelected(false)
        const temp = allUsers.filter(user => num.length > 0 && user.phone.indexOf(num) === 0)
        // console.log(temp)
        setFilteredUsers(temp)
    }

    const makeTransaction = async (receiverphone) => {
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
        const transactionsCollectionRef = doc(collection(db, "transactions"))
        let date = new Date()
        date = date.toString().slice(0, 10)

        await setDoc(transactionsCollectionRef,
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
                sentTransactions: arrayUnion(transactionsCollectionRef.id),
                balance: increment(-1 * amount)
            });
            await updateDoc(senderdocRef, {
                sentTransactions: arrayUnion(transactionsCollectionRef.id),
            })

            const receiverAccountRef = doc(db, "accounts", receiverAccount);
            await updateDoc(receiverAccountRef, {
                receivedTransactions: arrayUnion(transactionsCollectionRef.id),
                balance: increment(amount)
            });
            const recieverdocRef = doc(db, "users", receiver.uid);
            await updateDoc(recieverdocRef, {
                receivedTransactions: arrayUnion(transactionsCollectionRef.id),
            })
            alert("successfull")
        }
        ).catch(e => alert(e))
    }

    const selectUser = (user) => {
        // console.log("selected", user)
        setSelectedUser(user)
        setSelected(true)
    }

    return (
        <div className='send-money-container'>
            <div className='text-left'>
                <h2 className='sm-header'>Send Money</h2>
                <div>
                    <p>Enter Phone Number</p>
                    <input className='sm-phone' placeholder='phone number' onChange={e => filterUsers(e.target.value)} />
                </div>
                {!selected && filteredUsers.length > 0 && <div className='send-money-results'>
                    <p>People</p>
                    {!selected && filteredUsers.map(user => (
                        <div key={user.uid} onClick={() => selectUser(user)} className='sm-select row'>
                            <div className='col-2'>
                                <img className="send-money-pic" src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" />
                            </div>
                            <div className='col-10'>
                                <p className='sm-text'>{user.name}</p>
                                <p className='sm-phone'>{user.phone}</p>
                            </div>
                        </div>
                    ))}
                </div>}
                {selected ?
                    <div className='sending-to'>
                        <p>Sending to</p>
                        <div className='row'>
                            <div className='col-3'>
                                <img className="send-money-pic" src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" />
                            </div>
                            <div className='col-9'>
                                <p className='sm-text'>{selectedUser.name}</p>
                                <p className='sm-phone'>{selectedUser.phone}</p>
                            </div>
                        </div>
                    </div>
                    : null}
                <div>
                    <p>Enter Amount</p>
                    <input className='sm-phone' type="number" onChange={e => setAmount(e.target.value)} />
                </div>
                <button className='sm-btn' onClick={() => makeTransaction(selectedUser.phone)}>send money</button>
            </div>
        </div>

    )
}

export default SendMoney