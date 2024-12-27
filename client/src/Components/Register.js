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
import logo from "../Images/logo2.png";
import { Link } from "react-router-dom";
import { userSchemaValidation } from "../Validations/userValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../Features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const userList = useSelector((state) => state.users.value);

  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = (data) => {
    try {
      const userData = {
        userName: data.userName,
        email: data.email,
        password: data.password,
      };

      console.log("Form Data, data");
      alert("Validation all good.");
      dispatch(registerUser(userData));
      navigate("/login");
    } catch (error) {
      console.log("Error.");
    }
  };
  return (
    <Container className="background_color">
      <Row>
        <Col>
          <Form className="center-form" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <div className="logobanner">
                <img src={logo} className />
              </div>
            </Row>
            <Row>
              <FormGroup>
                <Label for="userName">Username</Label>
                <br />
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  {...register("userName", {
                    onChange: (e) => setuserName(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error"> {errors.userName?.message} </p>
            </Row>
            <Row>
              <FormGroup>
                <Label for="email">Email</Label>
                <br />
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error"> {errors.email?.message} </p>
            </Row>
            <Row>
              <FormGroup>
                <Label for="password">Password</Label>
                <br />
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error"> {errors.password?.message} </p>
            </Row>
            <Row className="center">
              <Col>
                <button className="round-button">Sign up</button>
              </Col>
            </Row>
            <Row>
              <Col className="center">
                <hr />
                <p>
                  <Link to="/login">or Sign in</Link>
                </p>
                <hr />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
