import { useContext, useEffect, useState } from "react";
import { User } from "../Context/UserContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../../../Componants/Loading";
import Cookies from "universal-cookie";

export default function Presistlogin() {

    const context = useContext(User) //current user
    const token = context.Auth.token
    console.log(context);

    const [Loading , setLoading] = useState(true)

    // when refresh the context will hide so we use cookies

    // cookie
    const cookie = new Cookies()    // you created new cookie 
    const getTokenn = cookie.get('Bearer') // now you get the token by his name
    
    useEffect ( () => {
    // send refresh token
        async function Refresh() {
            try {  // this link will get new token and delete the old , null = there isnt data to send with post
                await axios.post ('http://127.0.0.1:8000/api/refresh' , null ,
                {headers: {Authorization: 'Bearer ' + getTokenn ,}, })
                .then( (data) => {
                    console.log(data);
                cookie.set('Bearer' , data.data.token )
                context.setAuth( (prev) => { return {Userinformation: data.data.user , token: data.data.token} } )} )  // to get the old&new tokens and replace the old token to the new token
            }catch (err) {
                console.log(err);
            }finally {setLoading(false)}
        }
        !token ? Refresh() : setLoading(false)
} , [] )


  return Loading? <LoadingScreen/> : <Outlet/>}

// we need to store the token in cookie to didn't lose it when refresh
// npm i universal-cookie
