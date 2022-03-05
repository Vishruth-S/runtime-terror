import React from 'react'
import '../css/CreditCard.css'

const CreditCard = () => {
    return (
        <div>
            <div className='cred-card'>
                <div className='cred-card-balance'>
                    <p className='cred-card-balance-text'>
                        Balance
                    </p>
                    <p className='cred-card-balance-amount'>
                        $50,000
                    </p>
                </div>
                <div className='cred-card-details'>
                    <p className='cred-card-num'>
                        **** **** **** 1224
                    </p>
                    <p className='cred-card-expiry'> 12/24</p>
                </div>
            </div>
        </div>
    )
}

export default CreditCard