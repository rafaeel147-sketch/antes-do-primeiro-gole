# Antes do Primeiro Gole — site institucional

Site estático em HTML, CSS e JavaScript puro, preparado para publicação por **Direct Upload no Cloudflare Pages**.

## Estrutura

```text
antes-do-primeiro-gole/
├── index.html
├── styles.css
├── script.js
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── _headers
├── 404.html
├── README.md
├── assets/
│   ├── livro-cover.png
│   ├── cartilha-cover.png
│   ├── autor.jpg
│   ├── og-image.jpg
│   └── detalhes/
└── documentos/
    └── cartilha-antes-do-primeiro-gole.pdf
```

## 1. Substituir as capas

Os arquivos reais já foram incluídos:

- `assets/livro-cover.png`
- `assets/cartilha-cover.png`

Para atualizar uma capa, substitua o arquivo mantendo **exatamente o mesmo nome**. Prefira PNG ou WebP nítido, em orientação vertical.

## 2. Incluir a foto do autor

`assets/autor.jpg` é uma imagem provisória.

Substitua por uma foto autorizada de Rafael, mantendo o nome `autor.jpg`. Recomendação:

- proporção aproximada: 5:6;
- mínimo: 1000 × 1200 px;
- fundo simples;
- boa iluminação;
- não usar fotografia de outras pessoas sem autorização.

Depois, ajuste o texto alternativo no `index.html`. Procure por:

```html
alt="Espaço reservado para fotografia de Rafael Leandro de Carvalho"
```

## 3. Atualizar a cartilha em PDF

O arquivo foi incluído em:

`documentos/cartilha-antes-do-primeiro-gole.pdf`

Para publicar uma versão revisada, substitua o PDF mantendo o mesmo nome. Assim, todos os botões continuam funcionando.

O livro digital está em:

`documentos/livro-antes-do-primeiro-gole.pdf`

Para atualizá-lo, substitua o arquivo mantendo o mesmo nome.

## 4. Configurar e-mail e WhatsApp

Abra `script.js` e altere estas linhas:

```js
const CONTACT_EMAIL = "contato@seudominio.com.br";
const WHATSAPP_NUMBER = "5562999999999";
```

No WhatsApp, use somente números, com código do país e DDD. Exemplo fictício:

```js
const WHATSAPP_NUMBER = "5562999999999";
```

Depois de configurar, remova ou atualize o aviso “Contato em configuração” no `index.html`.

## 5. Testar localmente

### Forma simples

Abra `index.html` no navegador. A maior parte do site funcionará.

### Forma recomendada

Dentro da pasta, inicie um servidor local:

```bash
python -m http.server 8000
```

Depois acesse:

`http://localhost:8000`

Isso permite testar corretamente o PDF e o comportamento de arquivos.

## 6. Compactar para ZIP

Compacte **o conteúdo da pasta**, preservando a estrutura.

No Windows:

1. abra a pasta `antes-do-primeiro-gole`;
2. selecione todos os arquivos e pastas;
3. clique com o botão direito;
4. escolha **Enviar para → Pasta compactada**.

Confirme que `index.html` está na raiz do ZIP, e não dentro de duas pastas com o mesmo nome.

## 7. Publicar no Cloudflare Pages por Direct Upload

1. crie ou acesse sua conta Cloudflare;
2. abra **Workers & Pages**;
3. escolha **Create application**;
4. selecione **Pages**;
5. escolha **Upload assets / Direct Upload**;
6. dê um nome ao projeto, por exemplo `antes-do-primeiro-gole`;
7. envie a pasta ou o ZIP;
8. confirme a publicação.

O endereço inicial ficará parecido com:

`https://antes-do-primeiro-gole.pages.dev`

## 8. Atualizar o site futuramente

Faça as alterações nos arquivos locais, teste e envie uma nova versão no mesmo projeto do Cloudflare Pages.

Antes de cada atualização, guarde uma cópia do ZIP anterior.

## 9. Conectar domínio próprio

Quando houver um domínio:

1. abra o projeto no Cloudflare Pages;
2. entre em **Custom domains**;
3. escolha **Set up a custom domain**;
4. informe o domínio;
5. siga a validação de DNS.

Depois, substitua o domínio provisório nos seguintes arquivos:

- `index.html`: canonical, Open Graph e JSON-LD;
- `robots.txt`;
- `sitemap.xml`.

## 10. Formulário

O formulário atual prepara uma mensagem por `mailto:` e não armazena dados.

Alternativas futuras:

- incorporar um Google Forms;
- usar Cloudflare Pages Functions;
- usar serviço de formulário compatível com a política de privacidade do projeto.

## 11. Cuidados institucionais

- Não incluir logotipos de Fiocruz, ANEPS, UFG, CAPS, Prefeitura, SECULT ou outra instituição sem autorização.
- Não afirmar parceria, aprovação ou financiamento antes de confirmação formal.
- A cartilha deve continuar identificada como material literário e educativo, não como tratamento.
- Preserve os créditos de autoria de Rafael Leandro de Carvalho.

## 12. Acessibilidade

O site inclui:

- navegação por teclado;
- link para pular ao conteúdo;
- foco visível;
- menu móvel acessível;
- perguntas frequentes em accordion;
- redução de movimento;
- textos alternativos;
- contraste forte;
- formulário com rótulos e mensagens de status.

Ao substituir imagens, mantenha textos alternativos objetivos.
