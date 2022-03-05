import React from 'react'
import OverviewBalance from '../Components/OverviewBalance'
import OverviewProfile from '../Components/OverviewProfile'
import OverviewQuickTransfer from '../Components/OverviewQuickTransfer'
import OverviewTransactions from '../Components/OverviewTransactions'
import '../css/Overview.css'

const Overview = () => {
    return (
        <div className='ov-main-container'>
            <div className='row'>
                <div className='col-2'>
                    <OverviewProfile />
                </div>
                <div className='col-5'>
                    <OverviewBalance />
                </div>
                <div className='col-5'>
                    <OverviewQuickTransfer />
                    <OverviewTransactions />
                </div>
            </div>
        </div>
    )
}

export default Overview