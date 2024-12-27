import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewNews } from "../Features/newsSlice";

const Health = () => {
  const news = useSelector((state) => state.news.news);
  const email = useSelector((state) => state.users.user.email);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const healthNews = news.filter((article) => article.category === "Health");

  useEffect(() => {
    dispatch(viewNews());
    if (!email) {
      navigate("/login");
    }
  }, [email]);
  return (
    <div>
      <h1>Health News</h1>
      {healthNews.map((news) => (
        <div className="article" key={news._id}>
          <img src={news.imageURL} alt={news.title} className="article-image" />
          <div className="article-content">
            <h2>{news.title}</h2>
            <p>{news.details}</p>
            <div className="actions">
              <button className="donate-button">
                <Link
                  to="/donations"
                  state={{ title: news.title, newsId: news._id }}
                >
                  Donations
                </Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Health;