# Debug Session: vercel-server-crash
- **Status**: [OPEN]
- **Issue**: Aplicativo publicado na Vercel retorna Application error / server-side exception ao abrir a home (galettosistemaerp.vercel.app). Build compilou, porém runtime crasha com Digest 295590375.
- **Debug Server**: http://127.0.0.1:7777/event
- **Log File**: .dbg/trae-debug-log-vercel-server-crash.ndjson

## Reproduction Steps
1. Abrir `https://galettosistemaerp.vercel.app`
2. Observar Application error / página de erro da Vercel
3. Repetir alguns acessos para confirmar 5xx/exception consistente

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | Leitura/parse do PlatformDb JSON com erro de encoding ou caminho relativo diferente em serverless da Vercel | High | Low | Pending |
| B | `[section]` dinâmico aciona `sectionOrder.map` / seções que retornam referência circular ou dados nulos/inconsistentes | High | Low | Pending |
| C | Helper `getPlatformSnapshot()` ou dashboard seed dispara importação/carregamento de arquivo indisponível em runtime serverless | Medium | Low | Pending |
| D | Middleware/sessão/rota `/` redireciona ou valida algo com dependência ausente em produção (por exemplo variáveis de sessão, admin fallback) | Medium | Low | Pending |
| E | SSR de página com imagem externa (texto para imagem) ou `fetch` para service de imagem que falha em runtime | Low | Med | Pending |

## Log Evidence

### Pré-fix (build 27740df)
- Sintoma: Application error / server-side exception ao abrir home (`Digest: 295590375`).
- Build passa, mas runtime crasha na SSR.
- Hipótese A considerada forte baseada em análise estática: `mkdir/writeFile` em `ensureDbFile` contra FS read-only da Vercel.

### Instrumentação aplicada em d027130
- `lib/platform-store.ts`: `ensureDbFile`, `getPlatformDb`, `savePlatformDb` agora todos com try/catch em operações FS; `getPlatformDb` retorna `createPlatformSeed()` em memória se readFile/parse falhar (fallback seguro, sem throw).
- `lib/platform-content.ts`: coleções usam safe `Array.isArray(x) ? x.filter/map/reduce : []`; todo `buildUserDashboardSections` em try/catch com logs de entrada/saída.
- `components/dashboard.tsx`: `Dashboard()` agora valida shapes de `sections`, `publishedProducts`, `snapshot`; `clubOffers` e `couponRedemptions` são safe antes do `.filter`.
- `app/page.tsx`, `app/[section]/page.tsx`, `app/detalhes/[section]/page.tsx`: pontos de log em volta de params e render inicial.

### Post-fix (commit d02713095f9da603906d497ac3c0763980f468d6)
- [PENDENTE] Testar `https://galettosistemaerp.vercel.app` após novo deploy automático da Vercel.

## Verification Conclusion
[aguardando comparação pré/pós]
