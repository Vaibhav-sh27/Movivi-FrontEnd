import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
      <div className="wrapper">
        <Sidebar />
        <main className="content" style={{marginLeft:"15vw", marginTop:'35px'}}>{children}</main>
      </div>
    );
  }
  export default Layout