import Head from 'next/head';
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({children}:any) {
    return(
        <div className="layout">
            <Head>
                <title>Store</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className="main-container">
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default Layout;