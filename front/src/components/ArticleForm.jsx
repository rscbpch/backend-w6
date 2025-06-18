import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, createArticle, updateArticle } from "../services/api";

export default function ArticleForm({ isEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    journalistid: "",  // <-- changed from journalist
    category: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      fetchArticle(id);
    }
  }, [id, isEdit]);

  const fetchArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const article = await getArticleById(id);
      // Set form data, make sure keys match
      setFormData({
        title: article.title || "",
        content: article.content || "",
        journalistid: article.journalistid || "",
        category: article.category || "",
      });
    } catch (err) {
      setError("Failed to load article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Convert journalistid to number before sending
    const payload = {
      ...formData,
      journalistid: Number(formData.journalistid),
    };

    try {
      if (isEdit) {
        await updateArticle(id, payload);
      } else {
        await createArticle(payload);
      }
      navigate("/articles");
    } catch (err) {
      setError("Failed to submit article.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="article-form" onSubmit={handleSubmit}>
        <h2>{isEdit ? "Edit Article" : "Create Article"}</h2>

        <label>
          Title:
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </label>
        <br />

        <label>
          Content:
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            required
          />
        </label>
        <br />

        <label>
          Journalist ID:
          <input
            name="journalistid"
            value={formData.journalistid}
            onChange={handleChange}
            placeholder="Journalist ID (number)"
            type="number"
            required
          />
        </label>
        <br />

        <label>
          Category:
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
        </label>
        <br />

        <button className="main" type="submit">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </>
  );
}
