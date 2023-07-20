import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllKotaPage = () => {
  const [kotaData, setKotaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/kota/all?page=${currentPage - 1}`);
      setKotaData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching kota data:', error);
    }
  };

  const totalPages = kotaData.totalPages;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate('/kota/add');
  };

  const handleRowClick = (kotaId) => {
    navigate(`/kota/${kotaId}`);
  };

  return (
    <Container>
      <Row className="justify-content-end mb-2">
        <Col xs="auto">
            <Button variant="primary" style={{fontWeight: 'bold', width: '150px'}} onClick={handleAddButtonClick}>Add Kota</Button>
        </Col>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          <table className="table table-striped table-hover">
            <colgroup>
              <col style={{ width: '40%' }} /> {/* Nama column */}
              <col style={{ width: '20%' }} /> {/* Kode Pos column */}
              <col style={{ width: '40%' }} /> {/* Provinsi column */}
            </colgroup>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kode Pos</th>
                <th>Provinsi</th>
              </tr>
            </thead>
            <tbody>
              {kotaData.data.map((kota) => (
                <tr key={kota.id} style={{cursor: 'pointer'}} onClick={() => handleRowClick(kota.id)}>
                  <td>{kota.nama}</td>
                  <td>{kota.kodePos}</td>
                  <td>{kota.provinsi}</td>
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

export default AllKotaPage;
