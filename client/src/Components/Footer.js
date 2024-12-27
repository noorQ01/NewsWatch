import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <Container className="footer">
      <Row>
        <Col md={3}>
          <p className="blod-label">NewsWatch</p>
          <br />
          <p className="footer-p">
            is a website where you can watch the latest news add important news
            and also make donations.
          </p>
        </Col>
        <Col md={1}></Col>
        <Col md={4} className="footer-links">
          <Link to="/">Home</Link>
          <br />
          <Link to="/education">Education</Link>
          <br />
          <Link to="/health">Health</Link>
        </Col>
        <Col md={2}></Col>
        <Col md={2}>
          <div>
            <p className="blod-label">Connect us </p>
            <p>46S1982@utas.edu.om</p>
            <p>42S19177@utas.edu.om</p>
            <p>46S1954@utas.edu.om</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
