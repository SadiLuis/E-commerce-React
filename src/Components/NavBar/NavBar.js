import React, {useState, useEffect} from 'react';
import {NavLink, useNavigate} from "react-router-dom"
//import CartBtn from "../ShoppingCart/CartBtn";
import { useDispatch, useSelector } from "react-redux";
 import { logout } from "../../Actions/Auth";
// import { updateCart } from "../../actions/cart";
// import Footer from "../Footer/Footer";
import ShoppingBtn from '../Shopping/ShoppingBtn'
import styles from "./NavBar.module.css"
import { connect } from "react-redux";
import logo from "../../Assets/default.png";
import Logout from '../Login/Logout';









// logo,  home, contactenos 
const NavBarAll = () => {
  // const usuario=useSelector(state =>state.loginReducer.userDetail)
  // console.log(usuario)

  return (
    <>
      {/* <Footer /> */}
      <NavLink
        to="/"
        style={{
          border: "none",
          background: "none",
          color: "black",
          fontSize: "1.5rem",
          marginLeft: "0.01rem",
          cursor: "pointer",
          textDecoration: "none",
           marginBottom:"15rem"

        }}
      >
        <img src={logo} style={{width:"5rem", }}></img>
      </NavLink>
      <NavLink
        to="/home"
        style={{
          border: "none",
          background: "none",
          color: "black",
          fontSize: "1rem",
          marginLeft: "0.05rem",
          cursor: "pointer",
          textDecoration: "none",
           marginBottom:"15rem"

        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/chat"
        style={{
          border: "none",
          background: "none",
          color: "black",
          fontSize: "1rem",
          marginLeft: "0.05rem",
          cursor: "pointer",
          textDecoration: "none",
           marginBottom:"15rem"

        }}
      >
        Chat 
      </NavLink>
      
      <div  style={{
          border: "none",
          background: "none",
          color: "black",
          fontSize: "1rem",
          marginLeft: "0.05rem",
          cursor: "pointer",
          textDecoration: "none",
           marginBottom:"15rem"
        }}>
      <ShoppingBtn />
        </div >
    </>
  );
};

// login y register
const NavBarLogin = ({isAuth, myUser}) => {
     const dispatch=useDispatch();
     const navigate=useNavigate();
   const user= useSelector((state)=> state.loginReducer.userDetail)
   console.log(user)
   
   
   

 function handleLogoutUser(e){
  e.preventDefault();
  dispatch(logout())
}
  return (
    <>
    
      <NavLink
        to="/login"
        style={{
          border: "none",
          background: "none",
          color: "black",
          fontSize: "1rem",
          marginLeft: "0.05rem",
          cursor: "pointer",
          textDecoration: "none",
           marginBottom:"15rem"
        }} 
        
      >
        Log in
      </NavLink>

{isAuth && myUser?(
  <> {user.rol==="1"? <Logout/>  : <NavBarLogin /> }
  <button onClick={handleLogoutUser}
  // style={{
  //   border: "none",
  //   background: "none",
  //   color: "black",
  //   fontSize: "1rem",
  //   marginLeft: "0.05rem",
  //   cursor: "pointer",
  //   textDecoration: "none",
  //    marginBottom:"15rem"
  // }}
  >
    
  </button> 
  </>
):(
          <>
           </>
)
}


      <NavLink
        to="/register"
        style={{
          border: "none",
          background: "none",
          color: "black",
          fontSize: "1rem",
          marginLeft: "0.05rem",
          cursor: "pointer",
          textDecoration: "none",
         marginBottom:"15rem"
        }}
      >
        Registrarse
      </NavLink>

      
    </>
  );
};

// dashboard y sales
const NavBarAdmin = () => {
  const [admin, setAdmin] = useState(true);
  const navigate = useNavigate();

  const handleAdmin = (e) => {
    e.preventDefault();

    setAdmin(true);
    navigate("/dashboard/admin");
  };

  const handleUsuarioNormal = (e) => {
    e.preventDefault();

    setAdmin(false);
    navigate("/home");
  };

  return (
    <>
      {admin ? (
        <>
          <NavLink
            to="/dashboard/admin"
            style={{
              border: "none",
          background: "none",
          color: "black",
          fontSize: "1rem",
          marginLeft: "0.05rem",
          cursor: "pointer",
          textDecoration: "none",
          marginBottom:"15rem"
            }}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/sales"
            style={{
              border: "none",
          background: "none",
          color: "black",
          fontSize: "1rem",
          marginLeft: "0.05rem",
          cursor: "pointer",
          textDecoration: "none",
           marginBottom:"15rem"
            }}
          >
            Sales
          </NavLink>
          <NavLink
            to="/dashboard/offers"
            style={{
              border: "none",
          background: "none",
          color: "black",
          fontSize: "1rem",
          marginLeft: "0.05rem",
          cursor: "pointer",
          textDecoration: "none",
         marginBottom:"15rem"
            }}
          >
            Ofertas
          </NavLink>
        </>
      ) : (
        <NavBarAuthenticated />
      )}
     {/*  {admin ? (
        <button className="btn btn-success" onClick={handleUsuarioNormal}>
          Comprador
        </button>
      ) : (
        <button className="btn btn-success" onClick={handleAdmin}>
          Administrador
        </button>
      )} */}
    </>
  );
};

// NavBarAll y perfil
const NavBarAuthenticated = () => {
  const usuario=useSelector(state =>state.loginReducer.userDetail)
  console.log(usuario)
  return (
    <>
      <NavBarAll />
      <NavLink
        to="/profile"
        style={{
          border: "none",
          background: "none",
          color: "black",
          fontSize: "1rem",
          marginLeft: "0.05rem",
          cursor: "pointer",
          textDecoration: "underline",
          marginBottom:"15rem",
          fontWeight:"bolder"
        }}
      >
        {usuario.nombre}
        {<img src={usuario.img ? usuario.img : usuario.avatar} style={{ marginBottom: "25px", height: "3.5rem", width: "3.5rem", border: "solid", borderColor: "black", borderRadius: "9999px" }}></img>}
        
      </NavLink>
    </>
  );
};

function NavBar({ isAuth, user }) {
  
  
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setFlag(true);
    dispatch(logout());
    navigate("/");
  };

  // useEffect(() => {
  //   if (flag) dispatch(updateCart());
  //   setFlag(false);
  // }, [setFlag, 
  //    updateCart, 
  //   dispatch]);

  return (
    <><nav className='navbar navbar-light bg-dark'style={{height:"2.5rem"}}> 
      <div className="container-fluid" >
      
      <span className="navbar-brand " 
      style={{
        fontSize: "0.5rem",
        fontWeight: "bold",
        color: "white",
        
      }} 
      >Envíos gratis por órdenes de compra superiores a $7.000.
       
      </span >
      
      </div>

    </nav>
    <nav className="navbar navbar-light bg-light" >
        <div className="container-fluid" 
        style={{height:"3rem"}}
        >
          
          {isAuth && user ? (
            <>
              {user.rol === "2" ? <NavBarAdmin /> : <NavBarAuthenticated />}
              <button onClick={handleLogout}
                style={{
                  border: "none",
                  background: "none",
                  color: "black",
                  fontSize: "1rem",
                  marginLeft: "0.05rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  marginBottom:"15rem"
                }}
              >
                Salir
              </button>
              
            </>
          ) : (
            <>
              <NavBarAll />
              <NavBarLogin />
              
            </>
          )}

            

          
          
        </div>
      </nav></>
  
);
}


const mapStateToProps = (state) => {
  
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
  };
};


export default connect(mapStateToProps, null)(NavBar);