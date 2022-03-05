import React from 'react'
import '../../src/css/Home.css'
import Navbar from '../Components/Navbar'

const Home = () => {
    return (
        <div>
        <Navbar/>
        <div className='homeinfo'>
          <h1>Meet banking that keeps pace with you</h1>
          <h3>Open a fully free digital bank account and revamp the way you bank</h3>
          <button type='button' className='home-download'>Download Now</button>
        </div>
        <div className='home-body'>
          <div className='home-body-head'>
            <h1>Your smart account is backed by</h1>
          </div>
          <div className='home-features'>
            <div className='home-feature'>
              <h2>Max Trust</h2>
              <p>We host your account in an RBI-licensed bank</p>
              <img src='https://image.cnbcfm.com/api/v1/image/104240986-GettyImages-638057328.jpg?v=1529474008' alt='' width={100}></img>
            </div>
            <div className='home-feature'>
            <h2>Max Trust</h2>
              <p>We host your account in an RBI-licensed bank</p>
              <img src='https://image.cnbcfm.com/api/v1/image/104240986-GettyImages-638057328.jpg?v=1529474008' alt=''  width={100}></img>
            </div>
            <div className='home-feature'>
            <h2>Max Trust</h2>
              <p>We host your account in an RBI-licensed bank</p>
              <img src='https://image.cnbcfm.com/api/v1/image/104240986-GettyImages-638057328.jpg?v=1529474008' alt=''  width={100}></img>
            </div>
          </div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
    </div>
    )
}

export default Home