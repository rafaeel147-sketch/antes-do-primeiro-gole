# Antes do Primeiro Gole — entrada antiga e arquivo histórico

O site principal é **https://rafaeel147-sketch.github.io/antes-do-primeiro-gole1/**,
mantido no repositório `rafaeel147-sketch/antes-do-primeiro-gole1`.
Este repositório conserva a entrada antiga, a versão inicial e os PDFs em seus endereços originais.

## Mapa de URLs

| URL | Função após a publicação deste PR |
| --- | --- |
| `/antes-do-primeiro-gole/` e `/antes-do-primeiro-gole/index.html` | Entrada que encaminha para o site principal; canonical e Open Graph apontam para `/antes-do-primeiro-gole1/`. |
| `/antes-do-primeiro-gole/arquivo/` | Versão inicial identificada como histórica, com canonical próprio e links para o site principal e o RAPS no Bolso. |
| `/antes-do-primeiro-gole/documentos/livro-antes-do-primeiro-gole.pdf` | Livro preservado no mesmo endereço e com os mesmos bytes. |
| `/antes-do-primeiro-gole/documentos/cartilha-antes-do-primeiro-gole.pdf` | Cartilha preservada no mesmo endereço e com os mesmos bytes. |
| `/antes-do-primeiro-gole/sitemap.xml` | Lista somente o arquivo histórico, dentro do escopo deste diretório. |
| `/antes-do-primeiro-gole1/sitemap.xml` | Sitemap do site principal; permanece no outro repositório. |

## Preservação e implementação

- A versão histórica provém do `index.html` do commit `97e02be2d5f1be33a774c0e925d1d1ff85b584da`, de 14/07/2026.
- Seu texto, seções, IDs, formulário, diálogos e links de documentos foram preservados. Mudam o aviso histórico, os metadados e a resolução dos caminhos de recursos, porque a página passa a estar em um subdiretório.
- Os recursos do arquivo usam caminhos absolutos sob `/antes-do-primeiro-gole/`; não se usa `<base>`, para manter os links de fragmentos na própria página histórica.
- Os IDs antigos continuam acessíveis no arquivo, por exemplo `/antes-do-primeiro-gole/arquivo/#livro`. Favoritos com fragmentos na antiga entrada não são remapeados automaticamente para páginas do site principal.
- `assets/`, `documentos/`, `styles.css`, `script.js`, `favicon.svg`, `404.html` e os demais arquivos originais permanecem intactos.
- A entrada usa `meta refresh` de zero segundos e link manual. Funciona sem JavaScript. É um redirecionamento no HTML: o GitHub Pages pode continuar respondendo HTTP 200, não HTTP 301/308.
- O Google documenta o `meta refresh` imediato como sinal de redirecionamento permanente: https://developers.google.com/search/docs/crawling-indexing/301-redirects
- Não há `noindex` ou bloqueio de rastreamento, nem alterações no conteúdo clínico ou jurídico.
- O `robots.txt` neste subdiretório não controla a raiz do host `github.io`; a alteração não atribui a ele essa capacidade.

## Verificação e publicação

Antes de abrir o PR, verificar: destino público HTTP 200 com canonical próprio, alinhamento de refresh/canonical/Open Graph, sitemap válido e restrito ao arquivo, preservação do conteúdo original, IDs e recursos resolvidos, e PDFs sem alteração de bytes.

O PR é uma proposta de mudança. Enquanto não for incorporado ao `main` e publicado pelo GitHub Pages, o comportamento público permanece o anterior.

Depois da publicação, conferir as duas formas da entrada antiga, o arquivo histórico, CSS/JavaScript/imagens e os dois PDFs. Não remover o repositório ou os recursos originais: o arquivo e links distribuídos dependem deles.

Verificação de propriedade, envio de sitemap, páginas indexadas, canonical escolhido pelo Google, tráfego, baseline e efeitos deste redirecionamento ficam **NÃO DETERMINADOS** sem acesso ao Search Console.

Relacionado a: https://github.com/rafaeel147-sketch/antes-do-primeiro-gole1/issues/12

## Reversão

Reverter o commit do PR restaura a entrada e o sitemap anteriores. Não é necessário restaurar PDFs ou recursos, pois eles não são alterados.
