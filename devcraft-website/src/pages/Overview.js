import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import OverviewBalance from '../Components/OverviewBalance'
import OverviewProfile from '../Components/OverviewProfile'
import OverviewQuickTransfer from '../Components/OverviewQuickTransfer'
import OverviewTransactions from '../Components/OverviewTransactions'
import '../css/Overview.css'
import { auth, db } from '../firebase-config'
import Navbar from '../Components/Navbar'

const Overview = () => {
    const [user, setUser] = useState({});
    const [allUsers, setAllUsers] = useState([])
    const [userData, setUserdata] = useState({})
    const [accountData, setAccountData] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    let users;

    const getAllUsers = async () => {
        const usersCollectionRef = collection(db, "users")
        const data = await getDocs(usersCollectionRef)
        users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setAllUsers(users)
    }

    const getUserData = async () => {
        if (!user.uid) return;
        const userdocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userdocRef);
        const userData = docSnap.data()
        setUserdata(userData)
        getBalance(userData)
    }

    const getBalance = async (userData) => {
        const userAccount = userData.accounts[0]
        const userAccountRef = doc(db, "accounts", userAccount);
        const userAccountSnap = await getDoc(userAccountRef)
        const userAccountData = userAccountSnap.data()
        setAccountData(userAccountData)
    }

    useEffect(() => {
        getAllUsers()
        getUserData()
    }, [user])

    return (
        <>
            <Navbar />
            <div className='ov-main-container'>
                <div className='row'>
                    <div className='col-2 prof-col'>
                        <OverviewProfile userData={userData} />
                    </div>
                    <div className='col-5 main-col'>
                        <OverviewBalance accountData={accountData} />
                    </div>
                    <div className='col-5 t-col'>
                        <OverviewQuickTransfer allUsers={allUsers} />
                        <OverviewTransactions />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview