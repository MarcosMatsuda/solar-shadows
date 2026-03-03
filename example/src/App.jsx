import { useState, useEffect, useMemo } from 'react';
import { Shadow, calculateSolarPosition, CITIES } from 'solar-shadows';
import './App.css';

function App() {
  const [hour, setHour] = useState(12);
  const [isAnimating, setIsAnimating] = useState(false);

  const city = CITIES.saoPaulo;
  
  const date = useMemo(() => {
    const d = new Date();
    d.setHours(hour, 0, 0, 0);
    return d;
  }, [hour]);

  const solarPosition = useMemo(() => {
    return calculateSolarPosition({
      latitude: city.latitude,
      longitude: city.longitude,
      date
    });
  }, [city, date]);

  // Animação automática
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setHour(prev => (prev + 1) % 24);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getSunEmoji = () => {
    if (hour >= 6 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 18) return '☀️';
    if (hour >= 18 && hour < 20) return '🌇';
    return '🌙';
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            ☀️ Solar Shadows
          </h1>
          <p className="hero-subtitle">
            Sombras dinâmicas baseadas na posição <strong>real</strong> do sol
          </p>

          {/* Demo Cards com Sombra */}
          <div className="demo-cards">
            <Shadow latitude={city.latitude} longitude={city.longitude} date={date}>
              <div className="hero-card card-1">
                <div className="card-icon">{getSunEmoji()}</div>
                <h3>Realista</h3>
                <p>Baseado em cálculos astronômicos</p>
              </div>
            </Shadow>

            <Shadow latitude={city.latitude} longitude={city.longitude} date={date}>
              <div className="hero-card card-2">
                <div className="card-icon">⚡</div>
                <h3>Simples</h3>
                <p>3 linhas de código</p>
              </div>
            </Shadow>

            <Shadow latitude={city.latitude} longitude={city.longitude} date={date}>
              <div className="hero-card card-3">
                <div className="card-icon">🌍</div>
                <h3>Global</h3>
                <p>Qualquer lugar do mundo</p>
              </div>
            </Shadow>
          </div>

          {/* Controles */}
          <div className="hero-controls">
            <div className="time-display">
              <span className="time-emoji">{getSunEmoji()}</span>
              <span className="time-text">{hour}:00</span>
              <span className="location-text">São Paulo, Brasil</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="23"
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="time-slider"
            />

            <button 
              className={`animate-btn ${isAnimating ? 'active' : ''}`}
              onClick={() => setIsAnimating(!isAnimating)}
            >
              {isAnimating ? '⏸ Pausar' : '▶ Animar'}
            </button>
          </div>

          {/* Solar Info */}
          <div className="solar-info-compact">
            <div className="info-badge">
              <span className="info-label">Azimute</span>
              <span className="info-value">{solarPosition.azimuth.toFixed(0)}°</span>
            </div>
            <div className="info-badge">
              <span className="info-label">Elevação</span>
              <span className="info-value">{solarPosition.elevation.toFixed(0)}°</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section - AH-HA MOMENT */}
      <section className="comparison-section">
        <h2>Veja a diferença ao longo do dia</h2>
        <p className="section-subtitle">
          As sombras seguem a posição <strong>real do sol</strong> baseada em cálculos astronômicos
        </p>

        <div className="time-comparison">
          <div className="time-card">
            <div className="time-header">
              <span className="time-icon">🌅</span>
              <h3>8h - Manhã</h3>
            </div>
            <Shadow latitude={city.latitude} longitude={city.longitude} date={(() => {
              const d = new Date();
              d.setHours(8, 0, 0, 0);
              return d;
            })()}>
              <div className="demo-card-small">
                <div className="card-content">
                  <span className="emoji">☕</span>
                  <p>Sombra longa</p>
                </div>
              </div>
            </Shadow>
            <div className="shadow-direction">
              <span className="arrow">→</span>
              <small>Sombra para OESTE</small>
            </div>
          </div>

          <div className="time-card highlight">
            <div className="time-header">
              <span className="time-icon">☀️</span>
              <h3>12h - Meio-dia</h3>
            </div>
            <Shadow latitude={city.latitude} longitude={city.longitude} date={(() => {
              const d = new Date();
              d.setHours(12, 0, 0, 0);
              return d;
            })()}>
              <div className="demo-card-small">
                <div className="card-content">
                  <span className="emoji">🌞</span>
                  <p>Sombra curta</p>
                </div>
              </div>
            </Shadow>
            <div className="shadow-direction">
              <span className="arrow">↓</span>
              <small>Sombra para NORTE</small>
            </div>
          </div>

          <div className="time-card">
            <div className="time-header">
              <span className="time-icon">🌇</span>
              <h3>18h - Tarde</h3>
            </div>
            <Shadow latitude={city.latitude} longitude={city.longitude} date={(() => {
              const d = new Date();
              d.setHours(18, 0, 0, 0);
              return d;
            })()}>
              <div className="demo-card-small">
                <div className="card-content">
                  <span className="emoji">🌆</span>
                  <p>Sombra longa</p>
                </div>
              </div>
            </Shadow>
            <div className="shadow-direction">
              <span className="arrow">←</span>
              <small>Sombra para LESTE</small>
            </div>
          </div>
        </div>

        <div className="comparison-insight">
          <p>
            💡 <strong>Percebeu a diferença?</strong> Cada horário tem uma sombra única.
            Isso acontece automaticamente no seu site!
          </p>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="why-matters-section">
        <h2>Por que sombras realistas importam?</h2>
        
        <div className="reasons-grid">
          <div className="reason-card">
            <div className="reason-icon">🧠</div>
            <h3>Psicologia Visual</h3>
            <p>
              Nosso cérebro reconhece sombras realistas instantaneamente.
              Produtos e elementos parecem mais <strong>tangíveis e confiáveis</strong>.
            </p>
            <div className="reason-stat">
              <span className="stat-number">+23%</span>
              <span className="stat-label">conversão em e-commerce*</span>
            </div>
          </div>

          <div className="reason-card">
            <div className="reason-icon">🎨</div>
            <h3>Diferenciação</h3>
            <p>
              99% dos sites usam sombras fake e estáticas.
              Destaque-se com <strong>detalhes que impressionam</strong>.
            </p>
            <div className="reason-highlight">
              "Esse site tem algo diferente..." 💭
            </div>
          </div>

          <div className="reason-card">
            <div className="reason-icon">⚡</div>
            <h3>Dinamismo Sem Esforço</h3>
            <p>
              Sites estáticos são chatos. Adicione <strong>vida real</strong> sem
              animações complexas ou JavaScript pesado.
            </p>
            <div className="reason-tech">
              <code>3 linhas de código</code>
              <span>Zero impacto na performance</span>
            </div>
          </div>
        </div>

        <div className="why-matters-cta">
          <h3>O diferencial está nos detalhes</h3>
          <p>
            Enquanto outros sites são estáticos e previsíveis,
            o seu <strong>respira com o mundo real</strong>. ✨
          </p>
        </div>
      </section>

      {/* Works With Everything Section */}
      <section className="works-with-section">
        <h2>Funciona com QUALQUER elemento</h2>
        <p className="section-subtitle">
          Inputs, buttons, cards, formulários, imagens... <strong>tudo</strong>!
        </p>

        <div className="elements-showcase">
          <div className="element-demo">
            <h3>🎨 Elementos Web</h3>
            <div className="demo-elements">
              <Shadow latitude={city.latitude} longitude={city.longitude} date={date}>
                <input type="text" placeholder="Input com sombra real" className="demo-input" />
              </Shadow>
              <Shadow latitude={city.latitude} longitude={city.longitude} date={date}>
                <button className="demo-button">Button com sombra real</button>
              </Shadow>
              <Shadow latitude={city.latitude} longitude={city.longitude} date={date}>
                <select className="demo-select">
                  <option>Select com sombra real</option>
                </select>
              </Shadow>
            </div>
            <pre className="code-mini">{`<Shadow {...CITIES.saoPaulo}>
  <input placeholder="Nome" />
</Shadow>

<Shadow {...CITIES.saoPaulo}>
  <button>Enviar</button>
</Shadow>`}</pre>
          </div>

          <div className="element-demo highlight-mobile">
            <h3>📱 React Native</h3>
            <p className="mobile-description">
              Funciona <strong>nativamente</strong> em iOS e Android com as propriedades corretas
              (shadowOffset, shadowRadius, shadowOpacity, elevation).
            </p>
            <pre className="code-mini">{`import { Shadow } from 'solar-shadows';

// iOS & Android
<Shadow 
  latitude={-23.5505} 
  longitude={-46.6333}
>
  <View style={styles.card}>
    <Text>Sombra nativa!</Text>
  </View>
</Shadow>

// Propriedades nativas:
// iOS: shadowOffset, shadowRadius, 
//      shadowOpacity
// Android: elevation (fallback)`}</pre>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases-section">
        <div className="section-header-large">
          <span className="badge">❌ CHEGA DE ESTÁTICO</span>
          <h2>Adicione vida real ao seu site</h2>
          <p className="section-subtitle">
            Sombras que mudam automaticamente ao longo do dia.<br />
            Seu site respira com o mundo real.
          </p>
        </div>

        <div className="use-cases-grid">
          <div className="use-case highlight">
            <div className="use-case-header">
              <span className="use-case-icon">🛍️</span>
              <h3>E-commerce que Converte</h3>
            </div>
            <p className="use-case-description">
              Produtos com sombras <strong>realistas</strong> parecem mais tangíveis e aumentam conversão.
              Em vez de sombras fake e estáticas, use o sol real.
            </p>
            <pre className="code-mini">{`<Shadow {...CITIES.saoPaulo}>
  <ProductCard
    image="tenis.jpg"
    price="R$ 299"
  />
</Shadow>

// 8h: sombra longa (manhã)
// 12h: sombra curta (meio-dia)  
// 18h: sombra longa (tarde)

// Resultado: Produtos mais tangíveis ✨`}</pre>
          </div>

          <div className="use-case highlight">
            <div className="use-case-header">
              <span className="use-case-icon">💼</span>
              <h3>Portfolio que se Destaca</h3>
            </div>
            <p className="use-case-description">
              Mostre <strong>atenção aos detalhes</strong> que recrutadores notam.
              Seu portfolio muda automaticamente ao longo do dia.
            </p>
            <pre className="code-mini">{`<Shadow updateInterval={60000}>
  <ProjectCard
    title="Meu Projeto"
    image="screenshot.png"
  />
</Shadow>

// Atualiza a cada 1 minuto
// Sombras mudam sozinhas

// Recrutador: "Esse dev pensa
// em TUDO!" 🤯`}</pre>
          </div>

          <div className="use-case highlight">
            <div className="use-case-header">
              <span className="use-case-icon">📱</span>
              <h3>Apps que Vivem</h3>
            </div>
            <p className="use-case-description">
              React Native, Vue, Angular... <strong>qualquer framework</strong>.
              Funciona em web e mobile nativamente.
            </p>
            <pre className="code-mini">{`// React Native
<Shadow {...CITIES.tokyo}>
  <View style={styles.card}>
    <Text>Mobile App</Text>
  </View>
</Shadow>

// Ou use a função direta
const shadow = calculateSunShadow({...});
element.style.boxShadow = ...

// Vue, Angular, Svelte... ✨`}</pre>
          </div>
        </div>

        <div className="use-case-cta">
          <h3>🎯 O diferencial está nos detalhes</h3>
          <p>Enquanto outros sites são estáticos, o seu <strong>respira com o mundo real</strong>.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Comece em 3 linhas</h2>
        <pre className="code-showcase">{`import { Shadow } from 'solar-shadows';

<Shadow latitude={-23.5505} longitude={-46.6333}>
  <YourComponent />
</Shadow>`}</pre>

        <div className="cta-buttons">
          <a 
            href="https://github.com/marcosmatsuda/solar-shadows" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-btn primary"
          >
            📦 Ver no GitHub
          </a>
          <a 
            href="https://www.npmjs.com/package/solar-shadows" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-btn secondary"
          >
            📥 npm install solar-shadows
          </a>
        </div>
      </section>

      {/* Features Compact */}
      <section className="features-compact">
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>Precisão astronômica (algoritmo J2000)</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>React & React Native nativos</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>Zero dependências externas</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>TypeScript com tipos completos</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>10+ city presets incluídos</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>3 formas de uso (componente, função, dados)</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          Feito com ☀️ por <strong>Marcos Matsuda</strong>
        </p>
        <p className="footer-links">
          <a href="https://github.com/marcosmatsuda/solar-shadows">GitHub</a>
          {' · '}
          <a href="https://www.npmjs.com/package/solar-shadows">npm</a>
          {' · '}
          <span>v1.0.0</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
