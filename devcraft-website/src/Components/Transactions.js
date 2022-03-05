import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config';
import { getTransactions } from './GetTransactions';

const Transactions = () => {

    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([])

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });


    const helper = async () => {
        if (!user || !user.uid)
            return;
        const t = await getTransactions(user)
        setTransactions(t)
    }
    useEffect(() => {
        helper()
    }, [user])
    // display
    return (
        <div>
            <h3>Transactions</h3>
            {transactions.map((tr, idx) => (
                <div key={idx}>
                    <p>To: {tr.toUser}</p>
                    <p>Amount: {tr.amount}</p>
                    <p>Date: {tr.date}</p>
                    <p>Phone: {tr.toUserPhone}</p>
                </div>
            ))}
        </div>
    )
}

export default Transactions