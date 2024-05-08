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
import "./styles.css";

import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";

function LoginOption(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        values
      );

      //salva nos cookies e autentica
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          id: response.data.id,
          email: values.email,
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
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };


  return (
    <Container>
      <InnerContainer>
      
        <HeadingXXLarge>LOGIN</HeadingXXLarge>
        <ErrorText>{error}</ErrorText>
          
        <InputWrapper>
          <Button onClick={() => navigate('/login/candidato')}>
            <span>ENTRAR COMO CANDIDATO</span>
          </Button>
        </InputWrapper>

        <InputWrapper>
          <Button onClick={() => navigate('/login/empresa')}>
            <span>ENTRAR COMO EMPRESA</span>
          </Button>
        </InputWrapper>
        
      </InnerContainer>
    </Container>
  );
}

export { LoginOption };
