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
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/userSlice";

const Login = () => {
  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      navigate("/login");
    } else if (isSuccess) {
      if (user && user.userType === "user") {
        navigate("/");
      } else {
        navigate("/addNews");
      }
    }
  }, [user, isError, isSuccess]);
  return (
    <Container className="background_color">
      <Row>
        <Col>
          <Form className="center-form">
            <Row>
              <div className="logobanner">
                <img src={logo} className="logo-img" alt="logo" />
              </div>
            </Row>
            <Row>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </FormGroup>
            </Row>
            <Row className="center">
              <Col>
                <Button
                  style={{
                    width: "100px",
                    height: "30px",
                    borderRadius: "100px",
                    textAlign: "center",
                    backgroundColor: "#c8abe9",
                    borderColor: "#000",
                    border: "1px solid",
                    color: "#fff",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  className="round-button"
                  onClick={() => handleLogin()}
                >
                  Sign in
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="center">
                <hr />
                <p>
                  <Link to="/register">or Sign up</Link>
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

export default Login;
