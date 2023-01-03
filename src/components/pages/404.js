import { Helmet } from "react-helmet";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "80vh",
        color: "red",
        fontSize: "30px",
      }}
    >
      <Helmet>
        <meta name="description" content="Page not found" />
        <title>Page not found</title>
      </Helmet>
      <ErrorMessage />
      <p>PAGE DOESNT EXIST</p>
      <Link to="/" style={{ color: "black", fontWeight: "bolder" }}>
        Home Page
      </Link>
    </div>
  );
};

export default Page404;
