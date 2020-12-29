// Code based on TDSGram Lecture (TDS200-1 20H), reused and reworked from: Andreas Biørn-Hansen.  
import {IonBackButton, IonLoading, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTextarea, IonTitle, IonToolbar, IonLabel, IonSelect, IonSelectOption, IonIcon, IonSpinner} from "@ionic/react";
import React, { useState } from "react";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { auth, storage } from "../utils/nhost";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Geolocation } from '@capacitor/core';

// Use of graphql to insert data
const INSERT_TOUR = gql`
  mutation InsertTour($tour: tours_insert_input!) {
    insert_tours_one(object: $tour) {
      name
      description
      user_id
      image_filename
      place
      difficulty
      length
      latitude
      longitude
    }
  }
`;

const NewPost = () => {

  // Use of capacitor to upload a picture
  const { photo, getPhoto } = useCamera();
  const [insertTourMutation] = useMutation(INSERT_TOUR);

  // Information about the tour
  const [name, setName] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [place, setPlace] = useState<String>("");
  const [difficulty, setDifficulty] = useState<String>("");
  const [length, setLength] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(); 
  const [longitude, setLongitude] = useState<number>();

  // Use of geoLocation to recevie coordinates
  const getLocation = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        setLatitude(coordinates.coords.latitude);
        setLongitude(coordinates.coords.longitude);
  }

  let filename = "";

  // Use of capacitor to take a picture
  const triggerCamera = async () => {
    await getPhoto({
      quality: 20,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
  };

  // Use of capacitor to upload a picture to the server
  const uploadImage = async () => {
    filename = `${Date.now().toString()}.jpeg`;
    await storage.putString(
      `/public/${filename}`,
      photo?.dataUrl as string,
      "data_url",
      null,
      (pe: ProgressEvent) => {
        console.log(pe.loaded);
      }
    );
  };

  // Inserting the tour to the backend server
  const insertTour = async () => {
    try {
      await insertTourMutation({
        variables: {
          tour: {
            name,
            description,
            image_filename: filename,
            place,
            difficulty,
            length,
            latitude,
            longitude,
            user_id: auth.getClaim("x-hasura-user-id"),
          },
        },
      });
    } catch (e) {}
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={"start"}>
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Legg til en ny tur</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <img src={photo?.dataUrl} />
        <IonList>
          <IonItem>
            <IonInput
              placeholder="Tour"
              onIonInput={(e: any) => setName(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Place"
              onIonInput={(e: any) => setPlace(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Difficulty</IonLabel>
            <IonSelect onIonChange={(e: any) => setDifficulty(e.target.value)}>
              <IonSelectOption value="Easy">Easy</IonSelectOption>
              <IonSelectOption value="Medium">Medium</IonSelectOption>
              <IonSelectOption value="Hard">Hard</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Length"
              onIonInput={(e: any) => setLength(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              placeholder="Legg til en beskrivelse"
              onIonInput={(e: any) => setDescription(e.target.value)}
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Get coords"
              value={latitude}
              onIonInput={(e: any) => (e.target.value)}
            ></IonInput>
              <IonLoading 
              isOpen={loading}
              message={"Finding location..."}
              onDidDismiss={() => setLoading(false)} /> 
              <IonButton onClick={getLocation}>Get Location
              </IonButton>
          </IonItem>
          <IonButton color="primary" expand="block" onClick={triggerCamera}>
            Take a picture
          </IonButton>
          <IonButton color="primary" expand="block" onClick={uploadImage}>
            Upload the picture
          </IonButton>
          <IonButton
            color="success"
            size="default"
            expand="block"
            onClick={insertTour}
            routerLink="/home"
          > Post now
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NewPost;
