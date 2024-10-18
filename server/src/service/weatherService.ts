import { error } from 'console';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  windSpeed: number;
  humidity: number;

  constructor(
    temperature: number,
    windSpeed: number,
    humidity: number
  ) {
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseUrl?: string = '';
  private apiKey?: string = '';
  private city: string = '';

  constructor() {
    this.baseUrl = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.city = '';
  }


  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}weather?q=${this.city}&appid=${this.apiKey}`
      );
      const locationData = await response.json();
      return locationData;
    }
    catch (error) {
      console.error('Error fetching location data.')
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.coord.lat,
      lon: locationData.coord.lon
    };
  }


  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `weather?q=${this.city}&appid=${this.apiKey}`;
  }


  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }


  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates | string> {
    try {
      const locationData = await this.fetchLocationData(this.city);

      if (!locationData || !locationData.coord) {
        return 'Invalid location data structure';
      }

      const coordinates = this.destructureLocationData(locationData);
      return coordinates;
    } catch (err: any) {
      throw new Error(`Error fetching and destructuring location data: ${err}`);
    }
  }


  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
