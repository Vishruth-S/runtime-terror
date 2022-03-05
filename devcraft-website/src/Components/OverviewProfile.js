import React from 'react'
import '../css/OverviewProfile.css'

const OverviewProfile = () => {
    return (
        <div>
            <h2>Profile</h2>
            <div className='ov-profile-card'>
                <img className='ov-profile-img' src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" />
                <p className='ov-profile-name'>John Smith</p>
            </div>
        </div>
    )
}

export default OverviewProfile