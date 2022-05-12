import React,{useState} from "react";
import styles from './RecoverPassword.module.css'
import { recoveryPassword } from "../../Actions/Auth";
import { useDispatch } from "react-redux";

 const ResPassword = ()=>{
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email:'example@example.com'
    })
    let expRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let Result = expRegular.test(state.email)
    


     const handleChange = (e)=>{
         setState({
             email:e.target.value
            })
            
            console.log('esto es result',Result)
            
        }
        
        const handleSubmit = async(e)=>{
            e.preventDefault()
            if(state.email === '' || state.email === 'example@example.com'){
             alert('Debes incluir un correo valido')
            }
            dispatch(recoveryPassword(state.email))

       

     }


           let err = styles.none
           let errInp = styles.inputText
           if(Result){
            err = styles.none
            errInp = styles.inputText
           }else{
            err = styles.errorPass
            errInp = styles.errorInp
           }
           
           
           return(
               <main className={styles.mainPass}>
           <div className={styles.containPass}>
            <form onSubmit={handleSubmit} className={styles.formPass}>

              <label className={styles.namePass} >Ingresa tu correo</label>
              <input className={errInp} type='text' onChange={handleChange} icon={'f'}/>
              <p className={err}>Introduce un correo valido</p>
              
              <input className={styles.btnPass} type='submit' value='Recuperar'/>

            </form>
           </div>
        </main>
    )
}

export default ResPassword