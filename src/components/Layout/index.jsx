import Header from "../Header";
import HeaderAuth from "../Header/HeaderAuth";
import { useAuth } from "../../context/AuthContext";
import { useContext } from "react";
import Footer from "../Footer";
import "./Layout.css";
function Layout({ children }) {
    const { isAuthenticated } = useAuth();
    return (
        <>
            {isAuthenticated ? <HeaderAuth /> : <Header />}
            <main className="main">{children}</main>
            <Footer />
        </>
    );
}

export default Layout;