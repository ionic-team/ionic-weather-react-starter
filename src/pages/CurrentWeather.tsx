import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useRef, useState } from 'react';
import { iconPaths } from '../util/iconPaths';

const CurrentWeatherPage: React.FC = () => {
  const [temperature] = useState(302);
  const [condition] = useState(200);
  const ref = useRef(null);
  useIonViewWillEnter(() => {
    (ref.current as any)!.iconPaths = iconPaths;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center ion-padding">
        <div className="information">
          <kws-temperature class="primary-value" scale="F" temperature={temperature}></kws-temperature>
        </div>
        <kws-condition condition={condition} ref={ref}></kws-condition>
      </IonContent>
    </IonPage>
  );
};

export default CurrentWeatherPage;
