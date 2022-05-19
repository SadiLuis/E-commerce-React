import { mobile } from "../../Helpers/responsive";
import styled from 'styled-components'
export const Anuncio = styled.div `
height:30px;
background-color: teal;
color:white;
display:flex;
align-items:center;
justify-content:center;
font-size: 16px;
font-weight:500px;
 
`
export const Wrapper = styled.div`
padding:3px;
margin:auto;
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
top: 50px
`
export const TopButton = styled.button`
  padding: 5px;
  width:10%;
  font-size:40%;
  cursor: pointer;
 
  
`;

export const Button = styled.div`
display:flex;
justify-content:space-between;
${mobile({ flexDirection: "column" })}
`
export const Info= styled.div`
flex:3;
margin-top:100px
`

export const Product = styled.div`
display:flex;
justify-content:space-between;
height: 200px;
width:90%;
box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);
 border-radius: 10px;
 background-color: white;
 margin-bottom:10px;
 
${mobile({ flexDirection: "column" })}
`

export const ProductDetail = styled.div`
flex: 2;
  display: flex;
  justify-content:space-around;
  
  
`
export const Image = styled.img`
width:25%;
height:150px;
align-self:center;
margin-bottom: -5px;

`

export const Details = styled.div`
display:flex;
flex-direction:column;
justify-content:center;

`

export const ProductName = styled.span`
margin: 8px 0px 8px 0px;
font-size:15px;
`

export const ProductId = styled.span`
margin: 8px 0px 8px 0px;

`

export const ProductSize = styled.span`
margin: 8px 0px 8px 0px;
font-size:16px;
`


export const PriceDetail = styled.div  `
flex:1;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
 `

export const ProductAmountContainer = styled.div`
display:flex;
flex-direction:column;
margin: auto;
margin-top:40px;
position: relative;
`
export const ProductAmount = styled.div`
font-size:24px;
display: flex;
margin-top:20px;
${mobile({ margin: "5px 15px" })};
`
export const ProductPrice = styled.div`
font-size:30px;
margin: auto;
padding-top:50px;
${mobile({ marginBottom: "20px" })};
`
export const Summary= styled.div`
flex:1;
border: 0.5px solid lightgray;
padding:20px;
height:60vh;
margin-left:-80px;
margin-top:100px;
`
export const SummaryTitle= styled.h1`
font-weight:200;
font-size:30px
`

export const SummaryItem= styled.div`
margin:25px 0px;
display:flex;
justify-content:space-between;
font-weight:${props=>props.type ==='total' && '500'};
font-size:${props=>props.type ==='total' && '24px'};
`

export const SummaryItemText= styled.span``



export const SummaryButton= styled.button`
width: 100%;
padding: 10px;
font-weight: 600;
cursor:pointer;
margin-top:20px;
`

export const TopTexts= styled.div`
 margin:auto;
${mobile({ display: "none" })};
`
export const TopText = styled.span `
text-decoration:undefined;
cursor:pointer;
margin: 0px 10px;
`

export const ButtonEmpty = styled.button`
  margin: auto;
  font-size: 120px;
  padding: 0;
  
`
export const DeleteBtn = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
`
export const InputCart = styled.input`
height:30px;
width:40px;
text-align:right;
`

export const ProductTotal = styled.div`
font-size:16px;
margin: auto;
position: absolute;
top: 75px;
left: 27px;
`

export const ProductDisabled = styled.button`
display:flex;
justify-content:space-between;
height: 200px;
width:90%;
box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);
 border-radius: 10px;
 background-color:#dee2e6 ;
 margin-bottom:10px;
 color:#adb5bd;
`

export const Container = styled.div`
  padding:10px;
`