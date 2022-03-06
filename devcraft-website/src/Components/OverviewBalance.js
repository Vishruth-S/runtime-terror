import React from 'react'
import '../css/OverviewBalance.css'
import CreditCard from './CreditCard'

const OverviewBalance = ({ accountData }) => {
    return (
        <div>
            <h2>Welcome!</h2>
            <div className='balance-b-container'>
                <p className='balance-heading'>Total balance</p>
                <p className='balance-amount'>	&#8377; {String(accountData.balance).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
            <div className='balance-cards-container'>
                <h3>Your cards</h3>
                <div className='card-1'>
                    <CreditCard balance="50000" digits="1224" expiry="12/24" bg="https://png.pngtree.com/thumb_back/fh260/background/20190828/pngtree-dark-vector-abstract-background-image_302715.jpg" />
                </div>
                <div className='card-2'>
                    <CreditCard balance="30245" digits="4623" expiry="06/24" bg="https://media.istockphoto.com/vectors/colorful-geometry-pattern-background-vector-id1142155778?b=1&k=20&m=1142155778&s=612x612&w=0&h=V5ZBUmwNIBhz1RQ-nIXbJkfPyMJ6LzlxrUo0Xkp-msg=" />
                </div>
            </div>
        </div>
    )
}

export default OverviewBalance