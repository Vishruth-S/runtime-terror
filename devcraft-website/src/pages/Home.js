import React from 'react'
import '../../src/css/Home.css'
import Navbar from '../Components/Navbar'
import img1 from '../assets/trust.png'
import img2 from '../assets/shield.png'
import img3 from '../assets/insurance.png'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='homeinfo'>
        <h1 className='home-main-title'>Meet banking that keeps pace with you</h1>
        <h3 className='home-main-subtitle'>Open a fully free digital bank account and revamp the way you bank</h3>
        <button type='button' className='home-download'>DOWNLOAD NOW</button>
      </div>
      <div className='home-body'>
        <div className='home-body-head'>
          <h1 className='home-nody-title text-center'>Your smart account is backed by</h1>
        </div>
        <div className='home-features'>
          <div className='home-feature text-center'>
            <img src={img1} alt='' width={100}></img>
            <h2>Max Trust</h2>
            <p>We host your account in an RBI-licensed bank</p>
          </div>
          <div className='home-feature text-center'>
            <img src={img2} alt='' width={100}></img>
            <h2>Max Security</h2>
            <p>Bank grade security and ISO and PCI compliant</p>
          </div>
          <div className='home-feature text-center'>
            <img src={img3} alt='' width={100}></img>
            <h2>Max Safety</h2>
            <p>Your money is insured upto &#8377;10,00,000</p>
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div >
  )
}

export default Home