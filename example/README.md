# Solar Shadows - Interactive Example

Este exemplo demonstra como usar o pacote `solar-shadows` de forma simples e prática.

## 🚀 Como Executar

```bash
# 1. Instalar dependências
cd example
npm install

# 2. Rodar o servidor de desenvolvimento
npm run dev
```

Depois acesse: `http://localhost:5173`

## 📦 O que este exemplo mostra

### **Uso Simples do Pacote**

```javascript
import { calculateSunShadow } from 'solar-shadows';

// Uma linha para calcular tudo!
const shadowProps = calculateSunShadow({
  latitude: -23.5505,
  longitude: -46.6333,
  date: new Date()
});

// Retorna: { offsetX, offsetY, blur, opacity }
```

### **Funcionalidades do Demo**

- ✅ **Card interativo** com sombra dinâmica baseada na posição solar
- ✅ **Slider de horário** para simular o dia passando (0h - 23h)
- ✅ **Visualização em tempo real** das propriedades da sombra:
  - Offset X e Y
  - Blur
  - Opacity
- ✅ **Exemplo de código** mostrando como usar
- ✅ **Localização**: São Paulo, Brasil (-23.5505, -46.6333)

## 🎯 Comportamento Esperado

- **Manhã (6h-12h)**: Sombras longas vindas do leste 🌅
- **Meio-dia (12h)**: Sombras curtas e mais definidas ☀️
- **Tarde (12h-18h)**: Sombras longas indo para o oeste 🌇
- **Noite (18h-6h)**: Sem sombra (sol abaixo do horizonte) 🌙

## 💡 Como Usar no Seu Projeto

### Instalação

```bash
npm install solar-shadows
```

### Uso Básico

```javascript
import { calculateSunShadow } from 'solar-shadows';

const shadow = calculateSunShadow({
  latitude: -23.5505,
  longitude: -46.6333,
  date: new Date()
});

// Aplicar no CSS
const boxShadow = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px rgba(0,0,0,${shadow.opacity})`;
```

### Uso com Componente (futuro)

```jsx
import { Shadow } from 'solar-shadows';

<Shadow latitude={-23.5505} longitude={-46.6333}>
  <div>Meu conteúdo com sombra solar</div>
</Shadow>
```

## 📚 Documentação

Veja o código em `src/App.jsx` para um exemplo completo de implementação.
