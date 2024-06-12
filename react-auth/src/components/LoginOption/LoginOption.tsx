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

import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";

function LoginOption(props: any) {
  const [error, setError] = useState("");
  

  const navigate = useNavigate()

  return (
    <Container>
      <InnerContainer>
      
        <HeadingXXLarge>LOGIN</HeadingXXLarge>
          
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
