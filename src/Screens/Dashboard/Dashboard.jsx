import HomeSectionAdmin from "../../Components/HomeSectionAdmin/HomeSectionAdmin"
import SidebarAdmin from "../../Components/SidebarAdmin/SidebarAdmin"
import TopNavbarAdmin from "../../Components/TopNavbarAdmin/TopNavbarAdmin"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  return (
    <>
    <div className="container-fluid">
    <div className="row flex-nowrap">
        {/* <TopNavbarAdmin/> */}
        <SidebarAdmin/>  
        <HomeSectionAdmin/>
      </div>
      </div>
      </>
  )
}

export default Dashboard