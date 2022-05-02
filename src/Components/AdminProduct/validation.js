export function validation(input){
    let errors ={};

    if(!input.title){
        errors.title ="enter the title please"
    }
    if(!input.price){
        errors.price ="enter the price please"
    }else if(input.price < 0){
        errors.price ="The value cannot be negative"
    }
    if(!input.description){
        errors.description ="enter the description please"
    }
    if(!input.images){
        errors.images ="enter the images please"
    }
    if(!input.cantidad){
        errors.stock ="enter the stock please"
    }else if(input.cantidad < 0){
        errors.price ="The value cannot be negative"
    }
    if(!input.category){
        errors.category ="enter the categories please"
    }
   
    return errors;

    
}