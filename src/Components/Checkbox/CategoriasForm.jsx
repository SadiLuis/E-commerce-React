import React from 'react'
import { useDispatch } from 'react-redux';
import { filterByCategory } from '../../Actions/products';

function CategoriasForm() {
    const dispatch = useDispatch()

    function handleCheck(e){
        for (let i = 0; i <= 5; i++){
            document.getElementById(i).checked = false;
        }
        document.getElementById(e.target.id).checked = true;

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
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Sillas" id="1" onClick={(e) => handleCheck(e)}/>
            <label class="form-check-label" for="flexCheckDefault">
                Sillas
            </label>
          </div>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="Sillones" id="2" onClick={(e) => handleCheck(e)} />
        <label class="form-check-label" for="flexCheckChecked">
            Sillones
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="Mesas" id="3" onClick={(e) => handleCheck(e)} />
        <label class="form-check-label" for="flexCheckChecked">
            Mesas
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="Iluminacion" id="4" onClick={(e) => handleCheck(e)} />
        <label class="form-check-label" for="flexCheckChecked">
            Iluminación
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="Exterior" id="5" onClick={(e) => handleCheck(e)} />
        <label class="form-check-label" for="flexCheckChecked">
            Exterior
        </label>
        </div>
        

  </div>
  
    )
  }
export default CategoriasForm

