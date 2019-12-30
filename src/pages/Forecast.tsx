import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonLoading } from '@ionic/react';
import { WeeklyForecast } from "../models";

import DailyForecast from '../components/DailyForecast';
import { weather } from '../util';

const ForecastPage: React.FC = () => {
  const [forecast, setForecast] = useState<WeeklyForecast>([]);
  const [loading, setLoading] = useState();

  useIonViewWillEnter(async () => {
    setLoading(true);
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
              <DailyForecast scale="F" forecast={f}></DailyForecast>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ForecastPage;
