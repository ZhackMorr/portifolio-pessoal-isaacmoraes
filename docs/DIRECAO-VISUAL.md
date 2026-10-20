# Direção visual

Este documento registra as decisões visuais do portfólio, para que a implementação definitiva mantenha a mesma identidade.

## Conceito

Um portfólio **escuro, editorial e com textura**, pensado para dados. A referência inicial foi um brand board com hero em mesh gradient, contraste entre sans e serifa itálica e cartões arredondados. A identidade aqui é original: as cores têm função analítica e os elementos de gráfico fazem parte da composição.

## Leitura da referência

| Aspecto | Observação | Como foi adaptado |
| --- | --- | --- |
| Layout | Cartão hero horizontal, cantos muito arredondados, sombra longa | Hero em cartão de 32 px de raio, com mesh e grade de dados |
| Cores | Navy quase preto, azul-cobalto desfocado, âmbar e turquesa | Âmbar para "insight" e turquesa para métricas |
| Tipografia | Sans geométrica, entrelinha justa, uma palavra em serifa itálica | Manrope + Playfair Display itálico em cada título |
| Efeitos | Gradiente desfocado com grão | Mesh em movimento lento e grão fixo por cima |
| Espaçamento | Muito respiro, hierarquia por escala | Seções com `clamp(72px, 10vw, 140px)` de respiro vertical |

## Paleta

| Token | Hex | Uso |
| --- | --- | --- |
| `--bg` | `#0A0E1A` | Fundo da página |
| `--surface` | `#10162A` | Cartões e painéis |
| `--deep` | `#05070F` | Hero, contato, áreas de imagem |
| `--text` | `#F4F6FB` | Texto principal |
| `--text-2` | `#B7C3DE` | Descrições |
| `--text-3` | `#9DB0D3` | Texto de apoio |
| `--text-4` | `#8FA0C2` | Legendas |
| `--label` | `#6F86B4` | Rótulos de seção |
| `--accent` | `#FFA800` | Acento principal (insight) |
| `--accent-2` | `#00FFE0` | Acento secundário (métrica) |
| `--mesh` | `#2D6AD8` | Gradiente do mesh |
| `--chart` | `#5B8DEF` | Barras e gráficos |

Os dois acentos são configuráveis no protótipo (Tweaks), com alternativas como `#FF7A45`, `#F5D547`, `#5BE7A9` e `#7CC4FF`.

## Tipografia

| Papel | Fonte | Peso | Tamanho (desktop) |
| --- | --- | --- | --- |
| Título do hero | Manrope | 500 | `clamp(56px, 10.5vw, 168px)` |
| Título de seção | Manrope | 500 | `clamp(36px, 5.4vw, 80px)` |
| Palavra de destaque | Playfair Display itálico | 500 | igual ao título |
| Texto corrido | Manrope | 400–500 | 15–18 px |
| Rótulos | Manrope | 700 | 11–12 px, caixa-alta, `letter-spacing: .16em` |

Entrelinha dos títulos entre `.94` e `1.02`, com `letter-spacing` negativo (`-.04em` a `-.045em`).

## Formas, bordas e sombras

| Elemento | Raio |
| --- | --- |
| Hero e bloco de contato | 32 px |
| Painel de projeto | 28 px |
| Cartões | 24 px |
| Imagens | 20 px |
| Botões e etiquetas | 999 px (pílula) |

Bordas de `1px` em `rgba(255,255,255,.08)` a `.12`. O hero usa sombra longa e suave (`0 50px 120px rgba(0,0,0,.55)`).

## Efeitos

- **Mesh gradient:** elementos circulares com `radial-gradient` e `filter: blur(40–60px)`, animados em deriva lenta.
- **Grão:** `feTurbulence` em SVG com `mix-blend-mode: overlay`.
- **Grade de dados:** linhas de 1 px a cada 72 px, com máscara radial.
- **Vidro:** cartão flutuante com `backdrop-filter: blur(18px)`.

## Movimento

| Efeito | Detalhe |
| --- | --- |
| Reveal do título | Máscara por linha, `1.1s`, `cubic-bezier(.2,.8,.2,1)` |
| Deriva do mesh | 16 s e 20 s, `alternate` |
| Barras e linhas | Crescem e se desenham ao entrar |
| Scroll reveal | `animation-timeline: view()` (progressive enhancement) |
| Hover | Elevação de 6 px e realce da borda em âmbar |
| Rolagem | `scroll-behavior: smooth` |
| Acessibilidade | `prefers-reduced-motion` desativa animações |

## Responsividade

- Container com largura máxima de 1360 px e gutters de `clamp(16px, 3vw, 40px)`.
- Mobile de referência: 390 px.
- Alvos de toque com pelo menos 44 px.
- Grades com `repeat(auto-fit, minmax(...))`.

## Acessibilidade

- Texto com contraste mínimo de 4,5:1 sobre o fundo;
- elementos interativos reais (`<a>`, `<button>`);
- `aria-label` em botões só com ícone e `alt` descritivo nas imagens;
- elementos decorativos com `aria-hidden="true"`.
