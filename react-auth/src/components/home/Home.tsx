import axios, { AxiosError } from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge, HeadingMedium } from "baseui/typography";
import { useNavigate } from "react-router-dom";
import {
  useSignOut,
  useAuthUser,
  useAuthHeader,
  useSignIn
} from "react-auth-kit";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

interface IUser {
  id: string;
  nome: string;
  email: string;
  ramo: string;
}

function Home() {
  const auth = useAuthUser();
  const header = useAuthHeader();
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<IUser | null>(null);

  const id = auth()!.id;
  const nome = auth()!.nome;
  const email = auth()!.email 
  

  function logout() {
    singOut();
    navigate("/login-option");
  }

  useEffect(() => {
    trazerDados();
  }, []);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  const trazerDados = async () => {
    try {
      
      const user = await axios.get("http://localhost:8080/usuario", {
        headers: {
          Authorization: header(),
        },
      });

      if(!user) {
        throw new Error("User not found")
      }

      
      setUserData(user.data)
      

    } catch (error) {
      console.log(error);
      if (error && error instanceof AxiosError)
        setError(error.response?.data.message);
      else if (error && error instanceof Error) setError(error.message);
    }
  };

  

  return (
    
    <Container>
      <HeadingXXLarge color="secondary500">Welcome {nome}</HeadingXXLarge>
      <Container>
        <InnerContainer>
          <InputWrapper>
          <div key={userData?.nome}>
              <p style={{color:"white"}}>{userData?.nome}</p>
          </div>
          </InputWrapper>
          <InputWrapper>
              <div>{userData?.email}</div>
          </InputWrapper>
          <InputWrapper>
              <div>{userData?.ramo}</div>
          </InputWrapper>
          
        </InnerContainer>
      </Container>
      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}

export { Home };

