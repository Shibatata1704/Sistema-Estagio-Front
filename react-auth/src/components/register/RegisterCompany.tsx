import { Button } from "baseui/button";
import { Input } from "baseui/input";
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

import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";

function RegisterCompany(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    setError("");

    try {
      if(values.password !== values.passwordConfirm) {
        throw new Error("senhas diferentes")
      }

      const response = await axios.post(
        "http://localhost:8080/usuarios/empresa",
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

      navigate("/home/empresa");
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      ramo: "",
      descricao: ""
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>Criar Empresa</HeadingXXLarge>
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
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Nome"
              clearOnEscape
              size="large"
              type="name"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Senha"
              clearOnEscape
              size="large"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="passwordConfirm"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              placeholder="Confirmar Senha"
              clearOnEscape
              size="large"
              type="passwordConfirm"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="ramo"
              value={formik.values.ramo}
              onChange={formik.handleChange}
              placeholder="Tecnologia"
              clearOnEscape
              size="large"
              type="ramo"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="descricao"
              value={formik.values.descricao}
              onChange={formik.handleChange}
              placeholder="Empresa voltada para desenvolvimento de jogos"
              clearOnEscape
              size="large"
              type="descricao"
            />
          </InputWrapper>
          <a href="/login/candidato">login Usuario</a>
          <InputWrapper>
            <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
              Register
            </Button>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { RegisterCompany };
