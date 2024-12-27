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
import { Link, useNavigate } from "react-router-dom";
import { newsSchemaValidation } from "../Validations/newsValidations";
import { useEffect, useState } from "react";
import { addNews } from "../Features/newsSlice";

const AddNews = () => {
  const user = useSelector((state) => state.users.user);

  const [title, settitle] = useState("");
  const [imageURL, setimageURL] = useState("");
  const [details, setdetails] = useState("");
  const [category, setcategory] = useState("");
  const [type, settype] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      dispatch(addNews(newsData));
      settitle("");
      setimageURL("");
      setdetails("");
      setcategory("");
      alert("News Added");
    } catch (error) {
      console.log("Error.");
    }
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <h1>Add News</h1>
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
                <button className="round-button">Add</button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};

export default AddNews;
