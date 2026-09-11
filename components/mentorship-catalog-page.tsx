import Link from "next/link";
import { ManagedMedia } from "@/components/managed-media";
import { dashboardSections } from "@/lib/dashboard-data";
import type { MentorshipRecord } from "@/lib/platform-types";

function lessonCount(item: MentorshipRecord) {
  return (Array.isArray(item.modules) ? item.modules : []).reduce((total, moduleItem) => {
    return total + (Array.isArray(moduleItem.lessons) ? moduleItem.lessons.length : 0);
  }, 0);
}

function mentorshipCover(item: MentorshipRecord) {
  const src = item.coverImage || item.image || "";
  if (!src || /admin-filipe|admin-felipe|mentorias-hero-real/i.test(src)) {
    return "/images/mentorias-hero-banner.svg";
  }
  return src;
}

function nextLessonLabel(item: MentorshipRecord) {
  const modules = Array.isArray(item.modules) ? item.modules : [];
  for (const moduleItem of modules) {
    const lessons = Array.isArray(moduleItem.lessons) ? moduleItem.lessons : [];
    if (lessons[0]) {
      return `${moduleItem.title} · ${lessons[0].title}`;
    }
  }
  return "Começar pelo primeiro módulo";
}

export function MentorshipCatalogPage({
  mentorships,
  selectedFilter = "Todas"
}: {
  mentorships: MentorshipRecord[];
  selectedFilter?: string;
}) {
  const filters = Array.from(new Set(["Todas", ...mentorships.map((item) => item.category).filter(Boolean)]));
  const activeFilter = filters.includes(selectedFilter) ? selectedFilter : "Todas";
  const visible =
    activeFilter === "Todas" ? mentorships : mentorships.filter((item) => item.category === activeFilter);
  const inProgress = mentorships.filter((item) => (item.progressPercent ?? 0) > 0);
  const featured = inProgress[0] ?? mentorships[0];
  const totalLessons = mentorships.reduce((total, item) => total + lessonCount(item), 0);
  const totalModules = mentorships.reduce(
    (total, item) => total + (Array.isArray(item.modules) ? item.modules.length : 0),
    0
  );

  return (
    <div className="mentoria-catalog">
      <section className="mentoria-catalog-hero">
        <ManagedMedia
          alt="Biblioteca de mentorias"
          sizeLabel="1600 x 640"
          src={featured ? mentorshipCover(featured) : "/images/mentorias-hero-banner.svg"}
          className="managed-media-fill"
        />
        <div className="mentoria-catalog-hero-copy">
          <span>Biblioteca premium</span>
          <h2>Mentorias para aprender e executar.</h2>
          <p>
            Escolha uma trilha, continue de onde parou e avance aula a aula. Cada curso abre com player, módulos e
            progresso visível.
          </p>
          {featured ? (
            <Link href={`/detalhes/mentorias/${featured.slug}`} className="hero-link-button">
              {(featured.progressPercent ?? 0) > 0 ? "Continuar mentoria" : "Começar agora"}
            </Link>
          ) : (
            <Link href="/mentorias" className="hero-link-button">
              Voltar para Mentorias
            </Link>
          )}
        </div>
      </section>

      <section className="cta-metrics-grid mentoria-catalog-metrics">
        <article className="cta-metric-card tone-blue">
          <span>Cursos</span>
          <strong>{String(mentorships.length).padStart(2, "0")}</strong>
          <small>Publicados para você</small>
        </article>
        <article className="cta-metric-card tone-green">
          <span>Em andamento</span>
          <strong>{String(inProgress.length).padStart(2, "0")}</strong>
          <small>Trilhas já iniciadas</small>
        </article>
        <article className="cta-metric-card tone-orange">
          <span>Aulas</span>
          <strong>{totalLessons}</strong>
          <small>Conteúdo disponível</small>
        </article>
        <article className="cta-metric-card tone-violet">
          <span>Módulos</span>
          <strong>{String(totalModules).padStart(2, "0")}</strong>
          <small>Estrutura das trilhas</small>
        </article>
      </section>

      {inProgress.length > 0 ? (
        <section className="mentoria-catalog-continue">
          <div className="mentoria-catalog-continue-head">
            <p>Continue aprendendo</p>
            <h3>Retome de onde você parou</h3>
          </div>
          <div className="mentoria-catalog-continue-grid">
            {inProgress.slice(0, 3).map((item) => (
              <Link key={item.id} href={`/detalhes/mentorias/${item.slug}`} className="mentoria-catalog-continue-card">
                <ManagedMedia
                  alt={item.title}
                  sizeLabel="1200 x 720"
                  src={mentorshipCover(item)}
                  className="managed-media-fill"
                />
                <div className="mentoria-catalog-continue-copy">
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                  <p>{nextLessonLabel(item)}</p>
                  <div className="mentoria-catalog-progress">
                    <i style={{ width: `${item.progressPercent}%` }} />
                  </div>
                  <small>{item.progressLabel || `${item.progressPercent}% concluído`}</small>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mentoria-catalog-board">
        <div className="mentoria-catalog-main">
          <div className="mentoria-catalog-toolbar">
            <div>
              <p>Catálogo completo</p>
              <h3>Todas as mentorias</h3>
            </div>
            <span>{visible.length} trilhas visíveis</span>
          </div>

          <div className="mentoria-filter-row" aria-label="Filtros de mentorias">
            {filters.map((filter) => {
              const isActive = filter === activeFilter;
              const href =
                filter === "Todas"
                  ? "/detalhes/mentorias"
                  : `/detalhes/mentorias?categoria=${encodeURIComponent(filter)}`;

              return (
                <Link key={filter} href={href} className={`mentoria-filter-chip${isActive ? " is-active" : ""}`}>
                  {filter}
                </Link>
              );
            })}
          </div>

          <div className="mentoria-library-grid">
            {visible.map((item) => {
              const modules = Array.isArray(item.modules) ? item.modules.length : 0;
              const lessons = lessonCount(item);
              const started = (item.progressPercent ?? 0) > 0;

              return (
                <article key={item.id} className="mentoria-library-card">
                  <div className="mentoria-card-media">
                    <ManagedMedia
                      alt={item.title}
                      sizeLabel="1600 x 900"
                      src={mentorshipCover(item)}
                      className="managed-media-fill"
                    />
                    <div className="mentoria-card-media-overlay">
                      <span className={`mentoria-card-category accent-${item.accent}`}>{item.category}</span>
                      <span className="mentoria-card-badge">{item.badge || (started ? "Em andamento" : "Nova")}</span>
                    </div>
                  </div>
                  <div className="mentoria-card-body">
                    <div className="mentoria-card-heading">
                      <strong>{item.title}</strong>
                      <p>{item.shortDescription || item.subtitle}</p>
                    </div>
                    <div className="mentoria-card-mentor">
                      <ManagedMedia
                        alt={item.mentorName}
                        sizeLabel="64 x 64"
                        src={item.mentorAvatar}
                        className="managed-media-mentor-avatar"
                        tone="soft"
                      />
                      <div>
                        <span>Instrutor</span>
                        <strong>{item.mentorName}</strong>
                      </div>
                    </div>
                    <div className="mentoria-card-stats">
                      <article className="mentoria-stat-chip">
                        <span>Módulos</span>
                        <strong>{modules}</strong>
                      </article>
                      <article className="mentoria-stat-chip">
                        <span>Aulas</span>
                        <strong>{lessons}</strong>
                      </article>
                      <article className="mentoria-stat-chip">
                        <span>Duração</span>
                        <strong>{item.duration || "--"}</strong>
                      </article>
                      <article className="mentoria-stat-chip">
                        <span>Nível</span>
                        <strong>{item.level || "--"}</strong>
                      </article>
                    </div>
                    {started ? (
                      <div className="mentoria-card-progress">
                        <div className="mentoria-card-progress-head">
                          <span>Progresso</span>
                          <strong>{item.progressLabel || `${item.progressPercent}% concluído`}</strong>
                        </div>
                        <div className="mentoria-card-progress-bar" aria-hidden="true">
                          <div style={{ width: `${item.progressPercent}%` }} />
                        </div>
                      </div>
                    ) : null}
                    <Link href={`/detalhes/mentorias/${item.slug}`} className="mentoria-card-action">
                      {started ? "Continuar mentoria" : "Ver mentoria"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="mentoria-catalog-side">
          <div className="cta-side-panel">
            <div className="cta-side-head">
              <p>Próximo passo</p>
              <h3>{featured ? featured.title : "Comece uma trilha"}</h3>
            </div>
            {featured ? (
              <>
                <p className="mentoria-catalog-side-lead">
                  {featured.shortDescription || featured.subtitle}
                </p>
                <ul className="cta-note-list">
                  {(Array.isArray(featured.modules) ? featured.modules : []).slice(0, 4).map((moduleItem, index) => (
                    <li key={moduleItem.id}>
                      Módulo {index + 1} — {moduleItem.title}
                    </li>
                  ))}
                  <li>Concluir aulas libera pontos e ranking</li>
                </ul>
                <Link href={`/detalhes/mentorias/${featured.slug}`} className="hero-link-button">
                  Abrir curso
                </Link>
              </>
            ) : (
              <p className="mentoria-catalog-side-lead">Nenhuma mentoria publicada no momento.</p>
            )}
          </div>

          <div className="cta-side-panel">
            <div className="cta-side-head">
              <p>Como usar</p>
              <h3>O que você faz aqui</h3>
            </div>
            <ul className="cta-note-list">
              <li>Filtre por categoria e abra a mentoria completa.</li>
              <li>Assista a aula, marque como concluída e avance o módulo.</li>
              <li>O progresso aparece de novo em Mentorias e no ranking.</li>
            </ul>
            <Link href={`/${dashboardSections.mentorias.key}`} className="hero-link-button">
              Voltar para Mentorias
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
