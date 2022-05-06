import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getProductById } from '../../Actions/products'
import styles from './Orders.module.css'

export default function HistoryOrders ({fecha, productos, total, status}) {
    const dispatch = useDispatch()
    const product = useSelector((state) => state.productsReducer.detailProduct);
     React.useEffect(()=> {
         dispatch(getAllProducts())
     }, [])
     const allProducts = useSelector(state => state.productsReducer.products)
     let filteredProducts = []
     
     for(let i=0; i<productos.length; i++){
         for(let j=0; j<allProducts.length; j++){
             if(productos[i].producto === allProducts[j].title){
                 filteredProducts.push(allProducts[j])
                 
             }
         }
     }



    return (
        <div style={{textAlign: '-webkit-center'}}>
          {
              console.log('filtrado: ', filteredProducts)
          } 
            <div className={styles.container}>
                <div className={styles.header}>
                    <p><b>Fecha: </b></p>
                    <p><b>{fecha.slice(0,10)}</b></p>
                    </div>


                    
                    <div className={styles.wrapper}>
                         <div className={styles.status}>
                             {
                                 status === 'PENDIENTE' ? <p style={{color: 'red'}}>{status}</p> : <p>Estado: {status}</p>
                             }
                    
                </div>
                   
                       {/* <div>{
                           productos && productos.map(i => <p>{i.cantidad}</p>) 
                           }
                       </div> */}
                       
                  
                    {
                    filteredProducts && filteredProducts.map((e,i)=> (
                        
                           <div className={styles.products}>
                               <div className={styles.titleButton}>
                                   <p><b>{e.title} </b></p>
                                <button style={{font: '-webkit-small-control' ,marginBottom:'1rem', fontSize: 'xx-small'}} className='btn btn-outline-dark' >review</button>
                                </div> 
                                
                                <img src={e.images[0]} alt="img" style={{width: '50px' }} />
                                <p>cantidad: ({productos[i].cantidad})</p>
                                   
                           
                              
                       
                               
                      
                         </div>
                        
                                ))
                } 

                
                <div className={styles.total}>
                    <p>Total: <b>${total}</b></p>
                </div> 
                    </div>
              
                                
                
                                
                              
                
                    
                                
                        

            </div>
        </div>
    )
}