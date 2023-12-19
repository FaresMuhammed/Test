import axios from "axios"
// import { Link } from 'react-router-dom'
import Cookies from "universal-cookie" // best way to store in cookie

export default function Header2() {

  const cookie = new Cookies()
  const token = cookie.get('Bearer') // get token by name to use it 

  async function Logout() {
    await axios.post('http://127.0.0.1:8000/api/logout' , null , {headers:
    {Authorization: 'Bearer ' + token  ,},   // will delete token in backend due to /logout
  })
  cookie.remove('Bearer')  // will delete token in frontend
  window.location.pathname = '/'
  }


  return (
    <div className='dashboardheader '>
        <h1 className='store'>Dashboard</h1>
        {/* <Link to='/home' className='nav'>Go to Main Page</Link> */}
        <button className="logout" onClick={Logout}>Log Out</button>
    </div>
  )
}