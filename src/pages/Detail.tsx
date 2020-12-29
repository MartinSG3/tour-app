// CCode based on TDSGram Lecture (TDS200-1 20H), reused and reworked from: Andreas Biørn-Hansen.  
import { useMutation } from "@apollo/client";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonAlert, IonToast } from "@ionic/react";
import gql from "graphql-tag";
import { heartOutline, trashBinOutline } from "ionicons/icons";
import React, { useState } from "react";
import TourDetails from "../components/PostCardDetails";
import ITour from "../models/ITour";
import { auth } from "../utils/nhost";

// Use of graphql mutation to delete posts 
const DELETE_POST = gql`
  mutation DeleteTour($tour_id: Int!) {
    delete_tours_by_pk(id: $tour_id) {
      id
    }
  }
`;

// Use of graphql mutation to like posts
const INSERT_LIKES = gql`
  mutation AddLikes($tour_id: Int!) {
    insert_tour_upvotes(objects: [{ tour_id: $tour_id }]) {
      affected_rows
    }
  }
`;

const Detail = (props: any) => {
  // Getting props from ITour
  const tour: ITour = props.location?.state?.tour;

  // Use of mutation to like a post and delete a post
  const [deleteTourMutation] = useMutation(DELETE_POST);
  const [InsertVote] = useMutation(INSERT_LIKES);

  // Displaying likes and error
  const [showLike, setShowLike] = useState<boolean>(false);
  const [showErrorLike, setShowErrorLike] = useState<boolean>(false);

  // Loading when you access the page
  if (!tour) {
    return <div>Laster inn turen</div>;
  }

  // Function to delete tours
  const deleteTour = async () => {
    try {
      await deleteTourMutation({
        variables: {
          tour_id: tour?.id
        }
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // Function to add a like to a post
  const InsertUpvote = async () => {
    try {
      await InsertVote({
        variables: {
          tour_id: tour?.id,
        }
      });
      setShowLike(true);
    } catch (e) {
      console.warn(e);
      setShowErrorLike(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonButtons slot="primary">
            {/* Allowing logged in user to insert a like once */}
            <IonButton onClick={InsertUpvote}>
              <IonIcon size="large" icon={heartOutline}></IonIcon>
            </IonButton>
            <IonToast
            isOpen={showLike}
            onDidDismiss={() => setShowLike(false)}
            message="U liked the post"
            duration={3000}
            color="success"
            />
            <IonToast
            isOpen={showErrorLike}
            onDidDismiss={() => setShowErrorLike(false)}
            message="U have already liked it"
            duration={3000}
            color="warning"
            />
          </IonButtons>
          <IonTitle>More details</IonTitle> 
          {/* Allowing logged in user to delete the post */}
          {tour.user.id === auth.getClaim("x-hasura-user-id") && (
            <IonButtons slot="end">
              <IonButton slot="icon-only" onClick={deleteTour} href="/home">
                <IonIcon color="danger" icon={trashBinOutline} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TourDetails {...tour}
        />
      </IonContent>
    </IonPage>
  );
};

export default Detail;
