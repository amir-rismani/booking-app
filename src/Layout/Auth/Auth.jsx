import { Outlet } from 'react-router-dom'
import "./Auth.css"
function Auth() {
  return (
    <div className='auth-layout'>
      <div className='auth-modal'>
        <Outlet />
      </div>
    </div>
  )
}

export default Auth