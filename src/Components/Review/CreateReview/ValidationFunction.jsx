export const validationFunction = (comment) => {
    let errors = {};
  
  
    if (!comment.rating) errors.rating = "Por favor, puntue el producto con el sistema de estrellas";
  
    if (comment.descripcion.length > 1500) {
      errors.descripcion = "El comentario acepta un máximo de 1500 caracteres";
    }

    if (comment.descripcion.length < 30) {
        errors.descripcion = "El comentario requiere un minimo de 30 caracteres";
      }
  
    
    return errors;
  };