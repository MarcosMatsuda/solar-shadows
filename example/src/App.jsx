import { useState, useMemo } from 'react';
import { calculateSunShadow } from 'solar-shadows';
import './App.css';

function App() {
  const [hour, setHour] = useState(12);
  
  // Coordenadas de São Paulo
  const latitude = -23.5505;
  const longitude = -46.6333;

  // Criar data com o horário selecionado
  const date = useMemo(() => {
    const d = new Date();
    d.setHours(hour, 0, 0, 0);
    return d;
  }, [hour]);

  // Calcular sombra baseada na posição solar - UMA LINHA!
  const shadowProps = useMemo(() => {
    return calculateSunShadow({ latitude, longitude, date });
  }, [latitude, longitude, date]);

  // Converter para CSS box-shadow
  const boxShadow = useMemo(() => {
    const { offsetX, offsetY, blur, opacity } = shadowProps;
    if (opacity === 0) return 'none';
    return `${offsetX}px ${offsetY}px ${blur}px rgba(0, 0, 0, ${opacity})`;
  }, [shadowProps]);

  const formatTime = (h) => `${h.toString().padStart(2, '0')}:00`;

  const getSunEmoji = () => {
    if (hour >= 6 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 18) return '☀️';
    if (hour >= 18 && hour < 20) return '🌇';
    return '🌙';
  };

  return (
    <div className="container">
      <div className="header">
        <h1>☀️ Solar Shadows</h1>
        <p>Sombras dinâmicas baseadas na posição real do sol</p>
      </div>

      {/* Card com sombra solar dinâmica */}
      <div className="card" style={{ boxShadow }}>
        <span className="sun-icon">{getSunEmoji()}</span>
        <h2>Card Interativo</h2>
        <p>
          Mova o slider abaixo para simular diferentes horários do dia.
          A sombra deste card muda automaticamente baseada na posição do sol em São Paulo.
        </p>
        <div className="code-example">
          <code>
            calculateSunShadow({`{ latitude, longitude, date }`})
          </code>
        </div>
      </div>

      {/* Controles */}
      <div className="controls">
        <div className="control-group">
          <label>Horário do Dia</label>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="23"
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
            />
            <span className="time-display">{formatTime(hour)}</span>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <label>Offset X</label>
            <value>{shadowProps.offsetX.toFixed(1)}px</value>
          </div>
          <div className="info-item">
            <label>Offset Y</label>
            <value>{shadowProps.offsetY.toFixed(1)}px</value>
          </div>
          <div className="info-item">
            <label>Blur</label>
            <value>{shadowProps.blur.toFixed(1)}px</value>
          </div>
          <div className="info-item">
            <label>Opacity</label>
            <value>{shadowProps.opacity.toFixed(2)}</value>
          </div>
        </div>
      </div>

      {/* Exemplo de código */}
      <div className="code-section">
        <h3>📝 Código deste exemplo:</h3>
        <pre>{`import { calculateSunShadow } from 'solar-shadows';

const shadowProps = calculateSunShadow({
  latitude: -23.5505,
  longitude: -46.6333,
  date: new Date()
});

// Retorna: { offsetX, offsetY, blur, opacity }
const boxShadow = \`\${shadowProps.offsetX}px \${shadowProps.offsetY}px \${shadowProps.blur}px rgba(0,0,0,\${shadowProps.opacity})\`;`}</pre>
      </div>
    </div>
  );
}

export default App;
