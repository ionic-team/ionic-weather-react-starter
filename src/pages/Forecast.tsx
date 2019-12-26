import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { WeeklyForecast } from "../models";

import DailyForecast from '../components/DailyForecast';
import { weather } from '../util';

const ForecastPage: React.FC = () => {
  const [forecast, setForecast] = useState<WeeklyForecast>([]);

  useIonViewWillEnter(async () => {
    const res = await weather.forecast();
    setForecast(res);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Forecast</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
