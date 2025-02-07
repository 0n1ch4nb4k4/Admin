import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/header'; 
import Dashboard from './components/dashboard';
import Products from './views/products';
import styled from 'styled-components';
import ReviseProducts from './views/reviseProduct';
import FormAddProduct from './views/FormAddProduct';

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

function App() {
  return (
    <Router>
      <Header />
      <MainContainer>
        <Sidebar />
        <Content>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/reviseProduct/:productId" element={<ReviseProducts />} />
            <Route path="/products/FormAddProduct" element={<FormAddProduct/>} />
          </Routes>
        </Content>
      </MainContainer>
    </Router>
  );
}

export default App;
