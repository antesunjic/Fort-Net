import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="body">
      <Header />
      <div className="main">{children}</div>
      <Footer className="footer" />
    </div>
  );
};

export default Layout;
