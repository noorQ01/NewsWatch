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
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../Features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { newsSchemaValidation } from "../Validations/newsValidations";
import { useEffect, useState } from "react";
import { updateNews } from "../Features/newsSlice";

const UpdateNews = () => {
  const news = useSelector((state) => state.news.news);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: news_id } = useParams();

  const findNewsById = (news_id) => {
    return news.find((news) => news._id === news_id);
  };
  console.log(news_id);
  const newsToUpdate = findNewsById(news_id);

  console.log(newsToUpdate);
  const [title, settitle] = useState(newsToUpdate.title);
  const [imageURL, setimageURL] = useState(newsToUpdate.imageURL);
  const [details, setdetails] = useState(newsToUpdate.details);
  const [category, setcategory] = useState(newsToUpdate.category);
  const [type, settype] = useState(newsToUpdate.type);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newsSchemaValidation),
  });

  const onSubmit = (data) => {
    try {
      const newsData = {
        title: data.title,
        imageURL: data.imageURL,
        details: data.details,
        category: data.category,
        type: data.type,
      };

      console.log("Form Data", data);
      dispatch(updateNews({ newsData, news_id }));
      alert("News Updated.");
      navigate("/manageNews");
    } catch (error) {
      console.log("Error.");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Manage News</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Form className="center-form" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormGroup>
                <Label for="title">Title</Label>
                <br />
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  {...register("title", {
                    onChange: (e) => settitle(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error"> {errors.title?.message} </p>
            </Row>
            <Row>
              <FormGroup>
                <Label for="imageURL">Image URL</Label>
                <br />
                <input
                  id="imageURL"
                  name="imageURL"
                  type="text"
                  value={imageURL}
                  {...register("imageURL", {
                    onChange: (e) => setimageURL(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error"> {errors.imageURL?.message} </p>
            </Row>
            <Row>
              <FormGroup>
                <Label for="details">Details</Label>
                <br />
                <textarea
                  id="details"
                  name="details"
                  cols="43"
                  value={details}
                  {...register("details", {
                    onChange: (e) => setdetails(e.target.value),
                  })}
                ></textarea>
              </FormGroup>
              <p className="error"> {errors.details?.message} </p>
            </Row>
            <Row>
              <FormGroup>
                <Label for="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  {...register("category", {
                    onChange: (e) => setcategory(e.target.value),
                  })}
                >
                  <option value="Informational">Informational</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                </select>
              </FormGroup>
              <p className="error"> {errors.category?.message} </p>
            </Row>
            <Row>
              <FormGroup tag="fieldset">
                <legend>Type</legend>
                <div className="radio-buttons">
                  <FormGroup check>
                    <input
                      name="type"
                      type="radio"
                      value="Special"
                      {...register("type", {
                        onChange: (e) => settype(e.target.value),
                      })}
                    />
                    <Label check>Special</Label>
                  </FormGroup>
                  <FormGroup check>
                    <input
                      name="type"
                      type="radio"
                      value="Normal"
                      {...register("type", {
                        onChange: (e) => settype(e.target.value),
                      })}
                    />
                    <Label check>Normal</Label>
                  </FormGroup>
                </div>
              </FormGroup>
              <p className="error"> {errors.type?.message} </p>
            </Row>
            <Row className="center">
              <Col>
                <button className="round-button">Save Updats</button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};

export default UpdateNews;
