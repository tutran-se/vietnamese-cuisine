import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="container">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
      <style jsx>
        {`
          .container {
            max-width: 960px;
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
