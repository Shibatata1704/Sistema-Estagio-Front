import axios, { AxiosError } from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge, HeadingMedium } from "baseui/typography";
import { useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from "react-auth-kit";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";
import { useFormik } from "formik";
import React, { useState } from "react";

function AtualizarPefil() {
  const auth = useAuthUser();
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const id = auth()!.id;
  const name = auth()!.name;

  const logout = () => {
    singOut();
    navigate("/");
  };

  const onSubmit = async (values: { email: string; name: string }) => {
    console.log("Values: ", values);
    setError("");

    try {
      const user = await axios.get(`http://localhost:8080/users/${id}-auth`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error && error instanceof AxiosError)
        setError(error.response?.data.message);
      else if (error && error instanceof Error) setError(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Container>
      <HeadingXXLarge color="secondary500">Welcome {name}</HeadingXXLarge>
      <Container>
        <InnerContainer>
          <form onSubmit={formik.handleSubmit}>
            <HeadingMedium>Atualizar perfil</HeadingMedium>
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
              <Button
                size="default"
                kind="primary"
                isLoading={formik.isSubmitting}
              >
                Enviar
              </Button>
            </InputWrapper>
          </form>
        </InnerContainer>
      </Container>
      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}

export { AtualizarPefil};
