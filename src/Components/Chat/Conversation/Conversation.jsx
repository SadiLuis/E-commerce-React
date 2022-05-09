import React from 'react'
import "./Conversation.css"

function Conversation({conversation, currentUser, friend}) {


  return (
      
    <div className="conversation">
        <img className='conversationImg' alt="perfilFoto" src={friend[0]?.avatar} />
        <span className='conversationName'>{friend[0]?.nombre}</span>
        
    </div>
  )
}

export default Conversation