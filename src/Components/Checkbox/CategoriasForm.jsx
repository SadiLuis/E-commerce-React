import React from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { filterByCategory } from '../../Actions/products';

function CategoriasForm({setFlag}) {
    const dispatch = useDispatch()
    const categorias = useSelector((state) => state.categoriesReducer.categories)
     console.log(categorias)
    function handleCheck(e){
        for (let i = 0; i <= categorias?.length; i++){
            document.getElementById(i).checked = false;
            setFlag(false)
        }
        document.getElementById(e.target.id).checked = true;
        setFlag(true)
        dispatch(filterByCategory(e.target.value))
    }
  return (
      <div>
          <h4><b> Categoría</b></h4>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="all" id="0"onClick={(e) => handleCheck(e)}/>
            <label class="form-check-label" for="flexCheckDefault">
                Todas
            </label>
          </div>
          {
          categorias?.map(cat => 
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value={cat.nombre} id={cat.id} onClick={(e) => handleCheck(e)}/>
            <label class="form-check-label" for="flexCheckDefault">
                {cat.nombre}
            </label>
          
          </div>)
          }
       

  </div>
  
    )
  }
export default CategoriasForm

