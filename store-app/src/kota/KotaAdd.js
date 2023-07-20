import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const KotaAdd = () => {
  const [formData, setFormData] = useState({
    nama: '',
    kodePos: '',
    provinsi: '',
  });

  const [formErrors, setFormErrors] = useState({
    nama: 'Nama must be filled',
    kodePos: 'Kode pos must be filled',
    provinsi: 'Provinsi must be filled',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIsSubmitted(false);
    if (name === 'kodePos') {
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
      case 'nama':
        errors.nama = value.trim() === '' ? 'Nama must be filled' : '';
        break;
      case 'kodePos':
        if (value.trim() === '') {
          errors.kodePos = 'Kode pos must be filled';
        } else {
          try {
            const response = await axios.get(`http://localhost:8080/kota/checkUnique?kodePos=${encodeURIComponent(value)}`);
    
            if (response.data.data[0]) {
              errors.kodePos = 'Kode pos is already exist';
            } else {
              errors.kodePos = '';
            }
          } catch (error) {
            console.error('Error checking kode pos uniqueness:', error);
          }
        }
        break;
      case 'provinsi':
        errors.provinsi = value.trim() === '' ? 'Provinsi must be filled' : '';
        break;
      default:
        break;
    }
  
    setFormErrors(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isFormValid){
      try {
        const response = await axios.post('http://localhost:8080/kota/add', formData);
        console.log(response.data);
        setIsSubmitted(true);
        setFormData({
          nama: '',
          kodePos: '',
          provinsi: '',
        })
        setFormErrors({
          nama: 'Nama must be filled',
          kodePos: 'Kode pos must be filled',
          provinsi: 'Provinsi must be filled',
        });
      } catch (error) {
        console.error('Error while adding kota:', error);
      }
    }
  };

  const isFormValid = Object.values(formErrors).every((error) => error === '');

  return (
    <Container>
      <Row className="justify-content-center mb-2">
        <Col xs="auto">
          <h2>Add Kota</h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label><h5>Nama</h5></Form.Label>
          <Form.Control
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            maxLength={50}
            isInvalid={formErrors.nama !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.nama}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label><h5>Kode pos</h5></Form.Label>
          <Form.Control
            type="text"
            name="kodePos"
            value={formData.kodePos}
            onChange={handleChange}
            isInvalid={formErrors.kodePos !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.kodePos}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label><h5>Provinsi</h5></Form.Label>
          <Form.Control
            type="text"
            name="provinsi"
            value={formData.provinsi}
            onChange={handleChange}
            isInvalid={formErrors.provinsi !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.provinsi}</Form.Control.Feedback>
        </Form.Group>
        <div className="mt-3">
          {isSubmitted && (
            <Row className="justify-content-center">
              <Col xs="auto">
                <p style={{ color: 'green' }}>New Kota successfully added,{' '}
                  <Link to="/kota" style={{ textDecoration: 'underline' }}>
                    return to Kota page
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

export default KotaAdd;
