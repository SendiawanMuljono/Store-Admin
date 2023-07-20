import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AllPenjualanPage = () => {
  const [penjualanData, setPenjualanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/penjualan/all?page=${currentPage - 1}`);
      setPenjualanData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching penjualan data:', error);
    }
  };

  const totalPages = penjualanData.totalPages;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate('/penjualan/add');
  };

  const handleRowClick = (penjualanId) => {
    navigate(`/penjualan/${penjualanId}`);
  };

  return (
    <Container>
      <Row className="justify-content-end mb-2">
        <Col xs="auto">
            <Button variant="primary" style={{fontWeight: 'bold', width: '150px'}} onClick={handleAddButtonClick}>Add Penjualan</Button>
        </Col>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          <table className="table table-striped table-hover">
            <colgroup>
              <col style={{ width: '20%' }} /> {/* Sales column */}
              <col style={{ width: '20%' }} /> {/* Kota column */}
              <col style={{ width: '20%' }} /> {/* Penghasilan column */}
              <col style={{ width: '20%' }} /> {/* Jumlah Barang column */}
              <col style={{ width: '20%' }} /> {/* Tanggal Penjualan column */}
            </colgroup>
            <thead>
              <tr>
                <th>Sales</th>
                <th>Kota</th>
                <th>Penghasilan</th>
                <th>Jumlah Barang</th>
                <th>Tanggal Penjualan</th>
              </tr>
            </thead>
            <tbody>
              {penjualanData.data.map((penjualan) => (
                <tr key={penjualan.id} style={{cursor: 'pointer'}} onClick={() => handleRowClick(penjualan.id)}>
                  <td>{penjualan.sales === null ? '' : penjualan.sales.nama}</td>
                  <td>{penjualan.kota === null ? '' : penjualan.kota.nama}</td>
                  <td>{penjualan.penghasilan}</td>
                  <td>{penjualan.jumlahBarang}</td>
                  <td>{formatDate(penjualan.tanggalPenjualan)}</td>
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

export default AllPenjualanPage;
