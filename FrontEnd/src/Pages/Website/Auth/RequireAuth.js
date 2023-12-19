// protected roots by context

import { useContext } from "react"
import { User } from "../Context/UserContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"


export default function RequireAuth() {

    const Userr = useContext(User)
    const location = useLocation()   // useLocation got the path
                                                                // get the last location an replace it with login
  return Userr.Auth.Userinformation ? (<Outlet/>) : (<Navigate state={{from:location}} replace to='/'/>) // if there is user signedin , show the outlet (insteaded roots of RequireAuth) , if not, change current page to login page 
// now if u clicked on dashboard without signed in u will go to Authantication page
}

