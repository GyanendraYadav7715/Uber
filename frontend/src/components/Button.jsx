const Button = ({ text, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px] ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
