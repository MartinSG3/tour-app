import React, { useState } from "react";
import { IonContent, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import GoogleMaps from "google-map-react";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const Maps = (props: any) => {
  const [center, setCenter] = useState({ lat: 59.911166, lng: 10.74481 });
  const [zoom, setZoom] = useState(11);

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>Google Maps</IonTitle>
      </IonToolbar>
      <IonContent>
        <GoogleMaps
          bootstrapURLKeys={{ key: /* google key */ }}
          defaultCenter={center}
          defaultZoom={zoom}
          >
          <AnyReactComponent lat={59.911166} lng={10.74481} text="My marker" />
        </GoogleMaps>
      </IonContent>
    </IonPage>
  );
};

export default Maps;
