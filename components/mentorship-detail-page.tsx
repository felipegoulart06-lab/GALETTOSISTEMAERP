"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import { Icon } from "@/components/ui-icon";
import type { MentorshipRecord } from "@/lib/platform-types";

const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
];

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg|m3u8)(\?|#|$)/i.test(url);
}

function mentorshipCover(item: MentorshipRecord) {
  const src = item.coverImage || item.image || "";
  if (!src || /admin-filipe|admin-felipe|mentorias-hero-real/i.test(src)) {
    return "/images/mentorias-hero-banner.svg";
  }
  return src;
}

export function MentorshipDetailPage({ mentorship }: { mentorship: MentorshipRecord }) {
  const modulesSafe = Array.isArray(mentorship.modules) ? mentorship.modules : [];
  const flatLessons = useMemo(
    () =>
      modulesSafe.flatMap((moduleItem, moduleIndex) =>
        (Array.isArray(moduleItem.lessons) ? moduleItem.lessons : []).map((lesson, lessonIndex) => ({
          ...lesson,
          moduleId: moduleItem.id,
          moduleTitle: moduleItem.title,
          index: modulesSafe
            .slice(0, moduleIndex)
            .reduce((total, current) => total + (Array.isArray(current.lessons) ? current.lessons.length : 0), 0) +
            lessonIndex
        }))
      ),
    [modulesSafe]
  );

  const firstLesson = flatLessons[0];
  const [activeLessonId, setActiveLessonId] = useState(firstLesson?.id || "");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const activeLesson = flatLessons.find((lesson) => lesson.id === activeLessonId) ?? firstLesson;
  const activeIndex = flatLessons.findIndex((lesson) => lesson.id === activeLesson?.id);
  const nextLesson = activeIndex >= 0 ? flatLessons[activeIndex + 1] : undefined;
  const totalLessons = flatLessons.length;
  const completedCount = completedLessons.size;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
  const videoSrc =
    activeLesson && isDirectVideo(activeLesson.videoUrl)
      ? activeLesson.videoUrl
      : SAMPLE_VIDEOS[(activeLesson?.index ?? 0) % SAMPLE_VIDEOS.length];

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  };

  const selectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ClientShell
      activeSection="mentorias"
      title={mentorship.title}
      breadcrumb={`FG EXACTA / MENTORIAS / ${mentorship.title.toUpperCase()}`}
    >
      <div className="mtp-premium-wrapper">
        <section className="mtp-course-hero">
          <ManagedMedia
            alt={mentorship.title}
            sizeLabel="1600 x 720"
            src={mentorshipCover(mentorship)}
            className="managed-media-fill"
          />
          <div className="mtp-course-hero-copy">
            <div className="mtp-tags">
              <span className="mtp-tag category">{mentorship.category}</span>
              <span className="mtp-tag status">
                {progressPercent === 100 ? "Concluído" : progressPercent > 0 ? "Em andamento" : "Pronto para começar"}
              </span>
              {mentorship.badge ? <span className="mtp-tag">{mentorship.badge}</span> : null}
            </div>
            <h1 className="mtp-title">{mentorship.title}</h1>
            <p className="mtp-desc">{mentorship.description || mentorship.shortDescription}</p>
            <div className="mtp-meta-grid">
              <div className="mtp-meta-item">
                <Icon name="cap" />
                <span>
                  <strong>{modulesSafe.length}</strong> módulos
                </span>
              </div>
              <div className="mtp-meta-item">
                <Icon name="live" />
                <span>
                  <strong>{totalLessons}</strong> aulas
                </span>
              </div>
              <div className="mtp-meta-item">
                <Icon name="grid" />
                <span>
                  <strong>{mentorship.duration || "--"}</strong>
                </span>
              </div>
              <div className="mtp-meta-item">
                <Icon name="trophy" />
                <span>
                  <strong>+100</strong> pontos ao concluir
                </span>
              </div>
            </div>
            <div className="mtp-hero-actions">
              <a href="#aula" className="mtp-btn-primary">
                {progressPercent > 0 ? "Continuar aula" : "Começar agora"}
              </a>
              <Link href="/detalhes/mentorias" className="mtp-btn-outline">
                Voltar à biblioteca
              </Link>
            </div>
          </div>
        </section>

        <div className="mtp-main-layout" id="aula">
          <div className="mtp-content-col">
            <section className="mtp-video-section">
              <div className="mtp-video-player">
                {activeLesson ? (
                  <video
                    key={activeLesson.id}
                    className="mtp-video-el"
                    src={videoSrc}
                    poster={mentorshipCover(mentorship)}
                    controls
                    playsInline
                    controlsList="nodownload noremoteplayback"
                  />
                ) : (
                  <p>Selecione uma aula para começar.</p>
                )}
              </div>

              {activeLesson ? (
                <div className="mtp-video-info">
                  <div className="mtp-video-header">
                    <div>
                      <p className="mtp-video-kicker">{activeLesson.moduleTitle}</p>
                      <h2 className="mtp-video-title">{activeLesson.title}</h2>
                      <p className="mtp-video-desc">
                        Aula {activeIndex + 1} de {totalLessons}. Marque como concluída e avance para o próximo conteúdo.
                      </p>
                    </div>
                    <span className="mtp-lesson-duration">{activeLesson.duration || "15 min"}</span>
                  </div>

                  {activeLesson.materials?.length ? (
                    <div className="mtp-materials">
                      <strong>Materiais de apoio</strong>
                      <div className="mtp-materials-row">
                        {activeLesson.materials.map((material) => (
                          <span key={material} className="mtp-material-chip">
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mtp-video-actions">
                    <button
                      type="button"
                      className={`mtp-btn-outline ${completedLessons.has(activeLesson.id) ? "mtp-btn-success" : ""}`}
                      onClick={() => toggleLessonComplete(activeLesson.id)}
                    >
                      {completedLessons.has(activeLesson.id) ? "Aula concluída" : "Marcar como concluída"}
                    </button>
                    <button
                      type="button"
                      className="mtp-btn-primary"
                      disabled={!nextLesson}
                      onClick={() => nextLesson && selectLesson(nextLesson.id)}
                    >
                      {nextLesson ? "Próxima aula" : "Fim do curso"}
                    </button>
                  </div>
                </div>
              ) : null}
            </section>

            <section className="mtp-modules-section">
              <div className="mtp-section-header">
                <h3>Conteúdo do curso</h3>
              </div>
              <div className="mtp-module-list">
                {modulesSafe.map((moduleItem, moduleIndex) => {
                  const moduleLessons = Array.isArray(moduleItem.lessons) ? moduleItem.lessons : [];
                  const moduleCompleted = moduleLessons.filter((lesson) => completedLessons.has(lesson.id)).length;
                  const moduleProgress =
                    moduleLessons.length === 0 ? 0 : Math.round((moduleCompleted / moduleLessons.length) * 100);

                  return (
                    <div key={moduleItem.id} className="mtp-module-item">
                      <div className="mtp-module-head">
                        <div className="mtp-module-head-top">
                          <h4 className="mtp-module-title">
                            Módulo {moduleIndex + 1}: {moduleItem.title}
                          </h4>
                          <span className="mtp-module-meta">
                            {moduleCompleted}/{moduleLessons.length} aulas · {moduleProgress}%
                          </span>
                        </div>
                        {moduleItem.description ? <p className="mtp-module-desc">{moduleItem.description}</p> : null}
                      </div>
                      <div className="mtp-lessons-list">
                        {moduleLessons.map((lesson, lessonIndex) => {
                          const isCompleted = completedLessons.has(lesson.id);
                          const isActive = lesson.id === activeLesson?.id;

                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              className={`mtp-lesson-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                              onClick={() => selectLesson(lesson.id)}
                            >
                              <div className="mtp-lesson-info">
                                <div className="mtp-lesson-icon">{isCompleted ? "✓" : isActive ? "▶" : lessonIndex + 1}</div>
                                <span className="mtp-lesson-title">{lesson.title}</span>
                              </div>
                              <span className="mtp-lesson-duration">{lesson.duration || "10 min"}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="mtp-sidebar-col">
            <aside className="mtp-widget">
              <div className="mtp-widget-head">
                <h4>Seu progresso</h4>
              </div>
              <div className="mtp-widget-body">
                <div className="mtp-progress-large">
                  <div className="mtp-progress-labels">
                    <span>Progresso atual</span>
                    <strong>{progressPercent}%</strong>
                  </div>
                  <div className="mtp-progress-bar">
                    <div className="mtp-progress-fill" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
                <div className="mtp-data-list">
                  <div className="mtp-data-row">
                    <span>Aulas concluídas</span>
                    <strong>
                      {completedCount} de {totalLessons}
                    </strong>
                  </div>
                  <div className="mtp-data-row">
                    <span>Aula atual</span>
                    <strong>{activeLesson?.title || "Nenhuma"}</strong>
                  </div>
                  <div className="mtp-data-row">
                    <span>Pontos ao concluir</span>
                    <strong>+100 pts</strong>
                  </div>
                </div>
              </div>
            </aside>

            {mentorship.mentorName ? (
              <aside className="mtp-widget">
                <div className="mtp-widget-head">
                  <h4>Instrutor</h4>
                </div>
                <div className="mtp-widget-body">
                  <div className="mtp-mentor-card">
                    <div className="mtp-mentor-avatar">
                      <ManagedMedia
                        src={mentorship.mentorAvatar}
                        alt={mentorship.mentorName}
                        sizeLabel="64 x 64"
                        className="managed-media-fill"
                      />
                    </div>
                    <div className="mtp-mentor-info">
                      <h5>{mentorship.mentorName}</h5>
                      <span>{mentorship.level || "Mentor"}</span>
                    </div>
                  </div>
                </div>
              </aside>
            ) : null}

            <aside className="mtp-widget">
              <div className="mtp-widget-head">
                <h4>Depois desta aula</h4>
              </div>
              <div className="mtp-widget-body">
                <div className="mtp-gamification">
                  <div className="mtp-gami-icon">
                    <Icon name="sparkles" />
                  </div>
                  <div className="mtp-gami-text">
                    <h5>Missão vinculada</h5>
                    <p>Conclua a mentoria para somar pontos no ranking e desbloquear a próxima trilha.</p>
                  </div>
                  <Link href="/missoes" className="mtp-btn-outline">
                    Ver missões
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </ClientShell>
  );
}
