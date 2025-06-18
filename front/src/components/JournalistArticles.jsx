import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByJournalist } from "../services/api";

export default function JournalistArticles() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getArticlesByJournalist(id);
      setArticles(data);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Articles by this journalist</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h4>{article.title}</h4>
            <p>{article.content}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
