import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewNews, updateNews, deleteNews } from "../Features/newsSlice";
import { Table } from "reactstrap";

const ManageNews = () => {
  const news = useSelector((state) => state.news.news || []);
  const email = useSelector((state) => state.users.user.email);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      dispatch(deleteNews(id));
    }
  };

  const handleUpdate = (id) => {
    navigate("/updateNews/" + id);
  };

  useEffect(() => {
    dispatch(viewNews());
    if (!email) {
      navigate("/login");
    }
  }, [email]);
  return (
    <div>
      <h1>News</h1>
      {Array.isArray(news) &&
        news.map((news) => (
          <div className="article" key={news._id}>
            <img
              src={news.imageURL}
              alt={news.title}
              className="article-image"
            />
            <div className="article-content">
              <h2>{news.title}</h2>
              <p>{news.details}</p>
              <div className="actions">
                <button
                  className="donate-button"
                  onClick={() => handleUpdate(news._id)}
                >
                  Update
                </button>
                <button
                  className="donate-button"
                  onClick={() => handleDelete(news._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ManageNews;
