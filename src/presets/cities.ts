/**
 * Preset de coordenadas das principais cidades do mundo
 * Organizadas por continente e timezone
 */

export interface CityPreset {
  latitude: number;
  longitude: number;
  timezone: string;
  name: string;
}

/**
 * Principais cidades do mundo com diferentes timezones
 */
export const CITIES = {
  // América do Sul (UTC-3 a UTC-5)
  saoPaulo: {
    name: 'São Paulo',
    latitude: -23.5505,
    longitude: -46.6333,
    timezone: 'America/Sao_Paulo', // UTC-3
  },
  rioDeJaneiro: {
    name: 'Rio de Janeiro',
    latitude: -22.9068,
    longitude: -43.1729,
    timezone: 'America/Sao_Paulo', // UTC-3
  },
  buenosAires: {
    name: 'Buenos Aires',
    latitude: -34.6037,
    longitude: -58.3816,
    timezone: 'America/Argentina/Buenos_Aires', // UTC-3
  },
  lima: {
    name: 'Lima',
    latitude: -12.0464,
    longitude: -77.0428,
    timezone: 'America/Lima', // UTC-5
  },

  // América do Norte (UTC-5 a UTC-8)
  newYork: {
    name: 'New York',
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York', // UTC-5
  },
  chicago: {
    name: 'Chicago',
    latitude: 41.8781,
    longitude: -87.6298,
    timezone: 'America/Chicago', // UTC-6
  },
  losAngeles: {
    name: 'Los Angeles',
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: 'America/Los_Angeles', // UTC-8
  },
  mexicoCity: {
    name: 'Mexico City',
    latitude: 19.4326,
    longitude: -99.1332,
    timezone: 'America/Mexico_City', // UTC-6
  },

  // Europa (UTC+0 a UTC+3)
  london: {
    name: 'London',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London', // UTC+0
  },
  paris: {
    name: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: 'Europe/Paris', // UTC+1
  },
  berlin: {
    name: 'Berlin',
    latitude: 52.5200,
    longitude: 13.4050,
    timezone: 'Europe/Berlin', // UTC+1
  },
  moscow: {
    name: 'Moscow',
    latitude: 55.7558,
    longitude: 37.6173,
    timezone: 'Europe/Moscow', // UTC+3
  },

  // África (UTC+0 a UTC+3)
  cairo: {
    name: 'Cairo',
    latitude: 30.0444,
    longitude: 31.2357,
    timezone: 'Africa/Cairo', // UTC+2
  },
  johannesburg: {
    name: 'Johannesburg',
    latitude: -26.2041,
    longitude: 28.0473,
    timezone: 'Africa/Johannesburg', // UTC+2
  },

  // Ásia (UTC+3 a UTC+9)
  dubai: {
    name: 'Dubai',
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: 'Asia/Dubai', // UTC+4
  },
  mumbai: {
    name: 'Mumbai',
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: 'Asia/Kolkata', // UTC+5:30
  },
  singapore: {
    name: 'Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    timezone: 'Asia/Singapore', // UTC+8
  },
  tokyo: {
    name: 'Tokyo',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 'Asia/Tokyo', // UTC+9
  },
  seoul: {
    name: 'Seoul',
    latitude: 37.5665,
    longitude: 126.9780,
    timezone: 'Asia/Seoul', // UTC+9
  },

  // Oceania (UTC+10 a UTC+12)
  sydney: {
    name: 'Sydney',
    latitude: -33.8688,
    longitude: 151.2093,
    timezone: 'Australia/Sydney', // UTC+10
  },
  auckland: {
    name: 'Auckland',
    latitude: -36.8485,
    longitude: 174.7633,
    timezone: 'Pacific/Auckland', // UTC+12
  },

  // Casos Extremos
  reykjavik: {
    name: 'Reykjavik',
    latitude: 64.1466,
    longitude: -21.9426,
    timezone: 'Atlantic/Reykjavik', // UTC+0 (próximo ao Círculo Polar Ártico)
  },
  anchorage: {
    name: 'Anchorage',
    latitude: 61.2181,
    longitude: -149.9003,
    timezone: 'America/Anchorage', // UTC-9 (Alaska)
  },
} as const;

/**
 * Helper para obter lista de todas as cidades
 */
export function getAllCities(): CityPreset[] {
  return Object.values(CITIES);
}

/**
 * Helper para buscar cidade por nome
 */
export function getCityByName(name: string): CityPreset | undefined {
  return Object.values(CITIES).find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Tipos para facilitar autocompletar
 */
export type CityName = keyof typeof CITIES;
