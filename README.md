# ☀️ Solar Shadows

Dynamic real-world sun-positioned shadows for React and React Native.

[![npm version](https://img.shields.io/npm/v/solar-shadows.svg)](https://www.npmjs.com/package/solar-shadows)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Calculate and apply realistic shadows based on the **actual position of the sun** at any given time and location. Perfect for creating immersive, time-aware UIs.

## ✨ Features

- 🌍 **Real Solar Calculations** - Accurate azimuth and elevation based on astronomical algorithms
- ⚛️ **React & React Native** - Works seamlessly on web and mobile
- 🎯 **Easy to Use** - Simple API with sensible defaults
- 🌆 **24 City Presets** - Major cities worldwide with coordinates ready to use
- 📦 **Lightweight** - Zero dependencies, ~8KB minified
- 🔧 **TypeScript** - Full type definitions included
- 🎨 **Customizable** - Control shadow intensity, blur, and color

## 📦 Installation

```bash
npm install solar-shadows
# or
yarn add solar-shadows
# or
pnpm add solar-shadows
```

## 🚀 Quick Start

### React Web

```jsx
import { Shadow, CITIES } from 'solar-shadows';

function App() {
  return (
    <Shadow {...CITIES.newYork}>
      <div className="card">
        This card has a realistic solar shadow!
      </div>
    </Shadow>
  );
}
```

### React Native

```jsx
import { Shadow, CITIES } from 'solar-shadows';
import { View, Text } from 'react-native';

function App() {
  return (
    <Shadow {...CITIES.tokyo}>
      <View style={styles.card}>
        <Text>This card has a native solar shadow!</Text>
      </View>
    </Shadow>
  );
}
```

## 📖 Usage

### Using City Presets

The easiest way to get started is using our built-in city presets:

```jsx
import { Shadow, CITIES } from 'solar-shadows';

// Available cities: saoPaulo, rioDeJaneiro, newYork, london, paris, 
// tokyo, sydney, dubai, singapore, and 15 more!

<Shadow {...CITIES.london}>
  <div>Content</div>
</Shadow>
```

### Using Custom Coordinates

```jsx
<Shadow latitude={-23.5505} longitude={-46.6333}>
  <div>São Paulo shadow</div>
</Shadow>
```

### Using the Calculation Function

For more control, use the calculation function directly:

```jsx
import { calculateSunShadow } from 'solar-shadows';

function MyComponent() {
  const shadowProps = calculateSunShadow({
    latitude: 40.7128,
    longitude: -74.0060,
    date: new Date()
  });

  // Returns: { offsetX, offsetY, blur, opacity }
  const boxShadow = `${shadowProps.offsetX}px ${shadowProps.offsetY}px ${shadowProps.blur}px rgba(0,0,0,${shadowProps.opacity})`;

  return <div style={{ boxShadow }}>Card</div>;
}
```

## 🎨 Customization

### Shadow Component Props

```tsx
interface ShadowProps {
  // Required
  latitude: number;           // Geographic latitude
  longitude: number;          // Geographic longitude
  children: React.ReactElement;

  // Optional
  updateInterval?: number;    // Update frequency in ms (default: 60000)
  maxOffset?: number;         // Maximum shadow offset (default: 50)
  maxBlur?: number;           // Maximum blur radius (default: 30)
  minOpacity?: number;        // Minimum opacity (default: 0.1)
  maxOpacity?: number;        // Maximum opacity (default: 0.8)
  shadowColor?: string;       // Shadow color (default: 'rgba(0,0,0,1)' for web, '#000000' for native)
  
  // Web only
  asWrapper?: boolean;        // Wrap in div or apply to child (default: false)
  className?: string;         // Additional CSS class
  style?: CSSProperties;      // Additional styles
  
  // Native only
  style?: ViewStyle;          // Additional styles
}
```

### Example with Custom Options

```jsx
<Shadow 
  latitude={51.5074} 
  longitude={-0.1278}
  updateInterval={30000}      // Update every 30 seconds
  maxOffset={100}             // Longer shadows
  maxBlur={50}                // More diffuse shadows
  shadowColor="rgba(0,0,255,1)" // Blue shadow
>
  <div>Custom shadow</div>
</Shadow>
```

## 🌍 City Presets

We provide 24 major cities covering all timezones:

### Americas
- `saoPaulo`, `rioDeJaneiro`, `buenosAires`, `lima`
- `newYork`, `chicago`, `losAngeles`, `mexicoCity`

### Europe
- `london`, `paris`, `berlin`, `moscow`

### Africa
- `cairo`, `johannesburg`

### Asia
- `dubai`, `mumbai`, `singapore`, `tokyo`, `seoul`

### Oceania
- `sydney`, `auckland`

### Extreme Latitudes
- `reykjavik` (near Arctic Circle)
- `anchorage` (Alaska)

### Helper Functions

```jsx
import { getAllCities, getCityByName } from 'solar-shadows';

// Get all cities
const cities = getAllCities();

// Find a specific city
const paris = getCityByName('Paris');
if (paris) {
  console.log(paris.latitude, paris.longitude);
}
```

## 🎯 How It Works

Solar Shadows uses astronomical algorithms to calculate the sun's position (azimuth and elevation) based on:

1. **Geographic coordinates** (latitude/longitude)
2. **Date and time** (automatically uses current time, or specify custom)
3. **Solar position calculation** (J2000-based algorithm)

The shadow properties are then derived from the solar position:

- **Direction**: Opposite to the sun's azimuth
- **Length**: Inversely proportional to sun's elevation (longer at sunrise/sunset)
- **Blur**: Increases when sun is low (more diffuse)
- **Opacity**: Decreases when sun is low (softer shadows)

### Shadow Behavior

- ☀️ **Noon** (high sun): Short, sharp shadows
- 🌅 **Sunrise/Sunset** (low sun): Long, diffuse shadows
- 🌙 **Night** (sun below horizon): No shadow (opacity: 0)

## 📱 React Native

The package automatically uses native shadow properties on React Native:

- **iOS**: `shadowColor`, `shadowOffset`, `shadowRadius`, `shadowOpacity`
- **Android**: `elevation` (fallback for shadow support)

No configuration needed - it just works! 🎉

## 🔧 API Reference

### `Shadow` Component

Main component for applying solar shadows.

```tsx
<Shadow latitude={number} longitude={number}>
  {children}
</Shadow>
```

### `calculateSunShadow(input, options?)`

Calculate shadow properties from solar position.

```tsx
const shadow = calculateSunShadow({
  latitude: number,
  longitude: number,
  date: Date
}, {
  maxOffset?: number,
  maxBlur?: number,
  minOpacity?: number,
  maxOpacity?: number
});

// Returns: { offsetX, offsetY, blur, opacity }
```

### `calculateSolarPosition(input)`

Get raw solar position data.

```tsx
const position = calculateSolarPosition({
  latitude: number,
  longitude: number,
  date: Date
});

// Returns: { azimuth, elevation }
```

### `CITIES`

Object containing 24 city presets with coordinates.

```tsx
const city = CITIES.tokyo;
// { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' }
```

## 🎮 Live Example

Check out the [interactive example](./example) to see solar shadows in action with a time slider.

```bash
cd example
npm install
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Marcos Matsuda](https://github.com/marcosmatsuda)

## 🙏 Acknowledgments

- Solar position calculations based on astronomical algorithms
- Inspired by the need for realistic, time-aware UI design

---

**Made with ☀️ by [Marcos Matsuda](https://github.com/marcosmatsuda)**
