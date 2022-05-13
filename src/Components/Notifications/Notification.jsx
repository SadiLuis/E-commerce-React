 import "./Notifications.css";
//import Notification from "../../Assets/notification.svg"
// import Message from "../../Assets/message.svg";
// import Settings from "../../Assets/settings.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../AdminProduct/CreateProduct";


let notificationIMG = "https://cdn-icons-png.flaticon.com/512/61/61073.png?w=360"
let messageIMG = "http://assets.stickpng.com/images/584856b4e0bb315b0f7675ac.png" 

const Notifications = ({ socket}) => {
    
  const user = useSelector((state) => state.loginReducer.userDetail)  
  const [chatNotifications, setChatNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);


  useEffect(() => {
    socket.on("notif_newMessage", (data) => {
        
        if(data.sender == user?.id) return console.log("mismo usuario que sender")
        let notif = ({
            sender : data.sender,
            senderName: data.senderName,
            type: 1,
            detail: ""
        })
            setChatNotifications((prev) => [...prev, notif]);
        
    });
  }, [socket]);

  useEffect(() => {
        socket.on("notif_newReview", (data) => {
            
            console.log("escuche evento notif_newReview", data)
            let notif2 = {
                senderName : data.user,
                type: 2,
                detail: data.producto
            }
            setNotifications((prev) => [...prev, notif2])
        })
  }, [socket])

  
  useEffect(() => {
    socket.on("notif_newOrder", (data) => {
        console.log("escuche evento notif_newOrder", data)
        let notif3 = {
            senderName: "",
            type: 3,
            detail: data.totalPedido
        }
         setNotifications((prev) => [...prev, notif3])
    })
}, [socket])



useEffect(() => {
    socket.on("notif_newRegister", (data) => {
        console.log("escuche evento notif_newRegister", data)
        let notif4 = {
            senderName: data.nombre,
            type: 4,
            detail: ""
        }
         setNotifications((prev) => [...prev, notif4])
    })
}, [socket])


  console.log("notifications de review", notifications)
  const displayNotification = ({ senderName, type, detail }) => {
    let action;
    if (type === 1) {
      action = "le ha enviado nuevos mensajes";
    } else if (type === 2) {
      action = "puntuó el producto";
    } else if (type === 3){
      action = "Nueva compra por un total de $";
    } else if (type === 4){
        action = "se registró en el sitio";
      }
    return (
      <span className="notificationNotifications">{`${senderName} ${action} ${detail} `}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  
  const handleReadChat = () => {
    setChatNotifications([]);
    setOpenMessage(false);
  };

  console.log(notifications)
  
  return (
    <div className="navbarNotifications">
        <span className="logoNotifications">Tranqui! Esto hay que moverlo a la navBar cuando este terminado!</span>
        <div className="iconsNotifications">
            <div className="iconNotifications" onClick={() => setOpen(!open)}>
                    <img src={notificationIMG} className="iconImgNotifications" alt="" />
                    {
                        notifications?.length > 0 && <div className="counterNotifications">{notifications?.length}</div>
                    }
            </div>
        

            <div className="iconNotifications" onClick={() => setOpenMessage(!open)}>
                    <img src={messageIMG} className="iconImgNotifications" alt="" />
                    {
                        
                        chatNotifications.filter((elem) => elem.sender !== user?.id)?.length > 0 && <div className="counterNotifications">{chatNotifications?.filter((elem) => elem.sender !== user?.id)?.length}</div>
                    }
            </div>
        </div>
        {
            open && <div className="notificationsNotifications">
            
            {  notifications?.map(n => (  displayNotification(n) )) }
              <button className="btn btn-outline-secondary" onClick={handleRead}>Marcar como leido</button>  
                
             
                </div>
        }

{
            openMessage && <div className="notificationsNotifications">
            
            {  chatNotifications?.filter((elem) => elem.sender !== user?.id).map(n => (  displayNotification(n) )) }
              <button className="btn btn-outline-secondary" onClick={handleReadChat}>Marcar como leido</button>  
                
             
                </div>
        }
        
    </div>
  );
};

export default Notifications;