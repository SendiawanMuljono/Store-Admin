import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllSalesPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/sales/all?page=${currentPage - 1}`);
      setSalesData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const totalPages = salesData.totalPages;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate('/sales/add');
  };
  
  const handleRowClick = (salesId) => {
    navigate(`/sales/${salesId}`);
  };

  return (
    <Container>
      <Row className="justify-content-end mb-2">
        <Col xs="auto">
            <Button variant="primary" style={{fontWeight: 'bold', width: '150px'}} onClick={handleAddButtonClick}>Add Sales</Button>
        </Col>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          <table className="table table-striped table-hover">
            <colgroup>
              <col style={{ width: '30%' }} /> {/* Nama column */}
              <col style={{ width: '20%' }} /> {/* Grup column */}
              <col style={{ width: '30%' }} /> {/* Email column */}
              <col style={{ width: '20%' }} /> {/* Telepon column */}
            </colgroup>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Grup</th>
                <th>Email</th>
                <th>Telepon</th>
              </tr>
            </thead>
            <tbody>
              {salesData.data.map((sales) => (
                <tr key={sales.id} style={{cursor: 'pointer'}} onClick={() => handleRowClick(sales.id)}>
                  <td>{sales.nama}</td>
                  <td>{sales.grup}</td>
                  <td>{sales.email}</td>
                  <td>{sales.telepon}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Pagination>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default AllSalesPage;
