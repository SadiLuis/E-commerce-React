import React from 'react';
import { useDispatch,useSelector } from "react-redux";
// import { getAllUsers } from '../../Actions/users';
import { getUserDetail, logout } from '../../Actions/Auth';
import { Link } from 'react-router-dom';

export default function Logout() {
    const dispatch=useDispatch();
    function handleLogoutUser(e){
        e.preventDefault()
        dispatch(logout())
    }
  return (
    <div>
        <button onClick={handleLogoutUser}></button>
    </div>
  )
}
