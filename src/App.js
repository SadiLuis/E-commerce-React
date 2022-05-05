import React ,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Detail from "./Screens/Details/Details";
import Home from "./Screens/Home/Home";
import Landing from './Screens/Landing/Landing'

import FAQs from './Screens/Landing/FAQs'
import About from './Screens/Landing/About'
import  NavBarAll from "./Components/NavBar/NavBar"

import ContactForm from "./Components/ContactForm/ContactForm";
import EditProduct from "./Components/AdminProduct/EditProduct"
import Profile from "./Screens/Profile/Profile"

import MyOrders from "./Screens/MyOrders/MyOrders"; 

import {useDispatch ,useSelector} from 'react-redux'

import Cart from './Components/Cart/Cart'
import Dashboard from "./Screens/Dashboard/Dashboard";
import CreateProduct from "./Components/AdminProduct/CreateProduct";

import CreateReview from "./Components/Review/CreateReview/CreateReview";
import Reviews from "./Components/Review/ScreenReviews/Reviews";

import {getUserDetail} from './Actions/Auth'

import AddCategory from "./Components/AddCategory/AddCategory";
import Customers from "./Components/Customers/Customers";

import Orders from "./Components/Orders/Orders";
import UserDetailAdmin from "./Components/UserDetailAdmin/UserDetailAdmin";

 
import ResPassword from "./Components/RestarPassword/ResPassword";



dd9515ff40f9c3f3da46b59f07b32643b7bc80







function App() {
  const token = useSelector((state) => state.loginReducer.token);
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  const userDetail = useSelector((state) => state.loginReducer.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    token && !isAuth && !userDetail && dispatch(getUserDetail());
  }, [token, dispatch, userDetail, isAuth]);
  
  return (
    <div className="App">

      <NavBarAll />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard/admin" element={<Dashboard />} />
        <Route path="/dashboard/admin/EditProduct/:idProduct" element={<EditProduct />} />
        <Route path="/dashboard/admin/addCategory" element={<AddCategory />} />
        <Route path="/dashboard/admin/customers" element={<Customers />} />
        <Route path="/dashboard/admin/orders" element={<Orders/>}/>
        <Route path="/dashboard/admin/userDetailAdmin/:id" element={<UserDetailAdmin/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:idProduct" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route exact path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route exact path="/orders" element={<MyOrders/>}/>
        {/* <Route path="/user" element={<Profile/>}/> */}

        <Route path="/createproduct" element={<CreateProduct/>} />
        <Route exact path="/review/:idProduct" element={<CreateReview />} />
        <Route exact path="/review" element={<Reviews />} />

        <Route path="/recupass" element={<ResPassword/>}/>


      </Routes>


    </div>
  );
}

export default App;
