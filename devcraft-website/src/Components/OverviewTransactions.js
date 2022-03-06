import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase-config';
import { getTransactions } from './GetTransactions';
import '../css/OverviewTransactions.css'
import LetteredAvatar from 'lettered-avatar';

const OverviewTransactions = () => {
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


    return (
        <div>
            <h2 className='mt-5'>RECENT TRANSACTIONS</h2>
            <div className='transactions-container'>
                {transactions.length === 0 ? <p>you don't have any transactions</p> : null}
                {transactions.map((tr, id) => (
                    <div key={id}>
                        <div className='row'>
                            <div className='col-2'>
                                <LetteredAvatar name={tr.toUser} />
                            </div>
                            <div className='col-7'>
                                <p className='transaction-user'>{tr.toUser}</p>
                                <p className='transaction-date'>{tr.date}</p>
                            </div>
                            <div className='col-3 transaction-amount'>
                                <span className={tr.amount[0] === '+' ? 'green' : 'red'}>{tr.amount[0]} 	&#8377; {tr.amount.slice(1)}</span>
                            </div>
                        </div>
                        <hr className='transaction-hr' />
                        {/*                         
                        <p>+91 {tr.toUserPhone}</p> */}


                    </div>
                ))}
            </div>
        </div>
    )
}

export default OverviewTransactions