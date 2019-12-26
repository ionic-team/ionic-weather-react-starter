import { weather } from './weather';

describe('weather service', () => {
  let spy: any;
  beforeEach(() => {
    spy = jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve()
      } as any)
    );
  });

  afterEach(() => spy.mockReset());

  afterEach(() => spy.mockReset());
  it('exists', () => {
    expect(weather).toBeTruthy();
  });

  describe('current weather', () => {
    let spy: any;
    beforeEach(() => {
      spy = jest.spyOn(window, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(currentWeather)
        } as any)
      );
    });

    afterEach(() => spy.mockReset());

    it('fetches the current weather for the current location', async () => {
      await weather.current();
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather?lat=43.073051&lon=-89.40123&appid=357d7d7f94bf6a9b04b534db299a1a3b'
      );
    });

    it('unpacks the result', async () => {
      const res = await weather.current();
      expect(res).toEqual({
        temperature: 280.32,
        condition: 300,
        date: new Date(1485789600 * 1000)
      });
    });
  });

  describe('forecast', () => {
    let spy: any;
    beforeEach(() => {
      spy = jest.spyOn(window, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(forecast)
        } as any)
      );
    });

    afterEach(() => spy.mockReset());

    it('fetches the forecast for the current location', async () => {
      await weather.forecast();
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/forecast?lat=43.073051&lon=-89.40123&appid=357d7d7f94bf6a9b04b534db299a1a3b'
      );
    });

    it('unpacks the result', async () => {
      const res = await weather.forecast();
      expect(res).toEqual([
        [
          {
            temperature: 283.76,
            condition: 800,
            date: new Date(1485799200 * 1000)
          },
          {
            temperature: 282.56,
            condition: 800,
            date: new Date(1485810000 * 1000)
          },
          {
            temperature: 282.3,
            condition: 800,
            date: new Date(1485820800 * 1000)
          }
        ],
        [
          {
            temperature: 280.3,
            condition: 340,
            date: new Date(1485896400 * 1000)
          },
          {
            temperature: 279.42,
            condition: 342,
            date: new Date(1485907200 * 1000)
          }
        ]
      ]);
    });
  });

  describe('UV index', () => {
    let spy: any;
    beforeEach(() => {
      spy = jest.spyOn(window, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(uvi)
        } as any)
      );
    });

    afterEach(() => spy.mockReset());

    it('fetches the UV Index for the current location', async () => {
      await weather.uvIndex();
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/uvi?lat=43.073051&lon=-89.40123&appid=357d7d7f94bf6a9b04b534db299a1a3b'
      );
    });

    it('unpacks the result', async () => {
      const res = await weather.uvIndex();
      expect(res).toEqual({
        value: 10.06,
        riskLevel: 3
      });
    });

    it.each([
      [0, 0],
      [2.99, 0],
      [3, 1],
      [5.99, 1],
      [6, 2],
      [7.99, 2],
      [8, 3],
      [10.99, 3],
      [11, 4],
      [15, 4]
    ])('assigns the proper risk level for value %i', async (value, risk) => {
      uvi.value = value;
      const res = await weather.uvIndex();
      expect(res.riskLevel).toEqual(risk);
    });
  });
});

let currentWeather = {
  coord: { lon: -0.13, lat: 51.51 },
  weather: [{ id: 300, main: 'Drizzle', description: 'light intensity drizzle', icon: '09d' }],
  base: 'stations',
  main: { temp: 280.32, pressure: 1012, humidity: 81, temp_min: 279.15, temp_max: 281.15 },
  visibility: 10000,
  wind: { speed: 4.1, deg: 80 },
  clouds: { all: 90 },
  dt: 1485789600,
  sys: { type: 1, id: 5091, message: 0.0103, country: 'GB', sunrise: 1485762037, sunset: 1485794875 },
  id: 2643743,
  name: 'London',
  cod: 200
};

let forecast = {
  list: [
    {
      dt: 1485799200,
      main: {
        temp: 283.76
      },
      weather: [
        {
          id: 800
        }
      ]
    },
    {
      dt: 1485810000,
      main: {
        temp: 282.56
      },
      weather: [
        {
          id: 800
        }
      ]
    },
    {
      dt: 1485820800,
      main: {
        temp: 282.3
      },
      weather: [
        {
          id: 800
        }
      ]
    },
    {
      dt: 1485896400,
      main: {
        temp: 280.3
      },
      weather: [
        {
          id: 340
        }
      ]
    },
    {
      dt: 1485907200,
      main: {
        temp: 279.42
      },
      weather: [
        {
          id: 342
        }
      ]
    }
  ]
};

let uvi = {
  lat: 37.75,
  lon: -122.37,
  date_iso: '2017-06 - 26T12: 00: 00Z',
  date: 1498478400,
  value: 10.06
};
