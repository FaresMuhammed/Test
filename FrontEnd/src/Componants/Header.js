// import axios from "axios"
// import { Link } from "react-router-dom"
// import Cookies from "universal-cookie" // best way to store in cookie

// export default function Header() {

//     const cookie = new Cookies()
//     const token = cookie.get('Bearer') // get token by name to use it 

//     async function Logout() {
//         await axios.post('http://127.0.0.1:8000/api/logout' , null , {headers:
//         {Authorization: 'Bearer ' + token  ,},   // will delete token in backend due to /logout
//     })
//     cookie.remove('Bearer')  // will delete token in frontend
//     window.location.pathname = '/'
//     }


//     return (
//         <div>
//     {/* // <div className="container shadow"> */}
//         {/* <nav className="flex"> */}
//             {/* <div className="flex">
//                 <Link to='/'> Home </Link>
//             </div> */}

//         {/* <div className="flex"> */}
//             {/* {!token ? (

//             <>
//                 <Link to="/register" className="nav" style={{textAlign:'center'}}>
//                     Register
//                 </Link>
//                 <Link to="/login" className="nav" style={{textAlign:'center'}}>
//                     Login
//                 </Link> */}
//             {/* </> ) :( <>             */}
//                     {/* <Link to="/dashboard" className="nav" style={{textAlign:'center'}}>
//                         Dashboard
//                     </Link> */}
//                     <div className="nav" onClick={Logout}>Log Out</div>
//             {/* </> 
//         )} */}
//         {/* </div> */}
//         {/* </nav> */}
//     </div>
//     )
// }