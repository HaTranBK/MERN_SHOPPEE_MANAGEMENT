import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import MainForm from "./MainForm";
const SignUp = () => {
  return (
    <div className="parentForm py-24 relative">
      <div className="container w-3/4 mx-auto grid grid-cols-4 gap-4 ">
        <div className="signUp_text col-span-2 flex flex-col justify-center items-center">
          <FontAwesomeIcon
            icon={faShoppingBag}
            className="me-3 icon_shoppe text-white"
          />

          <span className="text-7xl  text-semibold me-3 text-white">
            Shoppe
          </span>

          <span className="mt-8 text-center text-2xl text-white">
            Nền tảng thương mại điện tử <br /> yêu thích ở Đông Nam Á & Đài Loan
          </span>
        </div>
        <MainForm />
      </div>
    </div>
  );
};

export default SignUp;
