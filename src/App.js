import React, { useEffect } from "react";
import { Route, Routes ,useNavigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Detail from "./Screens/Details/Details";
import Home from "./Screens/Home/Home";
import Landing from './Screens/Landing/Landing'

import FAQs from './Screens/Landing/FAQs'
import About from './Screens/Landing/About'
import NavBarAll from "./Components/NavBar/NavBar"

import ContactForm from "./Components/ContactForm/ContactForm";
import EditProduct from "./Components/AdminProduct/EditProduct"
import Profile from "./Screens/Profile/Profile"
import EditProfile from "./Screens/Profile/EditProfile"
import MyOrders from "./Screens/MyOrders/MyOrders";

import { useDispatch, useSelector } from 'react-redux'

import Cart from './Components/Cart/Cart'
import Dashboard from "./Screens/Dashboard/Dashboard";
import CreateProduct from "./Components/AdminProduct/CreateProduct";

import CreateReview from "./Components/Review/CreateReview/CreateReview";
import Reviews from "./Components/Review/ScreenReviews/Reviews";

import { getUserDetail } from './Actions/Auth'

import AddCategory from "./Components/AddCategory/AddCategory";
import Customers from "./Components/Customers/Customers";

import Orders from "./Components/Orders/Orders";
import UserDetailAdmin from "./Components/UserDetailAdmin/UserDetailAdmin";

import ResPassword from "./Components/RestarPassword/ResPassword";

import OrderDetailAdmin from "./Components/OrderDetailAdmin/OrderDetailAdmin";

import Checkout from "./Components/Checkout/Checkout";
import CheckoutConfirm from "./Components/Checkout/CheckoutDetail/CheckoutConfirm";

import './App.css'


import Chat from "./Screens/Chat/Chat";
import ResetPasswordForm from './Components/RestarPassword/ResetPasswordForm'

import DetailProductScreen from "./Components/DetailProductScreen/DetailProductScreen.jsx";
import AddAdmin from "./Components/AddAdmin/AddAdmin";

import MyFavs from "./Screens/MyFavs/MyFavs";



import { BASEURL } from '../src/Assets/URLS';
import DetailPedido from "./Screens/MyOrders/DetailPedido";
import RequiredAuth from "./Components/RequiredAuth.jsx"


import io from "socket.io-client"
import Notifications from "./Components/Notifications/Notification";
import Model from "./Components/ObjectDetector/Model";
const socket = io.connect(BASEURL)



function App() {
  const token = useSelector((state) => state.loginReducer.token);
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  const userDetail = useSelector((state) => state.loginReducer.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    token && !isAuth && !userDetail && dispatch(getUserDetail());
  }, [token, dispatch, userDetail, isAuth]);



  useEffect(() => {
    socket.on("event_welcome", (data) => {
      console.log(data)
    })
  }, [socket])



  return (

    <div className="App">

      <NavBarAll socket={socket}/>
      <Notifications socket={socket} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
       
        <Route path="/dashboard/admin" element={ <RequiredAuth><Dashboard /></RequiredAuth>} />
        <Route path="/dashboard/admin/EditProduct/:idProduct" element={ <RequiredAuth><EditProduct /></RequiredAuth> } />
        <Route path="/dashboard/admin/createProduct" element={<RequiredAuth><CreateProduct /></RequiredAuth>  }  />
        <Route path="/dashboard/admin/addCategory" element={<RequiredAuth><AddCategory /></RequiredAuth> } />
        <Route path="/dashboard/admin/customers" element={<RequiredAuth><Customers /></RequiredAuth> } />
        <Route path="/dashboard/admin/orders" element={<RequiredAuth><Orders /></RequiredAuth> } />
        <Route path="/dashboard/admin/userDetailAdmin/:id" element={ <RequiredAuth><UserDetailAdmin /></RequiredAuth>} />
        <Route path="/dashboard/admin/orderDetailAdmin/:id/:idUser" element={<RequiredAuth><OrderDetailAdmin socket={socket} /></RequiredAuth> } />
        
        <Route path="/register" element={<Register socket={socket} />} />

        <Route path="/dashboard/admin/detailProduct/:id" element={<RequiredAuth><DetailProductScreen /></RequiredAuth>  } />

        <Route path="/dashboard/admin/addAdmin" element={<RequiredAuth><AddAdmin /></RequiredAuth>  } />
        <Route path="/detail/:idProduct" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/profile" element={<RequiredAuth> <Profile /></RequiredAuth> } />
        <Route path="/profile/editProfile" element={<RequiredAuth><EditProfile /></RequiredAuth>  } />
        <Route path='/cart' element={<Cart />} />
        <Route exact path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route exact path="/orders" element={<RequiredAuth><MyOrders /></RequiredAuth>  } />
        {/* <Route path="/user" element={<Profile/>}/> */}
        <Route path="/pedido" element={<RequiredAuth><Checkout /></RequiredAuth> } />

        <Route path="/createproduct" element={<RequiredAuth><CreateProduct /></RequiredAuth>  } />
        <Route exact path="/review/:idProduct" element={<RequiredAuth> <CreateReview socket={socket} /></RequiredAuth>} />
        <Route exact path="/review" element={<RequiredAuth><Reviews /></RequiredAuth>} />
        <Route path="/recupass" element={<ResPassword />} />
        <Route path="/pago" element={<RequiredAuth>< CheckoutConfirm socket={socket} /></RequiredAuth> } />
        <Route path="/chat" element={ < Chat /> } />
        <Route path="/login/recoverpassword" element={<ResPassword />} />


         
         <Route path="/buyDetail/:id" element = {<RequiredAuth><DetailPedido /></RequiredAuth>  } />
        <Route path="/resetpassword/:userId" element={<RequiredAuth><ResetPasswordForm /></RequiredAuth>} />
        <Route path="/MyFavs" element={<RequiredAuth><MyFavs/></RequiredAuth>  }/>

        <Route path="/ideas" element={<Model/>}/>
      </Routes>


    </div>
  );
}

export default App;
