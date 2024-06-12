import { Button } from "baseui/button";
import { Input } from "baseui/input";
import styled from "styled-components";
import {
  HeadingXXLarge,
  HeadingXLarge,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
} from "baseui/typography";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";
import "./login.css";

import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";

function LoginUser(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const navigate = useNavigate();

  console.log('hi');

  const onSubmit = async (values: any) => {
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        values
      );

      console.log('response.data :>> ', response.data);

      signIn({
        token: response.data.token,
        tokenType: "Bearer",
        expiresIn: 3600,
        authState: {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
        },
      });


      navigate("/");
      // if (response.type == "user") {
      //   navigate("/");
      // } else if (response.type == "enterprise") {
      //   navigate("/enterprises");
      // }
    } catch (err) {
      console.log('err :>> ', err);
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>LOGIN</HeadingXXLarge>
          <ErrorText>{error}</ErrorText>
          <InputWrapper>
            <StyledInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              clearOnEscape
              size="large"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="senha"
              value={formik.values.senha}
              onChange={formik.handleChange}
              placeholder="senha"
              clearOnEscape
              size="large"
              type="senha"
            />
          </InputWrapper>
          <a href="/sign-up/usuario">cadastrar novo usuário</a>
          <InputWrapper>
            <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
              Login
            </Button>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { LoginUser };
