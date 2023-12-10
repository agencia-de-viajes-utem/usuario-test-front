import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import './LoginForm.css'; // Asegúrate de que esta ruta es correcta

const LoginForm = ({ onLogin, onLoginBtn, onChange, onViewRegister, onForgot, email, password }) => {
    return (
        <div className="container-form mt-4 mx-4 w-100">
            <Form className="login-form" onSubmit={(e) => onLogin(e)}>
                <h2 className="text-center mb-4 h1">BIENVENIDO</h2>
                <p className="text-center mb-4">Por favor ingrese sus datos.</p>
                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Introduce tu correo electrónico"
                        className="login-input"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className='fw-bold'>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="*********"
                        className="login-input"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="login-button mb-3">
                    Iniciar sesión
                </Button>
                <div className="d-flex justify-content-center gap-2">
                    <Button variant="outline-primary" className="btn-social" onClick={() => onLoginBtn('google')}>
                        <BsGoogle />
                    </Button>
                    <Button variant="outline-primary" className="btn-social" onClick={() => onLoginBtn('facebook')}>
                        <BsFacebook />
                    </Button>
                </div>
                <Form.Group className="d-flex flex-column justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-2 mb-2 flex-row">
                        <span className='my-auto'>¿No tienes una cuenta?</span>
                        <Button variant="link" className="link-tisw" onClick={onViewRegister}>¡Registrate!</Button>
                    </div>
                    <Button variant="link" className="link-tisw" onClick={onForgot}>¿Olvidaste tu contraseña?</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default LoginForm;
