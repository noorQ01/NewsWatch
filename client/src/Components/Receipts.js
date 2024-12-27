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
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDonation } from "../Features/donationSlice";
import moment from "moment";

const Receipts = () => {
  const donation = useSelector((state) => state.donations.donation);
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDonation(user._id));
  }, []);

  if (donation == null) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Receipts</h1>
            <p>There is no receipts</p>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row>
        <Col>
          <h1>Receipts</h1>
        </Col>
      </Row>
      <Row>
        {donation.items.map((donation) => (
          <Col md={4} key={donation.newsId}>
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">Donated to {donation.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  in amount of {donation.amount} OMR
                </h6>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  {donation.paymentMethod}
                </h6>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  On {moment(donation.createdAt).format("DD-MM-YYYY")}
                </h6>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Receipts;
