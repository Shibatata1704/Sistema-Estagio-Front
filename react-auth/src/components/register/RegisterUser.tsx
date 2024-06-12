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

function RegisterUser(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    setError("");

    try {
      if(values.senha !== values.senhaConfirm) {
        throw new Error("senhas diferentes")
      }

      const response = await axios.post(
        "http://localhost:8080/usuarios/candidato",
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
          nome: response.data.nome,
        },
      });

      navigate("/home/candidato");
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
      nome: "",
      senha: "",
      senhaConfirm: ""
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>Criar usuário</HeadingXXLarge>
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
              name="nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              placeholder="Nome"
              clearOnEscape
              size="large"
              type="nome"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="senha"
              value={formik.values.senha}
              onChange={formik.handleChange}
              placeholder="Senha"
              clearOnEscape
              size="large"
              type="senha"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="senhaConfirm"
              value={formik.values.senhaConfirm}
              onChange={formik.handleChange}
              placeholder="Confirmar Senha"
              clearOnEscape
              size="large"
              type="senhaConfirm"
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

export { RegisterUser };
