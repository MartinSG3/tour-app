// Code based on TDSGram Lecture (TDS200-1 20H), reused and reworked from: Andreas Biørn-Hansen.  
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader } from '@ionic/react';
import React from 'react';
import ITour from '../models/ITour';

//getting data from ITour to create tour cards
const PostCard = ({name, user, image_filename, place, tour_upvotes_aggregate}: ITour) => {

    return(
        <IonCard>
                <IonHeader>
                </IonHeader>
            <img src={`https://backend-u52k5ue2.nhost.app/storage/o/public/${image_filename}`} />
                <IonCardHeader>
                <IonCardSubtitle>
                    @{user.display_name}
                </IonCardSubtitle>
                <IonCardTitle>
                    {name}
                </IonCardTitle>
                <IonCardSubtitle>
                    Likes: {tour_upvotes_aggregate.aggregate.count}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                Område: {place}
            </IonCardContent>
        </IonCard>
    )
};

export default PostCard
