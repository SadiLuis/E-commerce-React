import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {getProductById} from "../../Actions/products.js"

export default function Detail() {
  
  const { idProduct } = useParams();
  const dispatch = useDispatch()
  const product = useSelector((state) => state.productsReducer.detailProduct);

  

  useEffect(() => {
    dispatch(getProductById(idProduct))
  }, [idProduct])
  
  return (
    <div>Details</div>
  )
}
