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

function Home() {
  const auth = useAuthUser();
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const id = auth()!.id;
  const name = auth()!.name;

  const logout = () => {
    singOut();
    navigate("/login-option");
  };

  const trazerDados = async () => {
    try {
      console.log("alo");
      const user = await axios.get("http://localhost:8080/usuario", {
        withCredentials: true,
      });
      console.log(user);
    } catch (error) {
      if (error && error instanceof AxiosError)
        setError(error.response?.data.message);
      else if (error && error instanceof Error) setError(error.message);
    }
  };
  

  

  return (
    <Container>
      <HeadingXXLarge color="secondary500">Welcome {name}</HeadingXXLarge>
      <Container>
        <InnerContainer>
          <InputWrapper>
                <Button
                  size="default"
                  kind="primary"
                  onClick={trazerDados}
                >
                  Dados
                </Button>
          </InputWrapper>
         <textarea> a </textarea>
        </InnerContainer>
      </Container>
      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}

export { Home };
