import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useRef, useState, useEffect } from 'react';
import { iconPaths, weather } from '../util';

const CurrentWeatherPage: React.FC = () => {
  const [temperature, setTemperature] = useState();
  const [condition, setCondition] = useState();
  const ref = useRef(null);

  useEffect(() => {
    (ref.current as any)!.iconPaths = iconPaths;
  });

  useIonViewWillEnter(async ()=>{
    const res = await weather.current();
    setTemperature(res.temperature);
    setCondition(res.condition);
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
