import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <>
            <Header></Header>
            <main>{props.children}</main>
            <Footer></Footer>
        </>
    );
};

export default Layout;