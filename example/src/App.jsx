import { useState, useMemo } from 'react';
import { calculateSunShadow, calculateSolarPosition } from 'solar-shadows';
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

  // Calcular posição solar (azimute e elevação)
  const solarPosition = useMemo(() => {
    return calculateSolarPosition({ latitude, longitude, date });
  }, [latitude, longitude, date]);

  // Calcular sombra baseada na posição solar
  const shadowProps = useMemo(() => {
    return calculateSunShadow({ latitude, longitude, date });
  }, [latitude, longitude, date]);

  // Converter para CSS box-shadow
  const boxShadow = useMemo(() => {
    const { offsetX, offsetY, blur, opacity } = shadowProps;
    if (opacity === 0) return 'none';
    return `${offsetX}px ${offsetY}px ${blur}px rgba(0, 0, 0, ${opacity})`;
  }, [shadowProps]);

  // Calcular posição do sol no arco (0-100%)
  const sunArcPosition = useMemo(() => {
    // Mapear hora para posição no arco (6h = 0%, 12h = 50%, 18h = 100%)
    const normalizedHour = Math.max(0, Math.min(24, hour));
    
    // Arco vai de 6h (nascer) a 18h (pôr)
    if (normalizedHour < 6) return -10; // Abaixo do horizonte (esquerda)
    if (normalizedHour > 18) return 110; // Abaixo do horizonte (direita)
    
    // 6h = 0%, 12h = 50%, 18h = 100%
    return ((normalizedHour - 6) / 12) * 100;
  }, [hour]);

  // Calcular altura do sol no arco baseado na elevação
  const sunArcHeight = useMemo(() => {
    const { elevation } = solarPosition;
    
    // Se sol está abaixo do horizonte
    if (elevation < 0) return 100; // Posição baixa (invisível)
    
    // Normalizar elevação (0° = 100% baixo, 90° = 0% alto)
    // Invertido porque Y cresce para baixo no CSS
    return 100 - (elevation / 90) * 100;
  }, [solarPosition]);

  const formatTime = (h) => `${h.toString().padStart(2, '0')}:00`;

  const getSunEmoji = () => {
    if (hour >= 6 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 18) return '☀️';
    if (hour >= 18 && hour < 20) return '🌇';
    return '🌙';
  };

  const isSunVisible = hour >= 6 && hour <= 18;

  return (
    <div className="container">
      <div className="header">
        <h1>☀️ Solar Shadows</h1>
        <p>Sombras dinâmicas baseadas na posição real do sol</p>
      </div>

      {/* Visualização do arco solar */}
      <div className="sun-arc-container">
        <svg className="sun-arc" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
          {/* Horizonte */}
          <line x1="0" y1="100" x2="400" y2="100" stroke="#ffffff40" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Arco do céu */}
          <path
            d="M 50 100 Q 200 20 350 100"
            fill="none"
            stroke="#ffffff20"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* Marcadores de hora */}
          <text x="50" y="115" fill="#ffffff80" fontSize="12" textAnchor="middle">6h</text>
          <text x="200" y="115" fill="#ffffff80" fontSize="12" textAnchor="middle">12h</text>
          <text x="350" y="115" fill="#ffffff80" fontSize="12" textAnchor="middle">18h</text>
          
          {/* Sol */}
          {isSunVisible && (
            <g>
              {/* Raios do sol */}
              <circle
                cx={50 + (sunArcPosition / 100) * 300}
                cy={100 - ((100 - sunArcHeight) / 100) * 80}
                r="20"
                fill="#FFD700"
                opacity="0.2"
              />
              {/* Corpo do sol */}
              <circle
                cx={50 + (sunArcPosition / 100) * 300}
                cy={100 - ((100 - sunArcHeight) / 100) * 80}
                r="12"
                fill="#FFD700"
              />
              {/* Linha indicadora */}
              <line
                x1={50 + (sunArcPosition / 100) * 300}
                y1={100 - ((100 - sunArcHeight) / 100) * 80 + 12}
                x2={50 + (sunArcPosition / 100) * 300}
                y2="100"
                stroke="#FFD70080"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </g>
          )}
        </svg>
        
        <div className="sun-info">
          <div className="sun-info-item">
            <span className="label">Azimute:</span>
            <span className="value">{solarPosition.azimuth.toFixed(1)}°</span>
          </div>
          <div className="sun-info-item">
            <span className="label">Elevação:</span>
            <span className="value">{solarPosition.elevation.toFixed(1)}°</span>
          </div>
        </div>
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
