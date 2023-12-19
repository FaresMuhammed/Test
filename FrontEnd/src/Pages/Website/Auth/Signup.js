import { useContext, useState } from "react";
import axios from "axios";

import { User } from "../Context/UserContext";
import Header from "../../../Componants/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Register() {

    const [Name , setName] = useState('')
    const [Email , setEmail] = useState('')
    const [Password , setPassword] = useState('')
    const [Password2 , setPassword2] = useState('')
    const [On , setOn] = useState(false)             
    const [ Emailerror , setEmailerror] = useState(false)

    

    // to get user
    const Usernow = useContext(User)
    console.log(Usernow)

    const Navigate = useNavigate()    // useNavigate = window.location

    const cookie = new Cookies()    // you created new cookie 

    async function Submit(e) {              // e is the event (submit)    
    e.preventDefault();                     // to stop the event 
    setOn(true)                             // will be true after submit only (will run)

        try {
            let SendData = await axios.post('http://127.0.0.1:8000/api/register' , {
            name: Name,
            email: Email,
            password: Password,
            password_confirmation: Password2,
            });
            // SendData  HAVE TOKEN AND ALL USER INFORMATION (which signedup)
            // to get the user token
            const token = SendData.data.data.token     // the way to user's token which in data      

            cookie.set('Bearer' , token) // token stored in cookie with name 'Bearer'

            // to get all users information
            const Userinformation = SendData.data.data.user

            Usernow.setAuth({token , Userinformation})  // now you have user's information & token in the context
            Navigate('/')

    } catch (err) {
        if (err.response.status === 422){
          setEmailerror(true)  // 
        }
        setOn(true)
    }
    }

  return (
    <div className="background">
      {/* {''}/ */}
      {/* <Header/> */}
        <div className='register' >
          <h1>Register</h1>
                <form onSubmit={Submit}>

                    <label htmlFor='name'>Name:</label>
                    <input id='name' type='text' placeholder='Enter Name'
                    value={Name}
                    onChange={(e) => setName(e.target.value)}/>
                    {Name === '' && On && ( <p className="error" >Please Enter Your Name</p> )}

                    <label htmlFor='email'>Email:</label>
                    <input id='email' type='email' placeholder='Enter Email' 
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    {Emailerror && On && (<p className="error"> This Email Already Taken </p>) }

                    <label htmlFor='pass'>Password:</label>
                    <input id='pass' type='password' placeholder='Enter Password' 
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    {Password.length < 8 && On && ( <p className="error" >Password Must Be 8 Numbers At Least</p>) }

                    <label htmlFor='pass2'>Verify Password:</label>
                    <input id='pass2' type='password' placeholder='Enter Password' 
                    value={Password2}
                    onChange={(e) => setPassword2(e.target.value)}/>
                    {Password !== Password2 && On && ( <p className="error" >Password Doesn't Match</p>) }

                    <div style={{textAlign: 'center'}}>
                        <button className="buttonn" type='submit'>Register</button>
                    </div>
                </form>
            </div>
        </div>
  )
}