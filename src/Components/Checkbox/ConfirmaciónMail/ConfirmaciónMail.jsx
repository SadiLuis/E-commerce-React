import React from 'react'
import emailjs from '@emailjs/browser'
import logo from "../../../Assets/logoM.png"


function ConfirmaciónMail(props) {
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
    
    
    let serviceId = "service_c72nnat"
    let templateId = "template_yejxn3e"
    let publicId= "nJuhyyhJhkM9n5dSe"
    
    emailjs.send(serviceId, templateId, templateParams,  publicId)
    
    .then(function(response){
        
        console.log("Success", response.status, response.text)
    }, function(error){
        console.log("Failed", error)
        
    })


  return (
    <div className='container'>
         
        
         {ConfirmaciónMail}
         
        
           
           
        
        
        </div>
  )
}

export default ConfirmaciónMail