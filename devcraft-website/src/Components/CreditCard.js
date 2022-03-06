import React from 'react'
import '../css/CreditCard.css'

const CreditCard = ({ balance, digits, expiry, bg }) => {
    return (
        <div >
            <div className='cred-card' style={{ backgroundImage: `url(${bg})` }}>
                <div className='cred-card-balance'>
                    <p className='cred-card-balance-text'>
                        Balance
                    </p>
                    <p className='cred-card-balance-amount'>
                        &#8377; {String(balance).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                </div>
                <div className='cred-card-details'>
                    <p className='cred-card-num'>
                        **** **** **** {digits}
                    </p>
                    <p className='cred-card-expiry'> {expiry}</p>
                </div>
            </div>
        </div>
    )
}

export default CreditCard