import { useContext, useState } from "react";
import axios from "axios";
import { User } from "../../Website/Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Createuser() {

    const [Name , setName] = useState('')
    const [Email , setEmail] = useState('')
    const [Password , setPassword] = useState('')
    const [Password2 , setPassword2] = useState('')
    const [On , setOn] = useState(false)             
    const [ Emailerror , setEmailerror] = useState(false)

    const context = useContext(User)
    const token = context.Auth.token 

    const Navigate = useNavigate()    

    async function Submit(e) {
    e.preventDefault();
    setOn(true)

        try {
            let SendData = await axios.post('http://127.0.0.1:8000/api/user/create' , {
            name: Name,
            email: Email,
            password: Password,
            password_confirmation: Password2,
            } , {headers: {Authorization: 'Bearer ' + token ,},
           });
            Navigate('/dashboard/users')

    } catch (err) {
        if (err.response.status === 422){
          setEmailerror(true)  
        }
        setOn(true)
    }
    }

  return (
    <div>
        <div className='register' >
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
                        <button className="buttonn" type='submit'>Create</button>
                    </div>

                </form>
            </div>
        </div>
  )
}


