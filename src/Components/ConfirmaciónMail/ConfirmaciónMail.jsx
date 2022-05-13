import React from 'react'
import emailjs from '@emailjs/browser'



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
    
    
    let serviceId = "service_c72nnat" ///service_tvv7y5s
    let templateId = "template_yejxn3e"///template_k8gp9g2
    let publicId= "nJuhyyhJhkM9n5dSe" ///hNfwKD0TvV8ixub8f
    
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