import "./Notifications.css";
//import Notification from "../../Assets/notification.svg"
// import Message from "../../Assets/message.svg";
// import Settings from "../../Assets/settings.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../AdminProduct/CreateProduct";
import { deleteChatNotifications, deleteNotifications } from "../../Actions/notifications";


let notificationIMG = "https://cdn-icons-png.flaticon.com/512/61/61073.png?w=360"
let messageIMG = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/message-icon-design-template-ff734aad72da096f0e49f3d693042135_screen.jpg?ts=1581057128" 

const Notifications = ({ socket}) => {
    
  const user = useSelector((state) => state.loginReducer.userDetail)
  const dbChatNotifications = useSelector((state) => state.notifReducer.chatNotifications)
  const dbNotifications = useSelector((state) => state.notifReducer.notifications)  
  const [chatNotifications, setChatNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const dispatch = useDispatch()

  //console.log("db Chat", dbChatNotifications)
  //console.log("db Notif", dbNotifications)


  ////////////////////////////////////////////////////////////////////////////////// Notif when new chat messages
  useEffect(() => {
    socket?.on("notif_newMessage", (data) => {
        if(user && data.receiverId == user?.id) {
          if(user?.rol === "2" && user?.email !== "admin@gmail.com") return console.log("es admin pero EL ADMIN original")
            let notif = ({
                sender : data.message.sender,
                senderName: data.message.senderName,
                receiver: data.receiverId,
                type: 1,
                text: ""
            })
              if (!chatNotifications.includes(notif)) {
                setChatNotifications((prev) => [...prev, notif]);
              }
           
        }
    });
  }, [socket, user]);

  ////////////////////////////////////////////////////////////////////////////////// Notif when new review  posted
  useEffect(() => {
        socket?.on("notif_newReview", (data) => {
            console.log("llego notif_newReview con data: ", data)
            if(user && user?.rol === "2") {


                let notif2 = {
                    senderName : data.senderName,
                    type: data.type,
                    text: data.text
                }
                setNotifications((prev) => [...prev, notif2])
                
            }
        })       
  }, [socket, user])

    ////////////////////////////////////////////////////////////////////////////////// Notif when a new order has made
  useEffect(() => {
    socket?.on("notif_newOrder", (data) => {
       if (user && user?.rol == 2 && data.text > 0 ) {
            
        let notif3 = {
            senderName: "",
            type: 3,
            text: data.text
        }
         setNotifications((prev) => [...prev, notif3])
        }
    })
}, [socket, user])

  ////////////////////////////////////////////////////////////////////////////////// Notif when order status has changed

useEffect(() => {
    socket?.on("notif_newOrderStatus", (data) => {
      console.log("Esto es lo que llega a notif newOrderStatus", data)
       if (user && user?.id == data.userId) {
        let notif5 = {
            senderName: "Su orden N° " + data.text,
            type: 5,
            text: data.status === "ENPROCESO" ? "Enviada" : data.status === "ENVIADO" ?  "Entregada" : ""
        }

         if (notifications && notifications.length > 0 && notifications.filter(noti => noti.senderName == notif5.senderName)) {
          
         }else{
           
         setNotifications((prev) => [...prev, notif5])
          
         }
        
      }
  })
}, [socket, user])


  ////////////////////////////////////////////////////////////////////////////////// Notif when new user has registered
console.log("notif", notifications)
useEffect(() => {
    socket?.on("notif_newRegister", (data) => {
        if(user && user?.rol == 2) {
            
        let notif4 = {
            senderName: data.senderName,
            type: 4,
            text: ""
        }
         setNotifications((prev) => [...prev, notif4])
        }
    })
}, [socket, user])



  ///////////////////////////////////////////////////////////////////////filtramos para que sean Chatnotif unicas!
  let auxChatNotifications= new Set( chatNotifications.map( JSON.stringify ) )
  let uniqueChatNotifications = Array.from( auxChatNotifications ).map( JSON.parse );

  uniqueChatNotifications = uniqueChatNotifications.concat(dbChatNotifications)

  
  ////////////////////////////////////////////////////////////////////////filtramos para que sean notif unicas!
  let auxNotifications= new Set( notifications.map( JSON.stringify ) )
  let uniqueNotifications = Array.from( auxNotifications ).map( JSON.parse );

  uniqueNotifications = uniqueNotifications.concat(dbNotifications)
  
  


  const displayNotification = (n) => {
    let action;
    if (n.type === 1) {
      action = "le ha enviado nuevos mensajes";
      return <span className="notificationNotifications">{`📨 ${n.senderName} ${action} ${n.text} `}</span>
      
    } else if (n.type === 2) {
      action = "puntuó el producto";
      return <span className="notificationNotifications">{`🔎 ${n.senderName} ${action} ${n.text} `}</span>
    } else if (n.type === 3){
      action = "Nueva compra por un total de $";
      return <span className="notificationNotifications">{`🛒 ${n.senderName} ${action} ${n.text} `}</span>

    } else if (n.type === 4){
        action = "se registró en el sitio";
        return <span className="notificationNotifications">{`📘 ${n.senderName} ${action} ${n.text} `}</span>

      } else if (n.type === 5) {
          return <span className="notificationNotifications">📦 {n.senderName} ha sido {n.text} </span>
      }
    return (
      <span className="notificationNotifications">{`${n.senderName} ${action} ${n.text} `}</span>
    );
  };

  const handleRead = (userId) => {
    setNotifications([]);
    dispatch(deleteNotifications(userId))
    setOpen(false);
  };

  
  const handleReadChat = (userId) => {
    setChatNotifications([]);
    dispatch(deleteChatNotifications(userId))    
    setOpenMessage(false);
  };

  

  if(user?.id) {
    return (
      <div className="navbarNotifications">
          <div className="iconsNotifications">
            
              <div className="iconNotifications" onClick={() => setOpen(!open)}>
                      <img src={notificationIMG} className="iconImgNotifications" alt="" />
                      {
                          uniqueNotifications?.length > 0 && <div className="counterNotifications">{uniqueNotifications?.length}</div>
                      }
              </div>
          
  
              <div className="iconNotifications" onClick={() => setOpenMessage(!open)}>
                      <img src={messageIMG} className="iconImgNotifications" alt="" />
                      {
                          
                          uniqueChatNotifications?.length > 0  && <div className="counterNotifications">{uniqueChatNotifications?.length}</div>
                      }
              </div>
          </div>
          {
              open && <div className="notificationsNotifications">
              
              {  uniqueNotifications?.map(n => (  displayNotification(n) )) }
                <div className="nButtonNotifications">
                <button className="btn btn-outline-secondary" onClick={() => handleRead(user.id)}>Marcar como leido</button>  
                </div>  
               
                  </div>
          }
  
  {
              openMessage && <div className="notificationsNotifications">
              
              {  uniqueChatNotifications?.map(n => (  displayNotification(n) )) }
                <div className="nButtonNotifications">  
                <button className="btn btn-outline-secondary" onClick={() => handleReadChat(user.id)}>Marcar como leido</button>  
                </div>  
               
                  </div>
          }
          
      </div>
    );
  }
  
};

export default Notifications;