import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../Website/Context/UserContext'

export default function Users() {

    const [Users , setUsers] =useState([])
    const [RunuseEffect , setRunuseEffect]=useState(0)
// to get or post or update or delete u must sign in to back end by sending TOKEN
    const context = useContext(User)
    const token = context.Auth.token
    console.log(context);

    useEffect (() => {
        axios.get('http://127.0.0.1:8000/api/user/show' , 
        {headers:
        {Authorization: 'Bearer ' + token  ,},     // the way to send token
        })  // Now you signed in at the backend
        .then((data) => setUsers(data.data))
        .catch((erro) => console.log(erro))
    } , [RunuseEffect])

    async function Delete(id) {
        await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}` , {headers: {Authorization: 'Bearer ' + token ,}, })
        setRunuseEffect( (num) => num + 1 )   // wont run if id isnt delete because of await
    }

    const Showusers = Users.map ( (user , index) => 
        <tr key={index}> 
            <td>{user.name}</td>
            <td>{index + 1}</td>
            <td>{user.email}</td>
            <td>
                <i onClick={ ()=> Delete(user.id)} style={{fontSize: '20px' , color: '#74afb9' , paddingRight: '4px' , cursor: 'pointer'}} className="fa-solid fa-trash"></i> 

                <Link to={`${user.id}`}>     {/* the path is users/id */}
                    <i style={{fontSize: '20px' , color: '#74afb9' , cursor: 'pointer'}} className="fa-solid fa-pen-to-square"></i>
                </Link>
            </td>
        </tr> )

  return (
    <div style={{padding: '20px'}}> 
      <table>
        <thead>
            <tr>
                <th>User</th>
                <th>Id</th>
                <th>Email</th>
                <th>Update & Delete</th>
            </tr>
        </thead>
        <tbody>
            {Showusers}
        </tbody>
      </table>
    </div>
  )
}