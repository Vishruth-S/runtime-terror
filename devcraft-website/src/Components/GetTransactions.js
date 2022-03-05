import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config';

export const getTransactions = async (user) => {
    const senderdocRef = doc(db, "users", user.uid)
    let docSnap = await getDoc(senderdocRef)
    const senderData = docSnap.data()
    const sentTransactionIds = senderData.sentTransactions
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
    if (receivedTransactionIds) {
        transactionPromises2 = receivedTransactionIds.map(async tid => {
            const transactionsdocRef = doc(db, "transactions", tid);
            docSnap = await getDoc(transactionsdocRef);
            let transactionData = docSnap.data()
            const receiverDocRef = doc(db, "users", transactionData.fromUser)
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
    // console.log(allTransactions)
    allTransactions.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
    return allTransactions
}
