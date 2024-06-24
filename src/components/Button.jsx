function Button({ children, onClick }) {
  return (
    <button className="option bg-purple text-white" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
