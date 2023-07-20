import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate, NavLink, useLocation } from 'react-router-dom';
import AllSalesPage from './sales/AllSalesPage';
import AllKotaPage from './kota/AllKotaPage';
import AllPenjualanPage from './penjualan/AllPenjualanPage';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SalesDetail from './sales/SalesDetail';
import PenjualanDetail from './penjualan/PenjualanDetail';
import KotaDetail from './kota/KotaDetail';
import PenjualanAdd from './penjualan/PenjualanAdd';
import SalesAdd from './sales/SalesAdd';
import KotaAdd from './kota/KotaAdd';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/penjualan');
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <AppContent />
      </div>
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/"><h3>Store App</h3> </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                as={NavLink}
                to="/penjualan"
                style={{
                  textDecoration: location.pathname.startsWith('/penjualan') ? 'underline' : 'none',
                  fontWeight: location.pathname.startsWith('/penjualan') ? 'bold' : 'normal',
                }}
              >
                Penjualan
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/sales"
                style={{
                  textDecoration: location.pathname.startsWith('/sales') ? 'underline' : 'none',
                  fontWeight: location.pathname.startsWith('/sales') ? 'bold' : 'normal',
                }}
              >
                Sales
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/kota"
                style={{
                  textDecoration: location.pathname.startsWith('/kota') ? 'underline' : 'none',
                  fontWeight: location.pathname.startsWith('/kota') ? 'bold' : 'normal',
                }}
              >
                Kota
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/penjualan" element={<AllPenjualanPage />} />
          <Route path="/penjualan/add" element={<PenjualanAdd />} />
          <Route path="/penjualan/:penjualanId" element={<PenjualanDetail />} />
          <Route path="/sales" element={<AllSalesPage />} />
          <Route path="/sales/add" element={<SalesAdd />} />
          <Route path="/sales/:salesId" element={<SalesDetail />} />
          <Route path="/kota" element={<AllKotaPage />} />
          <Route path="/kota/add" element={<KotaAdd />} />
          <Route path="/kota/:kotaId" element={<KotaDetail />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
