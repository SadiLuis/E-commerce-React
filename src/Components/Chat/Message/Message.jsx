import React from 'react'
import "./Message.css"
// import {format} from "timeago.js" /// Por ahora dejamos sin usar esta libreria 

function Message({message, own, conversationId}) {
  
      if (message.conversationId == conversationId) {
        return (
    <div className={own ? "message own" :'message'}>
        <div className='messageTop'>
            <img className='messageImg'
            src='https://img.freepik.com/foto-gratis/retrato-joven-sonriente-gafas_171337-4842.jpg?w=2000'
            alt='messageImg'
            
            />
            <p className='messageText'>{message.text}</p>
        </div>
        {/* <div className='messageBottom'>{format(message.createdAt)}</div> //Aca esta para agregar hace cuanto se envio/recibio ese mensaje */}
        <div className='messageBottom'>{message.createdAt}</div>
    </div>
    
        )
    }
}

export default Message