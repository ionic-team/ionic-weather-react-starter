import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonLoading
} from '@ionic/react';
import { WeeklyForecast } from '../models';

import DailyForecast from '../components/DailyForecast';
import { settings, weather } from '../util';

const ForecastPage: React.FC = () => {
  const [forecast, setForecast] = useState<WeeklyForecast>([]);
  const [loading, setLoading] = useState();
  const [scale, setScale] = useState();

  useIonViewWillEnter(async () => {
    setLoading(true);
    setScale(await settings.getScale());
    const res = await weather.forecast();
    setForecast(res);
    setLoading(false);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Forecast</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading message="Loading Forecasts..." isOpen={loading}></IonLoading>
        <IonList>
          {forecast.map((f, index) => (
            <IonItem key={index}>
              <DailyForecast scale={scale} forecast={f}></DailyForecast>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ForecastPage;
