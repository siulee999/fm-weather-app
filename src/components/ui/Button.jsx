const Button = ({ className, children }) => {
  const classes = `bg-b-500 text-n-0 text-p-5m rounded-xl px-6 py-4 hover:bg-b-700 focus:outline-2 focus:outline-offset-4 focus:outline-b-500 focus:bg-b-500 ${className}`;

  return (
    <button className={classes}>
      {children}
    </button>
  )
}

export default Button