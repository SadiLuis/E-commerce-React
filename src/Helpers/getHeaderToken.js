export default function getHeaderToken() {
    if (localStorage.token_ecommerce) {
       return {
          headers: {
             "x-auth-token": localStorage.token_ecommerce
          }
       };
    }
 }