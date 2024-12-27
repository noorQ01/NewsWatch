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
import React from "react";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userSchemaValidation } from "../Validations/userValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateProfile } from "../Features/userSlice";
import Location from "./Location";
const Profile = () => {
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setuserName] = useState(user.userName);
  const [email, setemail] = useState(user.email);
  const [password, setpassword] = useState(user.password);
  const [profilePic, setprofilePic] = useState(user.profilePic);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const handleUpdate = () => {
    const userData = {
      userName: userName,
      email: email,
      password: password,
    };
    dispatch(updateProfile(userData));
    alert("Profile Updated.");
    navigate("/profile");
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user.email, navigate]);
  return (
    <Container>
      <Row>
        <Col md={4}>
          <div className="profile">
            <img src={profilePic} alt="UserAvatar" className="profile-avatar" />
            <p>{user.userName}</p>
            <p>{user.email}</p>
            <Location />
          </div>
        </Col>
        <Col md={8}>
          <div className="edit-profile">
            <div className="profile-header">
              <h2>Edit Profile</h2>
            </div>
            <form className="profile-form" onSubmit={handleUpdate}>
              <label>
                Username
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  value={userName}
                  {...register("userName", {
                    onChange: (e) => setuserName(e.target.value),
                  })}
                />
              </label>
              <p className="error"> {errors.userName?.message} </p>
              <label>
                Email
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
              </label>
              <p className="error"> {errors.email?.message} </p>
              <label>
                Password
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
              </label>
              <p className="error"> {errors.password?.message} </p>
              <label>
                Image URL
                <input
                  id="imageURL"
                  name="imageURL"
                  type="imageURL"
                  value={profilePic}
                  {...register("profilePic", {
                    onChange: (e) => setprofilePic(e.target.value),
                  })}
                />
              </label>
              <button type="submit" className="update-button">
                Update
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
