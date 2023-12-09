import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import './LoginForm.css'; // Asegúrate de que esta ruta es correcta

const LoginForm = ({ onLogin, onLoginBtn, onChange, onViewRegister, onForgot, email, password }) => {
    return (
        <Form className="login-form" onSubmit={(e) => onLogin(e)}>
            <h2 className="text-center mb-4">BIENVENIDO</h2>
            <p className="text-center mb-4">Por favor ingrese sus datos.</p>
            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Correo electrónico"
                    className="login-input"
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Contraseña"
                    className="login-input"
                />
            </Form.Group>
            <Form.Group className="d-flex flex-column justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2 mb-2">
                    <span>¿No tienes una cuenta?</span>
                    <Button variant="link" className="link" onClick={onViewRegister}>¡Registrate!</Button>
                </div>
                <Button variant="link" className="link" onClick={onForgot}>¿Olvidaste tu contraseña?</Button>
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
        </Form>
    );
};

export default LoginForm;
