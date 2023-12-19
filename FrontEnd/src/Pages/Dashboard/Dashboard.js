import Header2 from '../../Componants/Dashboardheader'
import Aside from '../../Componants/Aside'
// import Header from '../../Componants/Header'
import './Dashboard.css'

import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className='container'>
      <Header2/>
      <div className='flex2'>
        <Aside/>
        <div style={{width: '80%'}}>
          <Outlet/>
        </div>
        {/* {<Header/>} */}
      </div>
    </div>
  )
}