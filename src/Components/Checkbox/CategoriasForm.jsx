import React, { useId } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { filterByCategory } from '../../Actions/products';

function CategoriasForm({setFlag , categorias , setPage}) {
    const dispatch = useDispatch()
    const idMap = useId()  
    function handleCheck(e){
        for (let i = 0; i <= categorias?.length; i++){
            document.getElementById(i).checked = false;
            setFlag(false)
        }
        document.getElementById(e.target.id).checked = true;
        setFlag(true)
        setPage(1)
        dispatch(filterByCategory(e.target.value))
    }
  return (
      <div>
          <h4><b> Categoría</b></h4>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="all" id="0"onClick={(e) => handleCheck(e)}/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Todas
            </label>
          </div>
          {
          categorias?.map((cat,idMap) => 
          <div key={`div-${idMap}`} className="form-check">
            <input key={`input-${idMap}`} className="form-check-input" type="checkbox" value={cat.nombre} id={cat.id} onClick={(e) => handleCheck(e)}/>
            <label key={`label-${idMap}`} className="form-check-label" htmlFor="flexCheckDefault">
                {cat.nombre}
            </label>
          
          </div>)
          }
       

  </div>
  
    )
  }
export default CategoriasForm

