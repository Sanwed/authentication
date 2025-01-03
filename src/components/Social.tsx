import SocialHeader from "./SocialHeader.tsx";
import LoginForm from "./LoginForm.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import PersonalBar from "./PersonalBar.tsx";
import News from "./News.tsx";
import {INews, IUser} from "../interfaces/interfaces.ts";

interface UserError {
  message: string;
}

interface UserSuccess {
  token: string;
}

function Social() {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string>("");
  const [news, setNews] = useState<INews[]>([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const getNews = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/private/news`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${JSON.parse(token)}`,
        }
      })
      if (!response.ok) {
        setError("Что-то пошло не так")
      }
      const news: INews[] = await response.json();
      setNews(news)
    } catch (error) {
      console.error(error);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setNews([])
  }

  const getUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/private/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${JSON.parse(token)}`,
        }
      });
      if (response.status === 401) {
        logout();
      }
      if (!response.ok) {
        setError('Что-то пошло не так')
        return;
      }
      const user: User = await response.json()
      setUser(user);
      getNews();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.currentTarget.name]: event.currentTarget.value})
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
        method: "POST",
        body: JSON.stringify({
          login: formData.username,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const user: UserError | UserSuccess = await response.json()
      if (response.status === 400) {
        setError(user?.message);
        return;
      }
      if (response.status === 500) {
        setError('Что-то пошло не так');
        return;
      }
      localStorage.setItem("token", JSON.stringify(user?.token));
      getUser()
    } catch (error) {
      console.error(error)
    } finally {
      setFormData({username: "", password: ""})
    }
  }

  return (
    <div className="social">
      <SocialHeader className="social__header">
        {user
          ? (<PersonalBar onClick={logout} user={user} className="social__personal-bar"/>)
          : (<>
            {error}
            <LoginForm className="social__form" formData={formData} onChange={onChange} onSubmit={onSubmit}/>
          </>)
        }
      </SocialHeader>
      <div className="social__content">
        {user
          ? <News news={news} className="social__news"/>
          : <p>Login to see content</p>
        }
      </div>
    </div>
  )
}

export default Social;