import { mobile } from "../../Helpers/responsive";
import styled from 'styled-components'
export const Container = styled.div `
 width: 85%;
 align-items:center;
 margin:auto;
 margin-top: -60px
 object-fit: cover;
 object-fit: contain;
`
export const Wrapper = styled.div`
padding:3px;
font-family: sans-serif;


${mobile({ padding: "5px" })};
`
export const Title = styled.div`
font-weight:200;
font-size:15px;
text-align:center;`

export const Top = styled.h1`
display:flex;
align-items:center;
justify-content: space-between;
position: relative;
top: -50px
`
export const TopButton = styled.button`
  padding: 5px;
  width:10%;
  font-size:40%;
  cursor: pointer;
 
  
`;

export const Button = styled.div`
display:flex;
justify-content:space-between;;
${mobile({ flexDirection: "column" })}
`
export const Info= styled.div`
flex:3;
margin-top: -150px

`

export const Product = styled.div`
display:flex;
justify-content:space-between;
height: 180px;
width:90%;
box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);
 border-radius: 10px;
 background-color: white;
${mobile({ flexDirection: "column" })}
`

export const ProductDetail = styled.div`
flex: 2;
  display: flex;
  justify-content:space-around;
  position:relative
`
export const Image = styled.img`
width:25%;
height:180px;
align-self:center;
margin-bottom: -25px
`

export const Details = styled.div`
display:flex;
flex-direction:column;

position: relative;
top: -10px


`

export const ProductName = styled.span`
 
`

export const ProductId = styled.span``

export const ProductSize = styled.span``


export const PriceDetail = styled.div`
flex:1;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

`
export const ProductAmountContainer = styled.div`
display:flex;
align-items:center;
margin-bottom:-120px;

`
export const ProductAmount = styled.div`
font-size:24px;
display: flex;
border: 5px solid black
font-family: sans-serif;

${mobile({ margin: "5px 15px" })};
`
export const ProductPrice = styled.div`
font-size:30px;
font-family: sans-serif;

${mobile({ marginBottom: "20px" })};
`
export const Summary= styled.div`
flex:1;
border: 0.5px solid lightgray;
padding:20px;
height:70vh;
margin-left:-80px;
margin-top:-120px;

`
export const SummaryTitle= styled.h1`
font-weight:200;
font-family: sans-serif;
font-size:30px
`

export const SummaryItem= styled.div`
margin:5px 0px;
display:flex;
justify-content:space-between;
font-weight:${props=>props.type ==='total' && '500'};
font-size:${props=>props.type ==='total' && '24px'};
font-family: sans-serif`

export const SummaryItemText= styled.span``



export const SummaryButton= styled.button`
width: 100%;
padding: 10px;
font-weight: 600;
cursor:pointer;
`

export const TopTexts= styled.div`
${mobile({ display: "none" })};
`
export const TopText = styled.span `
text-decoration:undefined;
cursor:pointer;
margin: 0px 10px;
font-family: sans-serif;
`