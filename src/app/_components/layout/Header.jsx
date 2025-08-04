import React from 'react'

const Header = () => {
  return (
    <div className='px-5 py-1 bg-white flex justify-between items-center'>
      <div className="flex justify-center items-center"><figure className='w-[50px] h-[50px]'><img src="/images/logo/logoTest.png" alt="logo" className='w-full h-auto' /></figure></div>
      <div className="">
        <ul className='flex'>
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
        </ul>
      </div>
      <div className="">
        <button>Sign in</button>
        <span className="btn-gradient-border">
          <span className="btn-gradient-border-inner">
            Get Registered
          </span>
        </span>

      </div>
    </div>
  )
}

export default Header