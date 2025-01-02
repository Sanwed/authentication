import {INews} from "../interfaces/interfaces.ts";

interface NewsProps {
  news: INews[];
  className?: string;
}

function News({news, className = ''}: NewsProps) {
  return (
    <div className={`${className} news`}>
      {news && news.map((newsItem) => (
        <div key={newsItem.id} className="news__item">
          <img src={newsItem.image} alt={newsItem.title} width="640" height="480"/>
          <h3 className="news__title">{newsItem.title}</h3>
          <p className="news__description">{newsItem.content}</p>
        </div>
      ))}
    </div>
  )
}

export default News;