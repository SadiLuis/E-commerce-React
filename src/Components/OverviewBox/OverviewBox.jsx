import React from 'react'

const OverviewBox = () => {
  return (
    <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card bg-primary mb-3 text-white h-100">
              <div className="card-body py-5">
                Pedidos Totales
               
              </div>
              <div class="card-footer d-flex">
                Ver Detalles
                <span class="ms-auto">
                  <i class="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          
          {/* <div class="col-md-3 mb-3">
            <div class="card bg-warning text-dark h-100">
              <div class="card-body py-5">Warning Card</div>
              <div class="card-footer d-flex">
                Ver detalles
                <span class="ms-auto">
                  <i class="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div> */}
          <div class="col-md-3 mb-3">
            <div class="card bg-success text-white h-100">
              <div class="card-body py-5">Total ventas</div>
              <div class="card-footer d-flex">
                Ver detalles
                <span class="ms-auto">
                  <i class="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          {/* <div class="col-md-3 mb-3">
            <div class="card bg-danger text-white h-100">
              <div class="card-body py-5">Danger Card</div>
              <div class="card-footer d-flex">
                View Details
                <span class="ms-auto">
                  <i class="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div> */}
        </div>
  )
}

export default OverviewBox