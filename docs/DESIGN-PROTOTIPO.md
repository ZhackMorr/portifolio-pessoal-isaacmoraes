# Protótipo visual

O protótipo foi criado no **Claude Design**, como um canvas com três pranchas. Os arquivos desta pasta (`design/`) são as fontes dessas pranchas.

## Pranchas

| Arquivo | Prancha | Dimensões no canvas | Observação |
| --- | --- | --- | --- |
| `Main.dc.html` | Desktop — Home | 1440 × 4500 | Página fluida e interativa |
| `Mobile.dc.html` | Mobile — Home | 390 × 7300 | Versão de 390 px |
| `Direcao.dc.html` | Direção visual | 1280 × 960 | Fontes, cores, efeitos e movimento |
| `canvas.json` | Índice | — | Posição, tamanho e opções das pranchas |

> As alturas das pranchas são estimadas e podem ser ajustadas no canvas.

## Interações da prancha Desktop

- Troca de projeto na lista (estado local);
- Ampliação das imagens do projeto 01 em tela cheia (clique para abrir e fechar);
- Links do menu com rolagem suave;
- Cartões com efeitos de hover.

## Tweaks configuráveis

- Cor de acento principal (padrão `#FFA800`);
- Cor de acento secundária (padrão `#00FFE0`).

## Imagens e endereços do canvas

No canvas, as imagens são referenciadas por endereços `/_blob/<id>`. Os arquivos originais estão em `assets/projeto-01-people-analytics/`.

| Arquivo | Endereço no canvas |
| --- | --- |
| `headcount-efetivos.png` | `/_blob/172fd3d5f834a771ea02b672f6645431` |
| `treinamentos-onboarding.png` | `/_blob/ce7cb8d9a3adce8d0726dcb3f154777f` |
| `vagas-trabalhadas.png` | `/_blob/41d1e1c81303856394eebde8d7a4d702` |

## Por que os arquivos não abrem direto no navegador

Os arquivos `.dc.html` usam o formato do canvas: referenciam um `support.js` que só existe no ambiente do Claude Design e usam marcações próprias (`<x-dc>`, `<sc-for>`, `<sc-if>`). Eles servem como **fonte versionada e documentação** do protótipo. A versão navegável será gerada na implementação definitiva.

## Como evoluir o protótipo

1. Abra o canvas no Claude Design;
2. Peça ou faça os ajustes desejados;
3. Atualize os arquivos desta pasta e registre a mudança no [`CHANGELOG`](../CHANGELOG.md).
