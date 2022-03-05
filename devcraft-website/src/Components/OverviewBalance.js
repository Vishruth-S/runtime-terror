import React from 'react'
import '../css/OverviewBalance.css'
import CreditCard from './CreditCard'

const OverviewBalance = ({ accountData }) => {
    return (
        <div>
            <h2>Welcome!</h2>
            <div className='balance-b-container'>
                <p className='balance-heading'>Total balance</p>
                <p className='balance-amount'>${accountData.balance}</p>
            </div>
            <div className='balance-cards-container'>
                <h3>Your cards</h3>
                <CreditCard />
            </div>
        </div>
    )
}

export default OverviewBalance