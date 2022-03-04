import { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, arrayUnion, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth';
// import DisplayBooks from '../Components/DisplayBooks';


const CreateBankAccount = () => {
    const [accno, setAccno] = useState('')
    const [user, setUser] = useState({})
    const [type, setType] = useState('')
    const [balance, setBalance] = useState(0)
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    const createAccount = async () => {
        await setDoc(doc(db, "accounts", accno), {
            accno: accno,
            userId: user.uid,
            type: type,
            balance: Number(balance),
            cards: []
        }).then(
            updateUserAccounts()
        ).catch(e =>
            alert(e)
        )
    }

    const updateUserAccounts = async () => {
        // console.log(user.uid)
        const userDoc = doc(db, "users", user.uid)
        // console.log(userDoc)
        await updateDoc(userDoc, {
            accounts: arrayUnion(accno)
        }).then(() => {
            alert("Added successfully")
            window.location.reload()
        })
    }


    return (
        <div className="addb">
            <h2>Create your bank account now</h2>
            <div className='add'>
                <input placeholder='account' onChange={e => setAccno(e.target.value)} />
                <input placeholder='balance' onChange={e => setBalance(e.target.value)} />
                <input placeholder='type' onChange={e => setType(e.target.value)} />
                <button onClick={createAccount}>Create your bank account</button>
            </div>
            {/* <DisplayBooks allbooks={allbooks} /> */}
        </div>
    );
}

export default CreateBankAccount;
