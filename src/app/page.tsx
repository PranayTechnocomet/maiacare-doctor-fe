"use client";

import { Container } from "react-bootstrap";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { useDispatch } from "react-redux";
import Logo from "@/assets/images/maia.png";

export default function Home() {
  const dispatch = useDispatch();

  dispatch(setHeaderData({ title: "Home", subtitle: "Welcome to Maiacare" }));

  return (
    <Container>
          <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={Logo.src} alt="logo" />
      </div>
    </Container>
  );
}
