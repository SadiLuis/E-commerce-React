import React from 'react'
import "./Conversation.css"

function Conversation({conversation, currentUser, friend, notification}) {

  
  return (
      
    <div className={notification?  "notifConversation" : "conversation"}>
        <img className='conversationImg' alt="perfilFoto" src={friend[0]?.avatar} />
            
        <span className='conversationName'>{friend[0]?.nombre}</span>
        
        {/* <span className='conversationNotif'>{notification?  "📨Nuevos mensajes" : ""}</span>  */}

        
        
    </div>
  )
}

export default Conversation