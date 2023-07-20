import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PenjualanAdd = () => {
  const [formData, setFormData] = useState({
    salesId: '',
    kotaId: '',
    penghasilan: '',
    jumlahBarang: '',
    tanggalPenjualan: '',
  });

  const [formErrors, setFormErrors] = useState({
    salesId: 'Sales must be chosen',
    kotaId: 'Kota must be chosen',
    penghasilan: 'Penghasilan must be filled',
    jumlahBarang: 'Jumlah barang must be filled',
    tanggalPenjualan: 'Tanggal penjualan must be filled',
  });

  const [salesList, setSalesList] = useState([]);
  
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sales/allWithoutPagination');
        setSalesList(response.data.data);
      } catch (error) {
        console.error('Error fetching Sales data:', error);
      }
    };
    fetchSales();
  }, []);
  
  const [kotaList, setKotaList] = useState([]);
  
  useEffect(() => {
    const fetchKota = async () => {
      try {
        const response = await axios.get('http://localhost:8080/kota/allWithoutPagination');
        setKotaList(response.data.data);
      } catch (error) {
        console.error('Error fetching Kota data:', error);
      }
    };
    fetchKota();
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIsSubmitted(false);
    if (name === 'penghasilan' || name === 'jumlahBarang') {
      const numericValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    validateField(name, value);
  };

  const validateField = async (fieldName, value) => {
    let errors = { ...formErrors };
  
    switch (fieldName) {
      case 'salesId':
        errors.salesId = value.trim() === '' ? 'Sales must be chosen' : '';
        break;
      case 'kotaId':
        errors.kotaId = value.trim() === '' ? 'Kota must be chosen' : '';
        break;
      case 'penghasilan':
        errors.penghasilan = value.trim() === '' ? 'Penghasilan must be filled' : '';
        break;
      case 'jumlahBarang':
        errors.jumlahBarang = value.trim() === '' ? 'Jumlah barang must be filled' : '';
        break;
      case 'tanggalPenjualan':
        errors.tanggalPenjualan = value.trim() === '' ? 'Tanggal penjualan must be filled' : '';
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(isFormValid){
      console.log(formErrors);
      const { salesId, kotaId, penghasilan, jumlahBarang, tanggalPenjualan } = formData;
      
      const payload = {
        sales: { id: salesId },
        kota: { id: kotaId },
        penghasilan,
        jumlahBarang,
        tanggalPenjualan
      };

      try {
        const response = await axios.post('http://localhost:8080/penjualan/add', payload);
        console.log(response.data);
        setIsSubmitted(true);
        setFormData({
          salesId: '',
          kotaId: '',
          penghasilan: '',
          jumlahBarang: '',
          tanggalPenjualan: '',
        })
        setFormErrors({
          salesId: 'Sales must be chosen',
          kotaId: 'Kota must be chosen',
          penghasilan: 'Penghasilan must be filled',
          jumlahBarang: 'Jumlah barang must be filled',
          tanggalPenjualan: 'Tanggal penjualan must be filled',
        });
      } catch (error) {
        console.error('Error while adding penjualan:', error);
      }
    }
  };

  const isFormValid = Object.values(formErrors).every((error) => error === '');

  return (
    <Container>
      <Row className="justify-content-center mb-2">
        <Col xs="auto">
          <h2>Add Penjualan</h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label><h5>Sales</h5></Form.Label>
          <Form.Control
            as="select"
            name="salesId"
            value={formData.salesId}
            onChange={handleChange}
            isInvalid={formErrors.salesId !== ''}
          >
            <option value="" disabled>Select Sales</option>
            {salesList.map((sales) => (
              <option key={sales.id} value={sales.id}>
                {sales.nama} - Grup {sales.grup} - {sales.email}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formErrors.salesId}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label><h5>Kota</h5></Form.Label>
          <Form.Control
            as="select"
            name="kotaId"
            value={formData.kotaId}
            onChange={handleChange}
            isInvalid={formErrors.kotaId !== ''}
          >
            <option value="" disabled>Select Kota</option>
            {kotaList.map((kota) => (
              <option key={kota.id} value={kota.id}>
                {kota.nama} - {kota.kodePos} - {kota.provinsi}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formErrors.kotaId}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label><h5>Penghasilan</h5></Form.Label>
          <Form.Control
            type="text"
            name="penghasilan"
            value={formData.penghasilan}
            onChange={handleChange}
            isInvalid={formErrors.penghasilan !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.penghasilan}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label><h5>Jumlah barang</h5></Form.Label>
          <Form.Control
            type="text"
            name="jumlahBarang"
            value={formData.jumlahBarang}
            onChange={handleChange}
            isInvalid={formErrors.jumlahBarang !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.jumlahBarang}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label><h5>Tanggal penjualan</h5></Form.Label>
          <Form.Control
            type="date"
            name="tanggalPenjualan"
            max="9999-12-31"
            value={formData.tanggalPenjualan}
            onChange={handleChange}
            isInvalid={formErrors.tanggalPenjualan !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.tanggalPenjualan}</Form.Control.Feedback>
        </Form.Group>
        <div className="mt-3">
          {isSubmitted && (
            <Row className="justify-content-center">
              <Col xs="auto">
                <p style={{ color: 'green' }}>New Penjualan successfully added,{' '}
                  <Link to="/penjualan" style={{ textDecoration: 'underline' }}>
                    return to Penjualan page
                  </Link>
                </p>
              </Col>
            </Row>
          )}
          <Row className="justify-content-center">
            <Col xs="auto">
              <Button variant="primary" type="submit" disabled={!isFormValid}>
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Container>
  );
};

export default PenjualanAdd;
