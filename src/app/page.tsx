"use client";

import { Container, Row, Col } from "react-bootstrap";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { useDispatch } from "react-redux";
import SiteLayout from "@/components/layout/SiteLayout";

export default function Home() {
  const dispatch = useDispatch();

  dispatch(setHeaderData({ title: "Home", subtitle: "Welcome to Maiacare" }));

  return (
    <Container>
      <Row>
        <Col xs={6} className="bg-success">
          <h1>Maicare</h1>
         
        </Col>
        <Col xs={6} className="bg-danger">
          <h1>Doctor</h1>
        </Col>
      </Row>
      

      {/* <SiteLayout collapsed={false} setCollapsed={() => {}} children={<div></div>}/> */}
    </Container>
  );
}
