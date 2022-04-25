import React from 'react'
import './Card.module.css'
import {Link} from 'react-router-dom'
import styles from './Card.module.css'

export default function Card({img, title,category, price, id, onClick}){
    return (
    
    <div className={styles.card} style={{"maxWidth": "35%"}}>
        <Link to={`/detail/${id}`}>
        <img className="card-img-top" src={img}></img>
        </Link>
        
        <div className= "card-body"></div>
        <Link to={`/detail/${id}`}>
        <h3 className="card-title">{title}</h3>
        </Link>
        <p className="card-text"> category: {category}</p>
        <p><b>${price}</b></p>
        <button onClick={()=>onClick()} className='btn btn-outline-dark'>Agregar al carrito</button>
    </div>
    )
}