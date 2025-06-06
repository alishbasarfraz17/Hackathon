
function Button({
  children,

  bgColor = "bg-blue-600",
  textColor,
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
