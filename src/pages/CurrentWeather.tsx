import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonLoading } from '@ionic/react';
import React, { useRef, useState, useEffect } from 'react';
import { iconPaths, settings, weather } from '../util';

const CurrentWeatherPage: React.FC = () => {
  const [temperature, setTemperature] = useState();
  const [condition, setCondition] = useState();
  const [loading, setLoading] = useState();
  const [scale, setScale] = useState();
  const ref = useRef(null);

  const cursorPointer = {
    cursor: 'pointer'
  };

  useEffect(() => {
    (ref.current as any)!.iconPaths = iconPaths;
  });

  useIonViewWillEnter(async () => {
    setLoading(true);
    setScale(await settings.getScale());
    const res = await weather.current();
    setTemperature(res.temperature);
    setCondition(res.condition);
    setLoading(false);
  });

  const toggleScale = () => {
    const newScale = scale === 'F' ? 'C' : 'F';
    settings.setScale(newScale);
    setScale(newScale);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center ion-padding">
        <IonLoading message="Loading Weather..." isOpen={loading}></IonLoading>
        <div className="information">
          <kws-temperature
            class="primary-value"
            scale={scale}
            temperature={temperature}
            onClick={toggleScale}
            style={cursorPointer}
          ></kws-temperature>
        </div>
        <kws-condition condition={condition} ref={ref}></kws-condition>
      </IonContent>
    </IonPage>
  );
};

export default CurrentWeatherPage;
