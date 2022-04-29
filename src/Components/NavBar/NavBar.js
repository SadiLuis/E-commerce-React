import React, {useState, useEffect} from 'react';
import {NavLink, useNavigate} from "react-router-dom"
//import CartBtn from "../ShoppingCart/CartBtn";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
 //import { logout } from "../../actions/auth";
// import { updateCart } from "../../actions/cart";
// import Footer from "../Footer/Footer";
import styles from "./NavBar.module.css"
import { connect } from "react-redux";







// logo,  home, contactenos 
const NavBarAll = () => {
  return (
    <>
      {/* <Footer /> */}
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
        to="/contactform"
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
        Contáctenos
      </NavLink>
       {/* <NavLink
        to="/cart"
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
         <CartBtn /> 
      </NavLink>  */}
    </>
  );
};

// login y register
const NavBarLogin = () => {
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
      {admin ? (
        <button className="btn btn-success" onClick={handleUsuarioNormal}>
          Comprador
        </button>
      ) : (
        <button className="btn btn-success" onClick={handleAdmin}>
          Administrador
        </button>
      )}
    </>
  );
};

// NavBarAll y perfil
const NavBarAuthenticated = () => {
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
          textDecoration: "none",
          marginBottom:"15rem"
        }}
      >
        Perfil
      </NavLink>
    </>
  );
};

function NavBar({ isAuth, user }) {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleLogout = () => {
  //   setFlag(true);
  //   dispatch(logout());
  //   navigate("/home");
  // };

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
      >Envíos gratis por pedidos mayoristas
      </span >
      </div>

    </nav>
    <nav className="navbar navbar-light bg-light">
        <div className="container-fluid" 
        style={{height:"3rem"}}
        >
          <span className="navbar-brand" 
      style={{
        fontSize: "5rem",
        fontWeight: "bold",
        color: "black",
        border: "solid", borderColor:"orange", borderStyle:"solid",
         marginBottom:"15rem"
        
      }}>
        <h1 >Mobi</h1>
           

          </span>

          {isAuth && user ? (
            <>
              {user.rol === "2" ? <NavBarAdmin /> : <NavBarAuthenticated />}
              <button
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
          <div className={styles.buscador}>

          <form className="d-flex">
            <SearchBar  />
          </form>
          </div>
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
