import React from 'react'
import OverviewBox from '../OverviewBox/OverviewBox'
import TableProducts from '../TableProducts/TableProducts'
import styles from './HomeSectionAdmin.module.css'

const HomeSectionAdmin = () => {
  return (
    <div className='mt-1'>
      <OverviewBox/>
      <TableProducts/>
    </div>
    
   
  )
}

export default HomeSectionAdmin