import React from 'react'
import "./Message.css"
// import {format} from "timeago.js" /// Por ahora dejamos sin usar esta libreria 

function Message({message, own, currentUser, friend}) {
  

        return (
    <div className={own ? "message own" :'message'}>
        {/* <p className='messageBottom'><b>{own ? "" : friend[0]?.nombre + " dice" }</b>  </p>  */}
        <div className='messageTop'>
            <img className='messageImg'
            src={own? currentUser?.avatar : friend[0]?.avatar }
            alt='messageImg'
            
            />
            <p className='messageText'>{message.text}</p>
        </div>
        {/* <div className='messageBottom'>{format(message.createdAt)}</div> //Aca esta para agregar hace cuanto se envio/recibio ese mensaje */}
        {/* <div className='messageBottom'>{message.createdAt}</div> */}
    </div>
    
        )
    
}

export default Message