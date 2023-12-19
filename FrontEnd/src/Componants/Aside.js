import React from 'react'
import { Link } from 'react-router-dom'

export default function Aside () {
  return (
    <div className='footer'>
      
        <Link to='/dashboard/users'  className='but'>
            {/* <i className="fa-solid fa-users "> </i>  */}
            <h6>Users</h6>
        </Link>

      <Link to='/dashboard/users/create' className='but'>
        {/* <i className="fa-solid fa-plus "></i>  */}
        <h6>New User</h6>
      </Link>
      <Link to='/dashboard/products' className='but'>
        {/* <i className="fa-brands fa-product-hunt "></i>  */}
        <h6>Products</h6>
      </Link>
      <Link to='/dashboard/products/create'  className='but'>
        <div className='p'>
          {/* <i className="fa-solid fa-plus "></i> */}
          <h6>New Product</h6>
        </div>
      </Link>
    </div>
  )
}