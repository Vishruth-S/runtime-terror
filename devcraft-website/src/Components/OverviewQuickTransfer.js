import React from 'react'
import '../css/OverviewQuickTransfer.css'

const OverviewQuickTransfer = ({ allUsers }) => {
    const users = [
        {
            img: "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
            name: "Vishruth S"
        },
        {
            img: "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
            name: "John Doe"
        },
        {
            img: "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
            name: "Jason Silva"
        },
        {
            img: "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
            name: "Jennifer Thomas"
        },
    ]
    return (
        <div className='qt-container'>
            <h3>QUICK TRANSFER</h3>
            <div className='qt-cards-container'>
                <div className='row'>
                    {allUsers.map((user, idx) => (
                        <div className='col-2 text-center' key={idx}>
                            <img className='qt-img' src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" />
                            <p className='qt-name'>{user.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OverviewQuickTransfer