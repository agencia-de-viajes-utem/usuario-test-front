import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de instalar y importar Bootstrap
import './RegisterForm.css'; // Tu archivo de estilos adicionales

const RegisterForm = ({ onRegister }) => {
  const [userDetails, setUserDetails] = useState({
    Nombre: '',
    Apellido: '',
    SegundoApellido: '',
    Email: '',
    RUT: '',
    Fono: '',
    password: '',
    confirmPassword: '',
    Rol:  import.meta.env.VITE_USER_ROLE
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      console.error('Las contraseñas no coinciden.');
      return;
    }
    onRegister(userDetails);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="register-form">
            <h2>REGISTRO</h2>
            <p>Por favor ingrese sus datos.</p>
            <Form.Group className="mb-3" controlId="formBasicNames">
              <Form.Control
                type="text"
                placeholder="Nombres"
                name="Nombre"
                value={userDetails.Nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formBasicSurname1">
                <Form.Control
                  type="text"
                  placeholder="Apellido Paterno"
                  name="Apellido"
                  value={userDetails.Apellido}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formBasicSurname2">
                <Form.Control
                  type="text"
                  placeholder="Apellido Materno"
                  name="SegundoApellido"
                  value={userDetails.SegundoApellido}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicRUT">
              <Form.Control
                type="text"
                placeholder="RUT"
                name="RUT"
                value={userDetails.RUT}
                onChange={handleChange}
              />
            </Form.Group>
       
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Correo Electrónico"
                name="Email"
                value={userDetails.Email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Control
                type="tel"
                placeholder="Número de Teléfono"
                name="Fono"
                value={userDetails.Fono}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirmar Contraseña"
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Continuar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
