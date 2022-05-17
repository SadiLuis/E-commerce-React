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
import axios from 'axios'




import io from "socket.io-client"
const socket = io.connect(BASEURL)

function MainChat() {
 
  const user = useSelector((state) => state.loginReducer.userDetail)
  const scrollRef = useRef()
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  //let messages = useSelector((state) => state.chatReducer.messages)
  const [conversations, setConversations] = useState([])
  const [newMessage, setNewMessage] = useState("")
  //let conversations = useSelector((state) => state.chatReducer.conversations)
  const [room, setRoom] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [initConver, setInitConver] = useState(true)
  const [auxConver, setAuxConver] = useState(0)
  let allUsers = useSelector((state) => state.chatReducer.allUsers)
  const dispatch = useDispatch()

  /////////////////////////////////////////////////////////////////////////////////Sirve para encontrar al usuario Admin
  useEffect(() => {
    dispatch(getAllUsers())
}, [])

  /////////////////////////////////////////////////////////////////////////////////GET Conversations 
  useEffect(() => {
    if(user) {
      
    const getConversations = async () => {
      try {
        const res = await axios.get(`${BASEURL}/chatconversation/${user?.id}`);
        console.log("resp de getConvers", res.data)
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
    }
  }, [user, auxConver]);


  /////////////////////////////////////////////////////////////////////////////////GET Messages  
  useEffect(() => {
    if(currentChat?.id) {

    
    const getMessages = async() => {
      try {
        var res = await axios.get(`${BASEURL}/chatmessage/${currentChat?.id}`)
        setMessages(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getMessages()
  }
  }, [currentChat])


  //////////////////////////////////////////////////////////EMPIEZA SOCKET
  ///////////////////////////////////////////////////  funcion que emite un mensaje al servidor backend (socket)
    const sendMessage = (newMessage, room) => {

      socket.emit("send_message", {newMessage, room})
    }
  

    useEffect (() => {
      socket.on("newConversation", admin => {
        if(user?.rol === "2") {
        for (let i = 0; i < 6; i++) {
          socket.emit("join_room", i)

        }
      }
          
      })  
  }, [socket])
/////////////////////////////////////////////////////////////////////////funcion para ingresar a un chat
    const joinRoom = () => {
      if (room !== ""){
        socket.emit("join_room", room)
      }
    }
  
    //funcion que escucha si el backend manda un mensaje (sockket)
    useEffect(() => {
      socket.on("receive_message", (data) => {
        console.log("data que llega en el evento receive_message", data)
        setArrivalMessage({
          sender: data.newMessage.sender,
          text: data.newMessage.text,
          createdAt: Date.now(),
        })
        console.log("escuche el evento RECEIVE_MESSAGE")
        
        //if(data.room !== currentChat?.id || !currentChat ) {
          
        
        //setNotification(data)
        //} 
        
      })
    }, [socket])

    useEffect(() => {
      if(arrivalMessage) {
        setMessages((prev) => [...prev, arrivalMessage])

      }
    }, [arrivalMessage])



    useEffect(() => {

      if(user && conversations?.length === 0 && user?.rol === "1" ) {
        let admin = allUsers?.find( (elem) => elem.rol === "2")
        let payload = {
          
            memberAdmin: admin?.id,
            memberBuyer: user?.id
        
        }

        const postConversation = async() => {
          try {
            var json = await axios.post(`${BASEURL}/chatconversation`, payload)
            
            if(json.data === "Ya existe la conversacion") return 
            setConversations(json.data)
          }catch(err){
            
            console.log(err)
          }
        }
        
        postConversation()
        setAuxConver(auxConver + 1)
        //dispatch(postChatConversations(payload))
        socket.emit("newConversation", admin)
      }
    }, [conversations])
  


const handleSetChat = (conver) => {
  setCurrentChat(conver)
  socket.emit("join_room", conver.id)
}

const handleSubmit = async(e) => {
  e.preventDefault()
    const message = {
        sender: user.id,
        text: newMessage,
        conversationId: currentChat.id,
        senderName: user.nombre

    }
    const receiverId = currentChat.memberAdmin === user.id? currentChat.memberBuyer : currentChat.memberAdmin

    try{
      var res = await axios.post(`${BASEURL}/chatmessage`, message)
      console.log("postMesafe", res.data)
      setMessages([...messages, res.data])
    }catch(err){
      console.log(err)
    }

    setNewMessage("")
    //socket emit message
    sendMessage(message, currentChat.id)
    //socket emit notifications
    socket.emit("notif_newMessage", {message, receiverId})


}

useEffect(() => {
  scrollRef.current?.scrollIntoView()
}, messages)

  if(!user) {
    return <h1>Loading...</h1>
  }else{
    return (
      <div>
          <>
        <div className='messenger'>
          <div className='chatMenu'>
            <div className='chatMenuWrapper'>
                <h5 className='chatMenuInput'>Lista de chats</h5>
                { 
                  conversations?.length > 0 &&
                    conversations?.map((conver) => (
  
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
                        messages?.map(m => (
                          <div ref={scrollRef}>
                            {console.log("m", m)}
                            <Message 
                            message={m} 
                            own={m.sender === user?.id }
                            currentUser = {user}
                            // friend = { allUsers.filter(elem => elem.id === (conver.memberAdmin === user.id ? conver.memberBuyer : conver.memberAdmin) )}
                             />
                          </div>
                        ))
                      }
                      
                  
                </div>
                <div className='chatBoxBottom'>
                  <textarea onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className='chatMessageInput' placeholder='Tu Mensaje...'></textarea>
                  <button onClick={handleSubmit}className='chatSubmitButton'>Enviar</button>
                </div>
                </>
                : 
                 <span className='noConversationText'>Abre la conversación para empezar a chatear</span>
                
                }
                
            </div>
          </div>
  
          
          <div className='chatOnline'>
              <div className='chatOnlineWrapper'>
                  
              </div>
          </div>    
        
        
        </div>
      </>
    
      </div>
    )
  }
  
}

export default MainChat
