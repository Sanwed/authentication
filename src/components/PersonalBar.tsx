import {User} from "./Social.tsx";
import {IUser} from "../interfaces/interfaces.ts";

interface PersonalBarProps {
  user: IUser;
  onClick: () => void;
  className?: string;
}

function PersonalBar({user, onClick, className = ''}: PersonalBarProps) {
  return (
    <div className={`${className} personal-bar`}>
      <p className="personal-bar__text">Hello, {user.name}</p>
      <img className="personal-bar__image" src={user.avatar} alt={user.name} width="40" height="40"/>
      <button onClick={onClick} className="button personal-bar__button">Logout</button>
    </div>
  )
}

export default PersonalBar;