import { FaSignInAlt } from "react-icons/fa";
import { Link } from "wouter";

const LoginButton = () => {
    return (
        <Link href="/login">
            <div className="login">
                <span className="login-button">
                    <FaSignInAlt className="icon" />
                    Ingresar
                </span>
            </div>
        </Link>
    );
};

export default LoginButton;