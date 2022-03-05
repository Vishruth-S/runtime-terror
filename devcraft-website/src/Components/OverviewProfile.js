import React from 'react'
import '../css/OverviewProfile.css'

const OverviewProfile = ({ userData }) => {
    return (
        <div>
            <h2>Profile</h2>
            <div className='ov-profile-card'>
                <img className='ov-profile-img' src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" />
                <p className='ov-profile-name'>{userData.name}</p>
                <p>{userData.phone}</p>
            </div>
        </div>
    )
}

export default OverviewProfile