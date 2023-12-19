import { useContext, useState } from "react";
import axios from "axios";

import { User } from "../Context/UserContext";
// import Header from "../../../Componants/Header";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Register() {

    const [Email , setEmail] = useState('')
    const [Password , setPassword] = useState('')
    const [On , setOn] = useState(false)             
    const [ Err , setErr] = useState(false)

    // to get user
    const Usernow = useContext(User)
    console.log(Usernow)

    const Navigate = useNavigate()    // useNavigate = window.location

    const cookie = new Cookies()    // you created new cookie 


    async function Submit(e) {              // e is the event (submit)    
    e.preventDefault();                     // to stop the event 
    setOn(true)                             // will be true after submit only (will run)

    try {
        let SendData = await axios.post('http://127.0.0.1:8000/api/login' , {
        email: Email,
        password: Password,
        });
        // SendData  HAVE TOKEN AND ALL USER INFORMATION (which signedup)
        // to get the user token
        const token = SendData.data.data.token     // the way to user's token which in data      
        cookie.set('Bearer' , token) // when login , his token stored in cookie with name 'Bearer'


        // to get all users information
        const Userinformation = SendData.data.data.user


        Usernow.setAuth({token , Userinformation})  // now you have user's information & token in the context
        Navigate('/dashboard')

    } catch (err) {
        if ( err.response.status === 401){     // 401 = unauthorized ( account havent signedup )
          setErr(true)  // 
        }
        setOn(true)
    }
    }

  return (
    <div>
      {/* <Header/>  */}
        <div className='register' >
          <h1>Login</h1>
                <form onSubmit={Submit}>
                      <label htmlFor='email'>Email:</label>
                      <input id='email' type='email' placeholder='Enter Email' 
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}/>

                      <label htmlFor='pass'>Password:</label>
                      <input id='pass' type='password' placeholder='Enter Password' 
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}/>
                      {/* {Password.length < 8 && On && ( <p className="error" >Password Must Be 8 Numbers At Least</p>) } */}

                      <div >
                          <button className="buttonn" type='submit'>Login</button>
                      </div>
                      {Err && On && (<p className="error"> Wrong Email Or Password </p>) }
                    <h4> OR </h4>
                    <Link to="/register" className="navv">
                      <button className="buttonn">Register</button>
                    </Link>
                </form>
            </div>
        </div>
  )
}

