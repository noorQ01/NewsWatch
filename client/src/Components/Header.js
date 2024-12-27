import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Container,
  Row,
  Col,
} from "reactstrap";
import logo from "../Images/logo2.png";
import notifi from "../Images/notification.png";
import search from "../Images/search.png";
import user from "../Images/user.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/userSlice";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { CiReceipt } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.users.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/login");
  };
  return (
    <>
      <Container>
        <Row>
          <Col md={3}>
            <Link to="/receipts">
              <CiReceipt className="icon" />
            </Link>
          </Col>
          <Col md={6}>
            <div className="logobanner">
              <img src={logo} className />
            </div>
          </Col>
          <Col md={3} className="right">
            <Link to="/profile">
              <CgProfile className="icon" />
            </Link>
            <Link onClick={handlelogout}>
              <IoLogOutOutline className="icon" />
            </Link>
          </Col>
        </Row>
      </Container>
      <Navbar>
        <Nav>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          {user.userType === "admin" && (
            <NavItem>
              <Link to="/addNews">Add News</Link>
            </NavItem>
          )}
          {user.userType === "admin" && (
            <NavItem>
              <Link to="/manageNews">Manage News</Link>
            </NavItem>
          )}
          {user.userType !== "admin" && (
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle nav caret>
                Category
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link to="/education">Education</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/health">Health</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
          <NavItem>
            <Link to="/aboutUs">About Us</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
