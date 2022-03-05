import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config';

const Transactions = () => {

    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([])

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    // get userdetails
    const getTransactions = async () => {
        if (!user || !user.uid)
            return;
        const senderdocRef = doc(db, "users", user.uid)
        let docSnap = await getDoc(senderdocRef)
        const senderData = docSnap.data()
        const sentTransactionIds = senderData.sentTransactions
        console.log(sentTransactionIds)
        let transactionPromises1 = null;
        if (sentTransactionIds) {
            // for each transaction, get transactionDetails
            transactionPromises1 = sentTransactionIds?.map(async tid => {
                const transactionsdocRef = doc(db, "transactions", tid);
                docSnap = await getDoc(transactionsdocRef);
                let transactionData = docSnap.data()
                const receiverDocRef = doc(db, "users", transactionData.toUser)
                docSnap = await getDoc(receiverDocRef)
                const receiverData = docSnap.data()
                let transactionObject = {
                    catergory: transactionData.category,
                    date: transactionData.date,
                    toUser: receiverData.name,
                    toUserPhone: receiverData.phone,
                    amount: "-" + String(transactionData.amount)
                }
                return transactionObject
            })
        }
        const receivedTransactionIds = senderData.receivedTransactions
        let transactionPromises2 = null;
        console.log(receivedTransactionIds)
        if (receivedTransactionIds) {
            transactionPromises2 = receivedTransactionIds.map(async tid => {
                const transactionsdocRef = doc(db, "transactions", tid);
                docSnap = await getDoc(transactionsdocRef);
                let transactionData = docSnap.data()
                const receiverDocRef = doc(db, "users", transactionData.toUser)
                docSnap = await getDoc(receiverDocRef)
                const receiverData = docSnap.data()
                let transactionObject = {
                    catergory: transactionData.category,
                    date: transactionData.date,
                    toUser: receiverData.name,
                    toUserPhone: receiverData.phone,
                    amount: "+" + String(transactionData.amount)
                }
                return transactionObject
            })
        }
        const transactionDetails1 = transactionPromises1 ? await Promise.all(transactionPromises1) : []
        const transactionDetails2 = transactionPromises2 ? await Promise.all(transactionPromises2) : []
        const allTransactions = [...transactionDetails1, ...transactionDetails2]
        console.log(allTransactions)
        allTransactions.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        setTransactions(allTransactions)

    }
    useEffect(() => {
        getTransactions()
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