import React from 'react'
import emailjs from '@emailjs/browser'

function MailEntregado(props) {
    let templateParams={
        nombre:props.nombre,
        email:props.email,
        pedidoId:props.pedidoId,
        direccion:props.direccion,
        ciudad:props.ciudad,
        provincia:props.provincia
    }
    console.log(templateParams)

    let serviceId = "service_c72nnat"
    let templateId = "template_7145t9f"
    let publicId=  "nJuhyyhJhkM9n5dSe"
    emailjs.send(serviceId, templateId, templateParams, publicId)
    .then(function(response){
        
        console.log("Success", response.status, response.text)
    }, function(error){
        console.log("Failed", error)
        
    })

  return (
    <div>
       {MailEntregado}
       <h5>Mail Entregado</h5>
    </div>
  )
}

export default MailEntregado