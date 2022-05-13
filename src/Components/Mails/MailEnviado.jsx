import React from 'react'
import emailjs from '@emailjs/browser'

function MailEnviado(props) {
    let templateParams={
        nombre:props.nombre,
         email:props.email,
        cantidad:props.cantidad,
         producto:props.producto,
          total:props.total,
        pedidoId:props.pedidoId,
        direccion:props.direccion,
        ciudad:props.ciudad,
        provincia:props.provincia
    }
    console.log(templateParams)

    let serviceId = "service_tvv7y5s"
    let templateId = "template_6vopnkb"
    let publicId=  "hNfwKD0TvV8ixub8f"
    emailjs.send(serviceId, templateId, templateParams, publicId)
    .then(function(response){
        
        console.log("Success", response.status, response.text)
    }, function(error){
        console.log("Failed", error)
        
    })

  return (
    <div>
       {MailEnviado}
       <h5>Mail Enviado</h5>
    </div>
  )
}

export default MailEnviado