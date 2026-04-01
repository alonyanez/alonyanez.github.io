// src/components/Button.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import './button.css'

interface ButtonProps {
  link?: string
  icon?: React.ReactNode
  label?: string
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'disabled' | 'icon' | 'transparent'
  size?: number // Agrega propiedad para tamaño
  external?: boolean // Nueva propiedad para enlaces externos
  onClick?: () => void | Promise<void>
  style?: React.CSSProperties
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  link,
  icon,
  label,
  children,
  variant = 'primary',
  size = 24, // Valor por defecto
  external = false, // Valor por defecto
  onClick,
  style,
  type = 'button',
}) => {
  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const content = (
    <>
      {icon &&
        React.cloneElement(icon as React.ReactElement<any>, {
          width: size,
          height: size,
        })}
      {label && <span className='label'>{label}</span>}
      {children}
    </>
  )

  // CASO 1: Es un enlace externo (<a>)
  if (external && link) {
    return (
      <a
        href={link}
        className={`button ${variant}`}
        onMouseDown={handleMouseDown}
        onClick={onClick}
        rel='noopener noreferrer'
        target='_blank'
        style={style}
      >
        {content}
      </a>
    )
  }

  // CASO 2: Es un enlace interno (Link)
  if (link) {
    return (
      <Link
        to={link}
        className={`button ${variant}`}
        onMouseDown={handleMouseDown}
        onClick={onClick}
        style={style}
      >
        {content}
      </Link>
    )
  }
  
  // CASO 3: Es un botón normal
  return (
    <button
      type={type}
      className={`button ${variant}`}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      style={style}
    >
      {content}
    </button>
  )
}

export default Button
