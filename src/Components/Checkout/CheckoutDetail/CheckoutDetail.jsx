import React from "react";
import { Card } from "react-bootstrap";
import style from "../Checkout.module.css";
import CheckoutList from "./CheckoutList";


const Details = () => {

  return (
    <div>
      
      <Card className={style.card}>
        <div className={style.headers}>
          <Card.Header className={style.title}>
            3 - Detalle de tu Compra
          </Card.Header>
        </div>
        <CheckoutList />
        
      </Card>
    </div>
  );
};
export default Details;