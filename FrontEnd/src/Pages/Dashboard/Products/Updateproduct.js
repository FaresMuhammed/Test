import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../Website/Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Updateproduct() {

    const [Title , setTitle] = useState('')
    const [Desc , setDesc] = useState('')
    const [Image , setImage] = useState('')             
    const [ On , setOn] = useState(false)

    const context = useContext(User)
    const token = context.Auth.token 

    const Navigate = useNavigate()    

    const ID = window.location.pathname.split('/').slice(-1)  // pathname = all the path , spilit('/') to separate all arrays who after / , splice(-1) to cut the last array (id num) , [0] to change the array to num

    useEffect (() => {
        axios.get(`http://127.0.0.1:8000/api/product/showbyid/${ID}` , 
        {headers:
        {Authorization: 'Bearer ' + token  ,}, 
        })  // كدا سجلت الدخول في الباك
        .then((data) => {
            setTitle(data.data[0].title)
            setDesc(data.data[0].description)
        })
        .catch((erro) => console.log(erro))
    } , [])


    async function Submit(e) {
    e.preventDefault();
    setOn(true)

        try {
            // to send the image
            const formdata = new FormData()   // now you created form
            formdata.append('title' , Title)     // to send name & type to backend
            formdata.append('description' , Desc)
            formdata.append('image' , Image)
            
            let SendData = await axios.post(`http://127.0.0.1:8000/api/product/update/${ID}` , 

            formdata

            , {headers: {Authorization: 'Bearer ' + token ,},
            });
            Navigate('/dashboard/products')

    } catch (err) {
        console.log(err);
        setOn(true)
    }
    }

    return (
    <div>
        <div className='register' >
                <form onSubmit={Submit}>

                    <label htmlFor='name'>Title:</label>
                    <input id='name' type='text' placeholder='Title...'
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}/>
                    {Title === '' && On && ( <p className="error" >Please Enter Title</p> )}

                    <label htmlFor='email'>Description:</label>
                    <input id='email' type='text' placeholder='Description...' 
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)}/>
                    {/* {Emailerror && On && (<p className="error"> This Email Already Taken </p>) } */}

                    <label htmlFor='pass'>Image:</label>
                    <input id='pass' type='file' placeholder='Enter Password' 
                    // value={Image}
                    onChange={(e) => setImage(e.target.files.item(0))}/>
                    {/* {Password.length < 8 && On && ( <p className="error" >Password Must Be 8 Numbers At Least</p>) } */}

                    <div style={{textAlign: 'center'}}>
                        <button className="buttonn" type='submit'>Update</button>
                    </div>

                </form>
            </div>
        </div>
)
}
