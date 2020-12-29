// Code based on TDSGram Lecture (TDS200-1 20H), reused and reworked from: Andreas Biørn-Hansen.  
import {IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon} from "@ionic/react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import PostCard from "../components/PostCard";
import gql from "graphql-tag";
import { useSubscription } from "@apollo/client";
import ITourList from "../models/ITourList";
import { exitOutline } from "ionicons/icons";
import { auth } from "../utils/nhost";

// Use of graphql to get data
const GET_TOURS = gql`
  subscription {
    tours {
      id
      name
      description
      image_filename
      place
      difficulty
      length
      latitude
      longitude
      user {
        id
        display_name
      }
      tour_upvotes_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const Home = (props: any) => {

  // "useHistory" hook gives you access to the history instance that you may use to navigate
  let history = useHistory();
  const { loading, data } = useSubscription<ITourList>(GET_TOURS);

  if (loading) {
    return <IonLabel>Laster..</IonLabel>;
  }

  if (data) {
    console.log(data);
  }

  // Use of logout with nhost "auth"
  const logout = async () => {
    try {
      await auth.logout();
      // history replaces the current entry on the history stack
      history.replace("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={"start"}>
            <IonButton onClick={logout}>
              <IonIcon icon={exitOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Tour</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {data?.tours.map((tour) => (
          <Link
            style={{ textDecoration: "none" }}
            key={tour.id}
            to={{
              pathname: `/detail/${tour.id}`,
              state: {
                tour,
              },
            }}
          >
            <PostCard {...tour} />
          </Link>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
