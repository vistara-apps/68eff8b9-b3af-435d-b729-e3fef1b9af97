import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    });
  });
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

export function getStateFromCoordinates(lat: number, lng: number): string {
  // Simplified state detection - in production, use a proper geocoding service
  if (lat >= 32.5 && lat <= 42 && lng >= -124.4 && lng <= -114.1) return 'CA';
  if (lat >= 25.8 && lat <= 31 && lng >= -106.6 && lng <= -93.5) return 'TX';
  if (lat >= 40.5 && lat <= 45.0 && lng >= -79.8 && lng <= -71.8) return 'NY';
  return 'Unknown';
}

export function generateInteractionSummary(
  location: string,
  timestamp: Date,
  duration?: number
): string {
  const time = timestamp.toLocaleTimeString();
  const date = timestamp.toLocaleDateString();
  
  return `Police interaction on ${date} at ${time} near ${location}${
    duration ? `. Duration: ${Math.round(duration / 60)} minutes` : ''
  }.`;
}
