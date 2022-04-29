import HomeSectionAdmin from "../../Components/HomeSectionAdmin/HomeSectionAdmin"
import SidebarAdmin from "../../Components/SidebarAdmin/SidebarAdmin"
import TopNavbarAdmin from "../../Components/TopNavbarAdmin/TopNavbarAdmin"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  return (
    <>
    <div className="container-fluid">
        {/* <TopNavbarAdmin/> */}
        <div className="row">
          <div className="col-auto col-md-2 col-xl-2 px-0 ">
          <SidebarAdmin/> 
          </div>
          <div className="col-10">
          <HomeSectionAdmin/>
          </div>
       
        </div>
      </div>
      </>
  )
}

export default Dashboard