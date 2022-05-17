import React from 'react'
import emailjs from '@emailjs/browser'
import logo from "../../Assets/default.png"



function ConfirmaciónMail(props) {
    // <img src="cid:default.png" alt="Logo"></img>
    let templateParams={
        nombre:props.nombre,
        email:props.email,
        cantidad:props.cantidad,
        producto:props.producto,
        total:props.total,
        direccion:props.direccion,
        ciudad:props.ciudad,
        provincia:props.provincia,
        
        
        

    }
   
    console.log(templateParams)
    
    
    let serviceId = "service_gdddw8y"
    let templateId = "template_72orib2"
    let publicId= "wkXPva2n7QLGliSM8" 
    
    
    emailjs.send(serviceId, templateId, templateParams,  publicId)
    
    .then(function(response){
        
        console.log("Success", response.status, response.text)
    }, function(error){
        console.log("Failed", error)
        
    })


  return (
    <div className='container'>
         
        
         {ConfirmaciónMail }
         
        
           
           
        
        
        </div>
  )
}

export default ConfirmaciónMail