#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

USUARIO="rafaeel147-sketch"
REPO="antes-do-primeiro-gole"
API="https://api.github.com"
PASTA="$(cd "$(dirname "$0")" && pwd)"

echo "Publicador automático — Antes do Primeiro Gole"
printf "Cole um token NOVO do GitHub (ficará oculto): "
IFS= read -r -s TOKEN
echo

if [ -z "$TOKEN" ]; then
  echo "Token não informado."
  exit 1
fi

limpar() {
  TOKEN=""
  unset TOKEN GITHUB_TOKEN GIT_ASKPASS
  [ -n "${ASKPASS:-}" ] && rm -f "$ASKPASS"
}
trap limpar EXIT INT TERM
export GITHUB_TOKEN="$TOKEN"

cabecalhos=(
  -H "Authorization: Bearer $TOKEN"
  -H "Accept: application/vnd.github+json"
  -H "X-GitHub-Api-Version: 2022-11-28"
)

STATUS="$(curl -sS -o /tmp/apg-repo.json -w '%{http_code}' \
  "${cabecalhos[@]}" "$API/repos/$USUARIO/$REPO")"

if [ "$STATUS" = "404" ]; then
  echo "Criando o repositório público $REPO..."
  STATUS="$(curl -sS -o /tmp/apg-create.json -w '%{http_code}' -X POST \
    "${cabecalhos[@]}" "$API/user/repos" \
    -d '{"name":"antes-do-primeiro-gole","description":"Site do projeto Antes do Primeiro Gole","private":false}')"
  if [ "$STATUS" != "201" ]; then
    echo "Não foi possível criar o repositório (HTTP $STATUS)."
    exit 1
  fi
elif [ "$STATUS" != "200" ]; then
  echo "Falha ao acessar o GitHub (HTTP $STATUS). Use um token novo e válido."
  exit 1
fi

cd "$PASTA"
git config --global --add safe.directory "$PASTA" 2>/dev/null || true

URL="https://github.com/$USUARIO/$REPO.git"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$URL"
else
  git remote add origin "$URL"
fi

ASKPASS="$(mktemp)"
printf '%s\n' \
  '#!/data/data/com.termux/files/usr/bin/sh' \
  'case "$1" in' \
  '  *Username*) printf "%s" "rafaeel147-sketch" ;;' \
  '  *Password*) printf "%s" "$GITHUB_TOKEN" ;;' \
  'esac' > "$ASKPASS"
chmod 700 "$ASKPASS"
export GIT_ASKPASS="$ASKPASS"
export GIT_TERMINAL_PROMPT=0

echo "Enviando o site para o GitHub..."
git push -u origin main

echo "Tentando ativar o GitHub Pages..."
STATUS="$(curl -sS -o /tmp/apg-pages.json -w '%{http_code}' -X POST \
  "${cabecalhos[@]}" "$API/repos/$USUARIO/$REPO/pages" \
  -d '{"source":{"branch":"main","path":"/"}}')"

echo
if [ "$STATUS" = "201" ] || [ "$STATUS" = "204" ] || [ "$STATUS" = "409" ]; then
  echo "Concluído. O site ficará disponível em:"
  echo "https://$USUARIO.github.io/$REPO/"
  echo "A primeira publicação pode levar alguns minutos."
else
  echo "Site enviado, mas o Pages não foi ativado (HTTP $STATUS)."
  echo "Ative em: https://github.com/$USUARIO/$REPO/settings/pages"
fi
