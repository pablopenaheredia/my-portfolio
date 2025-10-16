import React from 'react'

const Button = ({ children, variant = 'outline', type = 'button', ...props }) => {
  const base = "px-8 py-3 rounded-sm text-sm tracking-wider uppercase transition-all duration-300"
  const variants = {
    outline: "border border-[#e8e6ef]/20 hover:border-[#e8e6ef]/60 hover:bg-[#e8e6ef]/5 text-[#e8e6ef]",
    ghost: "text-[#e8e6ef]/60 hover:text-[#e8e6ef]",
  }

  return (
    <button type={type} className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  )
}

export default Button
