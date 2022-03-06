import LetteredAvatar from 'lettered-avatar'
import React from 'react'
import '../css/OverviewProfile.css'
import img1 from '../assets/upa.png'
import img2 from '../assets/dwa.png'
import img3 from '../assets/more.png'
import { Link } from 'react-router-dom'

const OverviewProfile = ({ userData }) => {
    return (
        <div>
            <div className='ov-profile-card'>
                <LetteredAvatar
                    name={userData.name}
                    options={{
                        size: 100
                    }}
                />
                {/* <img className='ov-profile-img' src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" /> */}
                <p className='ov-profile-name'>{userData.name}</p>
                <p>+91 {userData.phone}</p>
                <div className='row ov-profile-box'>
                    <div className='col-4 text-center'>
                        <Link to='/sendmoney'>
                            <img className='ov-tag' src={img1} />
                            <p className='ov-tag-t'>Send</p>
                        </Link>
                    </div>
                    <div className='col-4 ext-center'>
                        <img className='ov-tag' src={img2} />
                        <p className='ov-tag-t'>Receive</p>
                    </div>
                    <div className='col-4 ext-center'>
                        <img className='ov-tag' src={img3} />
                        <p className='ov-tag-t'>Others</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewProfile