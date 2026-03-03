# 🚀 Deploy do Exemplo para GitHub Pages

## 📋 Pré-requisitos

- Repositório no GitHub
- Node.js instalado
- Git configurado

## 🎯 Deploy Manual (Primeira vez)

### 1. Instalar dependências (se ainda não instalou)

```bash
cd example
npm install
```

### 2. Fazer o deploy

```bash
cd example
npm run deploy
```

Isso vai:
- ✅ Fazer build do projeto (`npm run build`)
- ✅ Criar branch `gh-pages` automaticamente
- ✅ Fazer push para o GitHub
- ✅ Ativar GitHub Pages

### 3. Configurar GitHub Pages (primeira vez)

1. Vá para: `https://github.com/marcosmatsuda/solar-shadows/settings/pages`
2. Em **Source**, selecione: `gh-pages` branch
3. Clique em **Save**
4. Aguarde ~2 minutos

### 4. Acessar o site

```
https://marcosmatsuda.github.io/solar-shadows
```

---

## 🔄 Atualizações Futuras

Sempre que quiser atualizar o exemplo:

```bash
cd example
npm run deploy
```

Pronto! GitHub Pages atualiza automaticamente em ~2 minutos.

---

## 🤖 Deploy Automático (Opcional)

O arquivo `.github/workflows/deploy-example.yml` já está configurado.

**Como funciona:**
- A cada push na branch `master` que altere `example/` ou `src/`
- GitHub Actions faz deploy automático
- Você não precisa rodar `npm run deploy` manualmente

**Para ativar:**
1. Faça push do arquivo `.github/workflows/deploy-example.yml`
2. GitHub Actions vai rodar automaticamente
3. Exemplo sempre atualizado! ✨

---

## 🔒 Segurança

✅ Nenhum dado sensível no código  
✅ Apenas código público  
✅ Links para GitHub e npm (públicos)  
✅ Sem API keys ou tokens  

---

## 🐛 Troubleshooting

### Erro: "Permission denied"
```bash
# Configure o Git:
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Erro: "gh-pages not found"
```bash
# Reinstale:
npm install --save-dev gh-pages
```

### Página 404
1. Verifique se o branch `gh-pages` foi criado
2. Verifique as configurações em Settings → Pages
3. Aguarde 2-5 minutos após o deploy

---

## 📝 Comandos Resumidos

```bash
# Deploy manual (primeira vez e atualizações)
cd example
npm run deploy

# Verificar se funcionou
# Aguarde 2 minutos e acesse:
# https://marcosmatsuda.github.io/solar-shadows
```

---

## 🎉 Pronto!

Seu exemplo estará disponível publicamente em:

**https://marcosmatsuda.github.io/solar-shadows** 🌟
