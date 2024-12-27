import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Education from "./Components/Education";
import Health from "./Components/Health";
import Donations from "./Components/Donations";
import AboutUs from "./Components/AboutUs";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import { useSelector } from "react-redux";
import AddNews from "./Components/AddNews";
import ManageNews from "./Components/ManageNews";
import UpdateNews from "./Components/UpdateNews";
import Receipts from "./Components/Receipts";

function App() {
  const email = useSelector((state) => state.users.user.email);
  return (
    <Container fluid>
      <Router>
        <Row className="header">
          {email ? (
            <>
              <Header />
            </>
          ) : null}
        </Row>
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/education" element={<Education />}></Route>
            <Route path="/health" element={<Health />}></Route>
            <Route path="/donations" element={<Donations />}></Route>
            <Route path="/AboutUs" element={<AboutUs />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/addNews" element={<AddNews />}></Route>
            <Route path="/manageNews" element={<ManageNews />}></Route>
            <Route path="/updateNews/:id" element={<UpdateNews />}></Route>
            <Route path="/receipts" element={<Receipts/>}></Route>
            
          </Routes>
        </Row>
        <Row className="footer">
          {email ? (
            <>
              <Footer />
            </>
          ) : null}
        </Row>
      </Router>
    </Container>
  );
}

export default App;
