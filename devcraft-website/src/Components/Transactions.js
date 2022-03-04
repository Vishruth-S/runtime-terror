import React from 'react'

const Transactions = () => {

    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([])

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    // get userdetails
    const senderdocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(senderdocRef);
    const senderData = docSnap.data()
    const transactionIds = senderData.transactions
    // for each transaction, get transactionDetails
    transactionIds.map(tid => {

    })
    // display
    return (
        <div>Transactions</div>
    )
}

export default Transactions