import LetteredAvatar from 'lettered-avatar'
import React from 'react'
import '../css/OverviewQuickTransfer.css'

const OverviewQuickTransfer = ({ allUsers }) => {
    return (
        <div className='qt-container'>
            <h3>QUICK TRANSFER</h3>
            <div className='qt-cards-container'>
                <div className='row'>
                    {allUsers.slice(0, 4).map((user, idx) => (
                        <div className='col-3 text-center' key={idx}>
                            <LetteredAvatar name={user.name} options={{
                                size: 50
                            }} />
                            <p className='qt-name'>{user.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OverviewQuickTransfer