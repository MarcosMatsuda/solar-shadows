/**
 * Tipos para cálculos solares e sombras
 */
export interface SolarPosition {
  azimuth: number;
  elevation: number;
}

export interface ShadowProperties {
  offsetX: number;
  offsetY: number;
  blur: number;
  opacity: number;
}

export interface SunCalculationInput {
  latitude: number;
  longitude: number;
  date: Date;
}

/**
 * Calcula a posição do sol (azimute e elevação) baseado em coordenadas e data
 * Usa algoritmo simplificado baseado em cálculos astronômicos
 */
export function calculateSolarPosition({
  latitude,
  longitude,
  date,
}: SunCalculationInput): SolarPosition {
  const lat = degreesToRadians(latitude);

  // Número de dias desde 1 de janeiro de 2000, 12:00 UTC
  const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  const n = (date.getTime() - J2000) / (1000 * 60 * 60 * 24);

  // Longitude solar média
  const L = (280.460 + 0.9856474 * n) % 360;

  // Anomalia média
  const g = degreesToRadians((357.528 + 0.9856003 * n) % 360);

  // Longitude eclíptica
  const lambda = degreesToRadians(
    L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)
  );

  // Obliquidade da eclíptica
  const epsilon = degreesToRadians(23.439 - 0.0000004 * n);

  // Ascensão reta e declinação
  const alpha = Math.atan2(Math.cos(epsilon) * Math.sin(lambda), Math.cos(lambda));
  const delta = Math.asin(Math.sin(epsilon) * Math.sin(lambda));

  // Tempo sideral de Greenwich
  const hours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const GMST = (6.697375 + 0.0657098242 * n + hours) % 24;
  const GAST = GMST + (1.915 * Math.sin(g)) / 3600;

  // Ângulo horário local
  const H = degreesToRadians((GAST * 15 + longitude - radiansToDegrees(alpha)) % 360);

  // Elevação (altitude)
  const elevation = Math.asin(
    Math.sin(lat) * Math.sin(delta) + Math.cos(lat) * Math.cos(delta) * Math.cos(H)
  );

  // Azimute
  const azimuth = Math.atan2(
    Math.sin(H),
    Math.cos(H) * Math.sin(lat) - Math.tan(delta) * Math.cos(lat)
  );

  return {
    azimuth: normalizeAngle(radiansToDegrees(azimuth)),
    elevation: radiansToDegrees(elevation),
  };
}

/**
 * Converte a posição solar em propriedades de sombra CSS
 * Quanto menor a elevação, maior o offset e blur (sombras mais longas ao pôr/nascer do sol)
 */
export function solarPositionToShadow(
  solarPosition: SolarPosition,
  options: {
    maxOffset?: number;
    maxBlur?: number;
    minOpacity?: number;
    maxOpacity?: number;
  } = {}
): ShadowProperties {
  const {
    maxOffset = 50,
    maxBlur = 30,
    minOpacity = 0.1,
    maxOpacity = 0.8,
  } = options;

  const { azimuth, elevation } = solarPosition;

  // Se o sol está abaixo do horizonte, sem sombra
  if (elevation < 0) {
    return {
      offsetX: 0,
      offsetY: 0,
      blur: 0,
      opacity: 0,
    };
  }

  // Normalizar elevação para 0-1 (0° = horizonte, 90° = zênite)
  const elevationNormalized = Math.max(0, Math.min(90, elevation)) / 90;

  // Quanto menor a elevação, maior o offset e blur (inverso)
  const shadowIntensity = 1 - elevationNormalized;

  // Calcular offset baseado no azimute (direção da sombra é oposta ao sol)
  const shadowAzimuth = (azimuth + 180) % 360;
  const azimuthRad = degreesToRadians(shadowAzimuth);

  // Offset aumenta quando o sol está baixo
  const offsetMagnitude = maxOffset * shadowIntensity;
  const offsetX = Math.sin(azimuthRad) * offsetMagnitude;
  const offsetY = -Math.cos(azimuthRad) * offsetMagnitude;

  // Blur aumenta quando o sol está baixo (sombras mais difusas)
  const blur = maxBlur * shadowIntensity;

  // Opacidade diminui quando o sol está baixo (sombras mais suaves)
  const opacity = minOpacity + (maxOpacity - minOpacity) * elevationNormalized;

  return {
    offsetX: Math.round(offsetX * 100) / 100,
    offsetY: Math.round(offsetY * 100) / 100,
    blur: Math.round(blur * 100) / 100,
    opacity: Math.round(opacity * 100) / 100,
  };
}

/**
 * Função principal que combina cálculo solar e conversão para sombra
 */
export function calculateSunShadow(
  input: SunCalculationInput,
  options?: Parameters<typeof solarPositionToShadow>[1]
): ShadowProperties {
  const solarPosition = calculateSolarPosition(input);
  return solarPositionToShadow(solarPosition, options);
}

/**
 * Utilitários de conversão
 */
function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function normalizeAngle(angle: number): number {
  let normalized = angle % 360;
  if (normalized < 0) normalized += 360;
  return normalized;
}
