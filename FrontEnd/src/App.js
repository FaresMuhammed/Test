import './Style.css';
import { Route, Routes } from 'react-router-dom';
// Dashboard
import Dashboard from './Pages/Dashboard/Dashboard';
// Users
import Users from './Pages/Dashboard/Users/Users';
import Updateuser from './Pages/Dashboard/Users/Updateuser';
import Createuser from './Pages/Dashboard/Users/Createuser';
// Website
import Authantication from './Pages/Website/Auth/Authantication';
import Signup from './Pages/Website/Auth/Signup';
// import Login from './Pages/Website/Auth/Login';
import RequireAuth from './Pages/Website/Auth/RequireAuth';
import Presistlogin from './Pages/Website/Auth/Presistlogin';
import Products from './Pages/Dashboard/Products/Products';
import Updateproduct from './Pages/Dashboard/Products/Updateproduct';
import Createproduct from './Pages/Dashboard/Products/Createproduct';

export default function App() {
  return (
    <div>
      <Routes>
{/* puplic roots(everyone can access them) */}
        <Route path='/' element={<Authantication/>}/>
        <Route path='/register' element={<Signup/>} />
        {/* <Route path='/login' element={<Login/>} /> */}
        
{/* protected roots */}
        <Route element={<Presistlogin/>}>
          <Route element={<RequireAuth/>}>
            <Route path='/dashboard' element={<Dashboard/>}> 
                {/* instead rout    to add route inside route*/}
                <Route path="users" element={<Users/>}/>         
                <Route path='users/:id' element={<Updateuser/>}/>
                <Route path='users/create' element={<Createuser/>}/>
                <Route path='products' element={<Products/>}/>
                <Route path='products/create' element={<Createproduct/>}/>
                <Route path='products/:id' element={<Updateproduct/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}