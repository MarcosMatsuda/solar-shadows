# City Presets

Coordenadas pré-configuradas das principais cidades do mundo para facilitar o uso do pacote.

## 🌍 Cidades Disponíveis

### América do Sul
- **São Paulo** (UTC-3)
- **Rio de Janeiro** (UTC-3)
- **Buenos Aires** (UTC-3)
- **Lima** (UTC-5)

### América do Norte
- **New York** (UTC-5)
- **Chicago** (UTC-6)
- **Los Angeles** (UTC-8)
- **Mexico City** (UTC-6)

### Europa
- **London** (UTC+0)
- **Paris** (UTC+1)
- **Berlin** (UTC+1)
- **Moscow** (UTC+3)

### África
- **Cairo** (UTC+2)
- **Johannesburg** (UTC+2)

### Ásia
- **Dubai** (UTC+4)
- **Mumbai** (UTC+5:30)
- **Singapore** (UTC+8)
- **Tokyo** (UTC+9)
- **Seoul** (UTC+9)

### Oceania
- **Sydney** (UTC+10)
- **Auckland** (UTC+12)

### Casos Extremos
- **Reykjavik** (UTC+0) - Próximo ao Círculo Polar Ártico
- **Anchorage** (UTC-9) - Alaska

## 📦 Como Usar

### Uso Básico com Componente

```jsx
import { Shadow, CITIES } from 'solar-shadows';

function App() {
  return (
    <Shadow {...CITIES.saoPaulo}>
      <div className="card">
        Card com sombra de São Paulo
      </div>
    </Shadow>
  );
}
```

### Uso com Função

```jsx
import { calculateSunShadow, CITIES } from 'solar-shadows';

const shadow = calculateSunShadow({
  ...CITIES.tokyo,
  date: new Date()
});
```

### Listar Todas as Cidades

```jsx
import { getAllCities } from 'solar-shadows';

const cities = getAllCities();
console.log(cities); // Array com todas as cidades
```

### Buscar Cidade por Nome

```jsx
import { getCityByName } from 'solar-shadows';

const city = getCityByName('Paris');
if (city) {
  console.log(city.latitude, city.longitude);
}
```

### Usar Coordenadas Customizadas

```jsx
import { Shadow } from 'solar-shadows';

// Você ainda pode usar coordenadas customizadas
<Shadow latitude={-15.7939} longitude={-47.8828}>
  <div>Brasília (coordenadas customizadas)</div>
</Shadow>
```

## 🎯 TypeScript

Os presets têm tipagem completa:

```typescript
import { CITIES, CityPreset, CityName } from 'solar-shadows';

// Autocomplete funciona!
const city: CityName = 'saoPaulo'; // ✅
const invalid: CityName = 'invalid'; // ❌ Erro de tipo

// Tipo do preset
const preset: CityPreset = CITIES.london;
```

## 💡 Por que usar presets?

1. ✅ **Facilita testes** - Não precisa buscar coordenadas
2. ✅ **Exemplos prontos** - Comece a usar rapidamente
3. ✅ **Diversidade** - Veja como funciona em diferentes localizações
4. ✅ **Educacional** - Compare comportamento entre hemisférios
