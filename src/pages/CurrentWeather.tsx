import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState, useRef } from 'react';
import './CurrentWeather.css';
import { iconPaths } from '../util';

const CurrentWeatherPage: React.FC = () => {
  const [temperature] = useState(302);
  const [condition] = useState(200);
  const ref = useRef(null);

  useEffect(() => {
    (ref.current as any)!.iconPaths = iconPaths;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <div className="information">
          <kws-temperature class="primary-value" scale="F" temperature={temperature}></kws-temperature>
        </div>
        <kws-condition condition={condition} ref={ref}></kws-condition>
      </IonContent>
    </IonPage>
  );
};

export default CurrentWeatherPage;
