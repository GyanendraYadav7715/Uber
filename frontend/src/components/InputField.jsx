const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
      placeholder={placeholder}
    />
  );
};

export default InputField;
