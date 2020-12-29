// Code based on TDSGram Lecture (TDS200-1 20H), reused and reworked from: Andreas Biørn-Hansen.  
import { IonBackButton, IonButtons, IonCard, IonContent, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonToolbar, IonTitle, IonToast} from "@ionic/react";
import { personAddOutline } from "ionicons/icons";
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

  // Feedbacks if criteria is not met
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  // Allowing user to register a account, and logging in after they registered a account
  const authenticateUser = async () => {
    setIsAuthenticating(true);
    try {
      await auth.register(emailAddress, password);
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Sign up</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContentStyled>
        <CenterContent>
          <PageTitle>Create a account</PageTitle>
          <SignUpCard>
            <IonList>
              <IonItem>
                <IonInput
                  placeholder="Enter email"
                  onIonInput={(e: any) => setEmailAddress(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Select a password"
                  type="password"
                  onIonInput={(e: any) => setPassword(e.target.value)}
                />
              </IonItem>
            </IonList>
          </SignUpCard>
          <LoginButton onClick={authenticateUser}>
            <IonIcon icon={personAddOutline}></IonIcon>
          </LoginButton>
          <IonToast
            isOpen={showErrorToast}
            onDidDismiss={() => setShowErrorToast(true)}
            message="Please fill in all the information"
            duration={3000}
            color="warning"
          />
        </CenterContent>
      </IonContentStyled>
    </IonPage>
  );
};

//Use of styled components to style the page
const SignUpCard = styled(IonCard)`
  padding: 25px;
`;

const PageTitle = styled.h1`
  font-size: 40px;
  align-self: center;
  color: white;
  font-family: "Quicksand", sans-serif;
`;

const LoginButton = styled(IonFabButton)`
    --background: #A4C3B2;
    align-self center;
`;

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  height: 90%;
  flex-direction: column;
`;

const IonContentStyled = styled(IonContent)`
  --background: none;
  background: url(${nature});
  background-size: cover;
`;


export default Login;
