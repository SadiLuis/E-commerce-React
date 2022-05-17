import { validateTlf } from '../../Helpers/ValidateForm'

export function validation(input){
    let errors ={};

    if(!input.name.trim()){
        errors.name ="ingrese el nombre por favor"
    }else if (input.name.length < 4) {
        errors.name = "Mínimo 4 caracteres";
      } else if (input.name.length > 25) {
        errors.name = "Máximo 25 caracteres";
      }
    if(input.address === null){
        errors.address ="ingrese el domicilio por favor"
    }else if(!input.address.trim()){
        errors.address ="ingrese el domicilio por favor"
    } else if (input.address.length < 8) {
        errors.address = "Mínimo 8 caracteres";
      } else if (input.address.length > 40) {
        errors.address = "Máximo 40 caracteres";
      }
    if(input.country === null){
        errors.country ="ingrese el país por favor"
    }else if(!input.country.trim()){
        errors.country ="ingrese el país por favor"
    }
    if(input.province === null){
        errors.province ="ingrese la provincia por favor"
    }else if(!input.province.trim()){
        errors.province ="ingrese la provincia por favor"
    }
    if(input.city === null){
        errors.city ="ingrese la ciudad por favor"
    }else if(!input.city.trim()){
        errors.city ="ingrese la ciudad por favor"
    }
    if(input.phone === null){
        errors.phone ="ingrese un número de teléfono por favor"
    }else  if(!input.phone.trim()){
        errors.phone ="ingrese un número de teléfono por favor"
    }else if (!validateTlf(input.phone)) {
        errors.phone = "ingrese un número de teléfono válido";
      }
   
    return errors;

    
}