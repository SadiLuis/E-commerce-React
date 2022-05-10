import './Main.css';
import Conversation from "../Conversation/Conversation"
import Message from '../Message/Message';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers, getChatConversations, getChatMessages, postChatConversations, postChatMessage } from '../../../Actions/Chat';
import React from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { BASEURL } from '../../../Assets/URLS';



import io from "socket.io-client"
const socket = io.connect(BASEURL)

function MainChat() {
 
  const user = useSelector((state) => state.loginReducer.userDetail)

  const [currentChat, setCurrentChat] = useState(null)
  let messages = useSelector((state) => state.chatReducer.messages)
  let conversations = useSelector((state) => state.chatReducer.conversations)
  let allUsers = useSelector((state) => state.chatReducer.allUsers)
  let [newMessage, setNewMessage] = useState("")
  let [stateMessages, setStateMessages] = useState("")
  let [arrivalMessage, setArrivalMessage] = useState(null)
  const [room, setRoom] = useState("")
  const scrollRef = useRef()
  let [aux, setAux] =useState(0)
  let [auxConver, setAuxConver] = useState(0)
  const dispatch = useDispatch()

  //////////////////////////////////////////////////////////EMPIEZA SOCKET
    //funcion que emite el mensaje al servidor backend (socket)
    const sendMessage = (newMessage, room) => {

      socket.emit("send_message", {newMessage, room})
    }
  
    //funcion para ingresar a un chat
    const joinRoom = () => {
      if (room !== ""){
        socket.emit("join_room", room)
      }
    }
  
    //funcion que escucha si el backend manda un mensaje (sockket)
    useEffect(() => {
      socket.on("receive_message", (data) => {
        setArrivalMessage({
          sender: data.newMessage.sender,
          text: data.newMessage.text,
          createdAt: Date.now(),
        })
        console.log("has recibido este mensaje: ", data.newMessage)
      })
    }, [socket])
  

    useEffect(() => {
      socket.on("event_welcome", message => {
        console.log(message)
      })
  }, [socket])

  /////////////7///// HASTA ACA SIGUEN LAS COSAS DE SOCKET

  useEffect(() => {
      dispatch(getAllUsers())
  }, [])


  useEffect(() => {
    if(user){
      dispatch(getChatConversations(user.id))
    }
  }, [user, ])


useEffect(() => {
    if (currentChat){   
        dispatch(getChatMessages(currentChat.id))
    }
}, [currentChat, aux, messages])

useEffect(() => {
  setStateMessages((prev) => [...prev, arrivalMessage])
  console.log("stateMessages: ", stateMessages)
  setAux(aux + 1)
}, [arrivalMessage])


useEffect(() => {
    scrollRef.current?.scrollIntoView()
    setStateMessages(messages)
}, [messages, stateMessages])

const handleSubmit =  (e) => {


    e.preventDefault();
    const message = {
        sender: user.id,
        text: newMessage,
        conversationId: currentChat.id
    }

    const receiverId = currentChat.memberAdmin === user.id? currentChat.memberBuyer : currentChat.memberAdmin
    sendMessage(message, currentChat.id)
    

    dispatch(postChatMessage(message))
    setNewMessage("")
    setAux(aux + 1 )

} 

const handleSetNewMessage = (e) => {
  e.preventDefault()
  setNewMessage(e.target.value)
}

const handleSetChat = (conver) => {
  setCurrentChat(conver)
  console.log("current Chat", conver)
  socket.emit("join_room", conver.id)
}

const handleStartChat = (e) => {
  alert("todavia no funciona!")
  // e.preventDefault()

  // let admin = allUsers.find( (elem) => elem.rol === "2")
  // let payload = {
    
  //     memberAdmin: admin.id,
  //     memberBuyer: user.id
  
  // }
  // dispatch(postChatConversations(payload))
  // setAuxConver(auxConver + 1)
}





  if(!user) {
    return <h1>Loading...</h1>
  }else{
    return (
      <div>
          <>
        <div className='messenger'>
          <div className='chatMenu'>
            <div className='chatMenuWrapper'>
                <input placeholder='Search for friends' className='chatMenuInput'/>
                {
                    conversations?.map((conver) => (
  
                      // <div onClick={() => setCurrentChat(conver)}> 
                      <div onClick={() => handleSetChat(conver)}>  
                      <Conversation 
                      conversation={conver}
                      currentUser = {user}
                      friend = { allUsers.filter(elem => elem.id === (conver.memberAdmin === user.id ? conver.memberBuyer : conver.memberAdmin) )}
                      />
                      </div>
                    ))
                }
                
            </div>
          </div>
  
          <div className='chatBox'>
              
            <div className='chatBoxWrapper'>
                {
                  currentChat?
                  <>
                  <div className='chatBoxTop'>
                      {
                          stateMessages?.map( (m) => (
                              <div ref={scrollRef}>
                                  <Message message={m} own={m.sender === user.id} conversationId={currentChat.id} />
                              </div>
                          ))
                      }
                  
                </div>
                <div className='chatBoxBottom'>
                  <textarea onChange={(e) => handleSetNewMessage(e)} value={newMessage} className='chatMessageInput' placeholder='write something'></textarea>
                  <button onClick={(e) => handleSubmit(e) } className='chatSubmitButton'>Send</button>
                </div>
                  </>
                : <>
                { user?.rol == 2? <span className='noConversationText'>Open a Conversation to start a chat</span>
                : 
                  conversations.length > 0 ?
                  <span className='noConversationText'>Open a Conversation to start a chat</span>
                  :      
                   <div className='noConversationText'>
                      <button className=' btn btn-outline-secondary' onClick={(e) => handleStartChat(e)}>Empezar a chatear con Mobi ATR</button>
                   </div>
                   
                }
                </>
                }
                
            </div>
          </div>
  
          
          <div className='chatOnline'>
              <div className='chatOnlineWrapper'>
                  ONLINE
              </div>
          </div>    
        
        
        </div>
      </>
    );
      </div>
    )
  }
  
}

export default MainChat
