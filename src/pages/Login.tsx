// Code based on TDSGram Lecture (TDS200-1 20H), reused and reworked from: Andreas Biørn-Hansen.  
import { IonButtons, IonCard, IonContent, IonFabButton, IonIcon, IonInput, IonItem, IonList, IonPage, IonSpinner, IonToast, useIonViewWillEnter } from "@ionic/react";
import { arrowForwardCircle, personAddOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../utils/nhost";
import nature from "./Woods.jpg";

const Login = () => {

  // "useHistory" hook gives you access to the history instance that you may use to navigate
  let history = useHistory();

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // If user is logged in, automatically moved to home page
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  // If user is logged in, automatically moved to home page
  useIonViewWillEnter(() => {
    if (auth.isAuthenticated()) {
      history.replace("/home");
    }
  });

  // Checking if email and password is registered in the backend server(Nhost)
  const authenticateUser = async () => {
    setIsAuthenticating(true);
    try {
      await auth.login(emailAddress, password);
      setIsAuthenticating(false);
      history.replace("/home");
    } catch (exception) {
      console.error(exception);
      setIsAuthenticating(false);
      setShowErrorToast(true);
    }
  };

  return (
    <IonPage>
      <IonContentStyled>
        <CenterContent>
          <PageTitle>FINDY</PageTitle>
          <SubTitle>Welcome to Findy, this app will help you explore new trips and share your experience</SubTitle>
          <LoginCard>
            <IonList>
              <IonItem>
                <IonInput
                  placeholder="Email"
                  onIonInput={(e: any) => setEmailAddress(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Password"
                  type="password"
                  onIonInput={(e: any) => setPassword(e.target.value)}
                />
              </IonItem>
            </IonList>
          </LoginCard>
            <ButtonsContent>
            <LoginButton onClick={authenticateUser}>
              {isAuthenticating ? (
                <IonSpinner name="crescent" />
              ) : (
                <IonIcon icon={arrowForwardCircle} />
              )}
            </LoginButton>
            <LoginButton routerLink="/signUp">
              <IonIcon icon={personAddOutline}></IonIcon>
            </LoginButton>
            </ButtonsContent>
        </CenterContent>
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Wrong username or password."
          duration={3000}
          color="warning"
        />
      </IonContentStyled>
    </IonPage>
  );
};

//Use of styled components to style the page
const LoginCard = styled(IonCard)`
  padding: 25px;
`;

const PageTitle = styled.h1`
  font-size: 40px;
  align-self: center;
  color: white;
  font-family: "Quicksand", sans-serif;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  align-self: center;
  text-align: center;
  color: white;
  font-family: "Quicksand", sans-serif;
`;

const LoginButton = styled(IonFabButton)`
  --background: #A4C3B2;
  margin-left: 10px;
`;

const ButtonsContent = styled(IonButtons)`
  align-self center;
`;

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

const IonContentStyled = styled(IonContent)`
  --background: none;
  background: url(${nature});
  background-size: cover;
`;

export default Login;
