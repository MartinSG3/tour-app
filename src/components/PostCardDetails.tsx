// Code based on TDSGram Lecture (TDS200-1 20H), reused and reworked from: Andreas Biørn-Hansen.  
import { IonCard, IonHeader, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFabButton } from '@ionic/react';
import React from 'react';
import ITour from '../models/ITour';

//getting data from ITour to create detail card
const TourDetail = ({name, user, description, image_filename, place, difficulty, length, tour_upvotes_aggregate, latitude, longitude}: ITour) => {

    return(
            <IonCard>
                <IonHeader>
                </IonHeader>
                <img src={`https://backend-u52k5ue2.nhost.app/storage/o/public/${image_filename}`} />
                <IonCardHeader>
                <IonCardTitle color="primary">
                    {name}
                </IonCardTitle>
                <IonCardSubtitle>
                    {user.display_name}
                </IonCardSubtitle>
                <IonCardSubtitle>
                    Likes: {tour_upvotes_aggregate.aggregate.count}
                </IonCardSubtitle>
                <IonCardSubtitle>
                    Area: {place}
                </IonCardSubtitle>
                <IonCardSubtitle>
                    Coordinates: {latitude} {longitude}
                </IonCardSubtitle>
                <IonCardSubtitle>
                    Length: {length}
                </IonCardSubtitle>
                <IonCardSubtitle>
                    Difficulty: {difficulty}
                </IonCardSubtitle>
                </IonCardHeader>
                <IonContent>
                    Description: {description}
                </IonContent>
            </IonCard>
    )
     
};

export default TourDetail