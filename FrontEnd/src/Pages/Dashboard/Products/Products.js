import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../Website/Context/UserContext'

export default function Products() {

    const [Products , setProducts] =useState([])
    const [RunuseEffect , setRunuseEffect]=useState(0)
    const context = useContext(User)
    const token = context.Auth.token
    console.log(context);

    useEffect (() => {
        axios.get('http://127.0.0.1:8000/api/product/show' , 
        {headers:
        {Authorization: 'Bearer ' + token  ,}, 
        })  // كدا سجلت الدخول في الباك
        .then((data) => setProducts(data.data))
        .catch((erro) => console.log(erro))
    } , [RunuseEffect])

    async function Delete(id) {
        await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}` , {headers: {Authorization: 'Bearer ' + token ,}, })
        setRunuseEffect( (num) => num + 1 )
    }

    const Showproducts = Products.map ( (product , index) => 
        <tr key={index}> 
            <td>{product.title}</td>
            <td>{index + 1}</td>
            <td>{product.description}</td>
            <td>
                <i onClick={ ()=> Delete(product.id)} style={{fontSize: '20px' , color: '#74afb9' , paddingRight: '4px' , cursor: 'pointer'}} className="fa-solid fa-trash"></i> 

                <Link to={`${product.id}`}>
                    <i style={{fontSize: '20px' , color: '#74afb9' , cursor: 'pointer'}} className="fa-solid fa-pen-to-square"></i>
                </Link>
            </td>
        </tr> )


  return (
    <div style={{padding: '20px'}}> 
      <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Id</th>
                <th>Description</th>
                <th>Update & Delete</th>
            </tr>
        </thead>
        <tbody>
            {Showproducts}
        </tbody>
      </table>
    </div>
  )
}
