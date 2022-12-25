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
      <ErrorMessage />
      <p>PAGE DOESNT EXIST</p>
      <Link to="/" style={{ color: "black", fontWeight: "bolder" }}>
        Home Page
      </Link>
    </div>
  );
};

export default Page404;
