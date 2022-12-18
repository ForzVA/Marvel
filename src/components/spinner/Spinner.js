import spinnerGif from "../../resources/Spinner-2.gif";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinnerGif} alt="" />
    </div>
  );
};

export default Spinner;
