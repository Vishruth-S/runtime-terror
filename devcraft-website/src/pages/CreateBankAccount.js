import { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, arrayUnion, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth';
// import DisplayBooks from '../Components/DisplayBooks';


const accno = String(Math.floor(1000000000 + Math.random() * 9000000000))
export const CreateBankAccount = async (user) => {
    console.log('yes')
    await setDoc(doc(db, "accounts", accno), {
        accno: accno,
        userId: user.uid,
        type: "savings",
        balance: Number(100000),
        cards: []
    }).then(
        updateUserAccounts(user)
    ).catch(e =>
        alert(e)
    )
}

const updateUserAccounts = async (user) => {
    // console.log(user.uid)
    const userDoc = doc(db, "users", user.uid)
    // console.log(userDoc)
    await updateDoc(userDoc, {
        accounts: arrayUnion(accno)
    }).then(() => {
        // alert("Added successfully")
        // window.location.reload()
    })
}


// export default CreateBankAccount;
