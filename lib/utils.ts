import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function detectStateFromCoordinates(lat: number, lng: number): Promise<string> {
  // In a real app, this would use a geocoding service
  // For demo purposes, return a default state
  return Promise.resolve('CA');
}

export function generateInteractionSummary(
  location: string,
  duration: number,
  notes: string
): string {
  return `Police interaction at ${location} lasting ${Math.round(duration / 60)} minutes. ${notes}`;
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export async function requestLocationPermission(): Promise<GeolocationPosition | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

export function shareInteractionSummary(summary: string, location: string): void {
  if (navigator.share) {
    navigator.share({
      title: 'Police Interaction Summary',
      text: summary,
      url: `https://maps.google.com/?q=${location}`,
    });
  } else {
    // Fallback to copying to clipboard
    navigator.clipboard.writeText(`${summary}\nLocation: ${location}`);
  }
}
