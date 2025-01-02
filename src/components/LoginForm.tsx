import {ChangeEvent, FormEvent} from "react";

interface LoginFormProps {
  formData: { username: string, password: string };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

function LoginForm({onChange, onSubmit, formData, className = ''}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className={`${className} login-form`}>
      <input onChange={onChange} className="login-form__input" type="text" value={formData.username} name="username"
             placeholder="Username" required/>
      <input onChange={onChange} className="login-form__input" type="password" value={formData.password} name="password"
             placeholder="Password" required/>
      <button type="submit" className="button login-form__submit">Login</button>
    </form>
  )
}

export default LoginForm;