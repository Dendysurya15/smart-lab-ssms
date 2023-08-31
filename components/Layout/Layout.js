// components/Layout.js
import React from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default Layout;
