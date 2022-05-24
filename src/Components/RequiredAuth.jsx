import { useLocation, Navigate ,useSearchParams} from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
 const userDetail = useSelector((state) => state.loginReducer.userDetail);
 const pedido =useSelector((state) => state.ordersReducer.orderDetail)
 const [searchParams] = useSearchParams();
 const auth = searchParams.get('auth')

let location = useLocation();
console.log(location)
  if (userDetail && location.pathname === '/chat') {
    return children;
  }else if(userDetail?.rol === '2' && location.pathname.includes('dashboard')){
    return children
  }else if(userDetail?.rol === '1' && location.pathname === '/pedido' && pedido){
    return children
  }else if( location.pathname.includes('resetpassword') && auth.length){
    return children
  }else if( location.pathname.includes('pago') && location.search.includes('collection_status')){
    return children
  }else if(userDetail?.rol === '1' && location.pathname !== '/pedido' && !location.pathname.includes('dashboard') ){
    return children
  }
  
  else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}