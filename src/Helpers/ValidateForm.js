export function validateEmail(value) {
    let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
 
    return validRegex.test(value);
 }
 
 export function validateTlf(value) {
    let regex = /[0123456789]{10}/;
 
    return regex.test(value);
 }