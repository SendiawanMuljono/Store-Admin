import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SalesAdd = () => {
  const [formData, setFormData] = useState({
    nama: '',
    grup: '',
    email: '',
    telepon: '',
  });

  const [formErrors, setFormErrors] = useState({
    nama: 'Nama must be filled',
    grup: 'Grup must be filled',
    email: 'Email must be filled',
    telepon: 'Telepon must be filled',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIsSubmitted(false);
    if (name === 'grup' || name === 'telepon') {
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
      case 'grup':
        errors.grup = value.trim() === '' ? 'Grup must be filled' : '';
        break;
      case 'email':
        if (value.trim() === '') {
          errors.email = 'Email must be filled';
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          errors.email = 'Invalid email format';
        } else {
          try {
            const response = await axios.get(`http://localhost:8080/sales/checkUnique?email=${encodeURIComponent(value)}`);
  
            if (response.data.data[0]) {
              errors.email = 'Email is already exist';
            } else {
              errors.email = '';
            }
          } catch (error) {
            console.error('Error checking email uniqueness:', error);
          }
        }
        break;
      case 'telepon':
        if (value.trim() === '') {
          errors.telepon = 'Telepon must be filled';
        } else if (/\D/.test(value)) {
          errors.telepon = 'Telepon must be numeric';
        } else {
          try {
            const response = await axios.get(`http://localhost:8080/sales/checkUnique?telepon=${encodeURIComponent(value)}`);
            console.log(response);
  
            if (response.data.data[0]) {
              errors.telepon = 'Telepon is already exist';
            } else {
              errors.telepon = '';
            }
          } catch (error) {
            console.error('Error checking telepon uniqueness:', error);
          }
        }
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
        const response = await axios.post('http://localhost:8080/sales/add', formData);
        console.log(response.data);
        setIsSubmitted(true);
        setFormData({
          nama: '',
          grup: '',
          email: '',
          telepon: '',
        })
        setFormErrors({
          nama: 'Nama must be filled',
          grup: 'Grup must be filled',
          email: 'Email must be filled',
          telepon: 'Telepon must be filled',
        });
      } catch (error) {
        console.error('Error while adding sales:', error);
      }
    }
  };

  const isFormValid = Object.values(formErrors).every((error) => error === '');

  return (
    <Container>
      <Row className="justify-content-center mb-2">
        <Col xs="auto">
          <h2>Add Sales</h2>
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
            maxLength={100}
            isInvalid={formErrors.nama !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.nama}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label><h5>Grup</h5></Form.Label>
          <Form.Control
            type="text"
            name="grup"
            value={formData.grup}
            onChange={handleChange}
            isInvalid={formErrors.grup !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.grup}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label><h5>Email</h5></Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={formErrors.email !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label><h5>Telepon</h5></Form.Label>
          <Form.Control
            type="text"
            name="telepon"
            value={formData.telepon}
            onChange={handleChange}
            isInvalid={formErrors.telepon !== ''}
          />
          <Form.Control.Feedback type="invalid">{formErrors.telepon}</Form.Control.Feedback>
        </Form.Group>
        <div className="mt-3">
          {isSubmitted && (
            <Row className="justify-content-center">
              <Col xs="auto">
                <p style={{ color: 'green' }}>New Sales successfully added,{' '}
                  <Link to="/sales" style={{ textDecoration: 'underline' }}>
                    return to Sales page
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

export default SalesAdd;
