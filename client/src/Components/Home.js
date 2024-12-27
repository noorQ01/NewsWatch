import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { viewNews } from "../Features/newsSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { likeNews } from "../Features/newsSlice";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
  };
  const news = useSelector((state) => state.news.news);
  const userId = useSelector((state) => state.users.user._id);
  const email = useSelector((state) => state.users.user.email);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const specialNews = news
    .filter((article) => article.type === "Special")
    .slice(-4);

  const handleLikeNews = (newsId) => {
    const newsData = {
      newsId: newsId,
      userId: userId,
    };
    dispatch(likeNews(newsData));
    navigate("/");
  };

  useEffect(() => {
    dispatch(viewNews());
    if (!email) {
      navigate("/login");
    }
  }, [email]);
  return (
    <div className="home-page">
      <h1>New News</h1>
      <section className="photo-gallery">
        <h2>Word in Photo</h2>
        <div className="gallery-container">
          {specialNews.map((news) => (
            <div className="gallery-item" key={news._id}>
              <img
                src={news.imageURL}
                alt={news.title}
                className="gallery-image"
              />
              <p className="gallery-title">{news.title}</p>
            </div>
          ))}
        </div>
      </section>
      {news.length > 0 && news[currentImageIndex] ? (
        <section className="middle-carousel">
          <h2>Latest news</h2>
          <div className="carousel">
            <button onClick={handlePreviousImage} className="carousel-button">
              {"<"}
            </button>
            <img
              src={news[currentImageIndex].imageURL}
              alt={`Slide ${currentImageIndex + 1}`}
              className="carousel-image"
            />
            <button onClick={handleNextImage} className="carousel-button">
              {">"}
            </button>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
      <section className="donation-steps">
        <h2>Latest News in World</h2>
        {news.map((news) => (
          <div className="article" key={news.id}>
            <img
              src={news.imageURL}
              alt={news.title}
              className="article-image"
            />
            <div className="article-content">
              <h2>{news.title}</h2>
              <p>{news.details}</p>
              <div className="actions">
                <a href="#" onClick={() => handleLikeNews(news._id)}>
                  <i className="fas fa-heart like-icon"></i>
                </a>
                {news.likes.count}
                {/* <i className="fas fa-comment comment-icon"></i> */}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
