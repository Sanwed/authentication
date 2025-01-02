import {ReactNode} from "react";

interface SocialHeaderProps {
  children: ReactNode
  className?: string
}

function SocialHeader({children, className = ''}: SocialHeaderProps) {
  return (
    <header className={`${className} header-social`}>
      <p className="header-social__title">Neto Social</p>
      {children}
    </header>
  )
}

export default SocialHeader;