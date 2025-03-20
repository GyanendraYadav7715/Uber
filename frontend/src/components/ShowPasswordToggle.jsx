import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const ShowPasswordToggle = ({ showPassword, toggle }) => (
  <button
    type="button"
    onClick={toggle}
    className="absolute inset-y-0 right-3 flex items-center text-gray-600"
  >
    {showPassword ? (
      <FaRegEye className="h-5 w-5" />
    ) : (
      <FaRegEyeSlash className="h-5 w-5" />
    )}
  </button>
);

export default ShowPasswordToggle;