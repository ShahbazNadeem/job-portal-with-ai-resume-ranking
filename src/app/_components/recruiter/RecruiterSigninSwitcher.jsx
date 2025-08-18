'use client'
import React, { Suspense, useEffect, useState } from 'react'
import RecruiterSignup from './RecruiterSignup'
import RecruiterLogin from './RecruiterLogin'

const RecruiterSigninSwitcher = () => {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    document.title = login ? 'Login - Recruiter' : 'Sign Up - Recruiter';
  }, [login]);
  return (
    <div className='px-5'>
      {login ? <Suspense><RecruiterLogin /></Suspense> : <RecruiterSignup />}
      <span className="flex justify-center cursor-pointer text-white"
        onClick={() => setLogin(!login)} >
        {login
          ? "Don't have an Account? Sign Up"
          : 'Already have an Account? Login'}
      </span>
    </div>
  )
}

export default RecruiterSigninSwitcher