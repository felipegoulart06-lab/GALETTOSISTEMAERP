"use client";

import Link from "next/link";
import { useState } from "react";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import { Icon } from "@/components/ui-icon";
import type { MentorshipRecord, MentorshipModuleRecord, LessonRecord } from "@/lib/platform-types";

export function MentorshipDetailPage({
  mentorship
}: {
  mentorship: MentorshipRecord;
}) {
  const modulesSafe = Array.isArray(mentorship.modules) ? mentorship.modules : [];
  
  // State for tracking active lesson and module
  const [activeModuleId, setActiveModuleId] = useState<string>(modulesSafe[0]?.id || "");
  const [activeLessonId, setActiveLessonId] = useState<string>(
    modulesSafe[0]?.lessons?.[0]?.id || ""
  );
  
  // Mock completed lessons state for demonstration
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Helper functions
  const activeModule = modulesSafe.find(m => m.id === activeModuleId);
  const activeLesson = activeModule?.lessons?.find(l => l.id === activeLessonId);
  
  const totalLessons = modulesSafe.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0);
  const completedCount = completedLessons.size;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const selectLesson = (moduleId: string, lessonId: string) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
    
    // Scroll to video top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ClientShell
      activeSection="mentorias"
      title={mentorship.title}
      breadcrumb={`FG EXACTA / MENTORIAS / ${mentorship.title.toUpperCase()}`}
    >
      <div className="mtp-premium-wrapper">
        
        {/* HEADER */}
        <header className="mtp-header">
          <div className="mtp-header-inner">
            <div className="mtp-header-content">
              <div className="mtp-tags">
                <span className="mtp-tag category">{mentorship.category}</span>
                <span className="mtp-tag status">
                  {progressPercent === 100 ? "Concluído" : progressPercent > 0 ? "Em andamento" : "Não iniciado"}
                </span>
                {mentorship.badge && <span className="mtp-tag" style={{ background: 'var(--surface-3)', color: 'var(--text)' }}>{mentorship.badge}</span>}
              </div>
              
              <h1 className="mtp-title">{mentorship.title}</h1>
              <p className="mtp-desc">{mentorship.shortDescription || mentorship.description}</p>
              
              <div className="mtp-meta-grid">
                <div className="mtp-meta-item">
                  <Icon name="book-open" />
                  <span><strong>{modulesSafe.length}</strong> Módulos</span>
                </div>
                <div className="mtp-meta-item">
                  <Icon name="play-circle" />
                  <span><strong>{totalLessons}</strong> Aulas</span>
                </div>
                <div className="mtp-meta-item">
                  <Icon name="clock" />
                  <span><strong>{mentorship.duration || "--"}</strong> Estimado</span>
                </div>
                <div className="mtp-meta-item">
                  <Icon name="award" />
                  <span><strong>+100</strong> Pontos ao concluir</span>
                </div>
              </div>
            </div>
            
            <div className="mtp-actions">
              <Link href="#content" className="mtp-btn-primary">
                <Icon name="play" /> {progressPercent > 0 ? "Continuar curso" : "Começar curso"}
              </Link>
              <Link href="/mentorias" className="mtp-btn-outline">
                <Icon name="arrow-left" /> Voltar para mentorias
              </Link>
            </div>
          </div>
        </header>
        <div className="mtp-main-layout" id="content">
          <div className="mtp-content-col">
            
            {/* VIDEO AREA */}
            <section className="mtp-video-section">
              <div className="mtp-video-player">
                {activeLesson ? (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <Icon name="play-circle" />
                    <p style={{ marginTop: '1rem', color: '#627089' }}>
                      Player de vídeo corporativo seria renderizado aqui.<br/>
                      <small>URL: {activeLesson.videoUrl}</small>
                    </p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#627089' }}>
                    Selecione uma aula para começar.
                  </div>
                )}
              </div>
              
              {activeLesson && (
                <div className="mtp-video-info">
                  <div className="mtp-video-header">
                    <div>
                      <h2 className="mtp-video-title">{activeLesson.title}</h2>
                      <p className="mtp-video-desc">Módulo: {activeModule?.title}</p>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-soft)' }}>
                      <Icon name="clock" /> {activeLesson.duration || "15m"}
                    </div>
                  </div>
                  
                  {activeLesson.materials && activeLesson.materials.length > 0 && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <strong style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Materiais de apoio:</strong>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {activeLesson.materials.map(mat => (
                          <a key={mat} href="#" className="mtp-btn-outline" style={{ padding: '0.5rem', fontSize: '0.8125rem' }}>
                            <Icon name="download" /> {mat}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mtp-video-actions">
                    <button 
                      className={`mtp-btn-outline ${completedLessons.has(activeLesson.id) ? 'mtp-btn-success' : ''}`}
                      onClick={() => toggleLessonComplete(activeLesson.id)}
                    >
                      <Icon name="check-circle" /> 
                      {completedLessons.has(activeLesson.id) ? 'Aula concluída' : 'Marcar como concluída'}
                    </button>
                    
                    <button className="mtp-btn-primary" style={{ marginLeft: 'auto' }}>
                      Próxima aula <Icon name="chevron-right" />
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* MODULES LIST */}
            <section className="mtp-modules-section">
              <div className="mtp-section-header">
                <h3>Conteúdo do curso</h3>
              </div>
              
              <div className="mtp-module-list">
                {modulesSafe.map((mod, mIndex) => {
                  const moduleLessons = mod.lessons || [];
                  const moduleCompleted = moduleLessons.filter(l => completedLessons.has(l.id)).length;
                  const moduleProgress = moduleLessons.length === 0 ? 0 : Math.round((moduleCompleted / moduleLessons.length) * 100);
                  
                  return (
                    <div key={mod.id} className="mtp-module-item">
                      <div className="mtp-module-head">
                        <div className="mtp-module-head-top">
                          <h4 className="mtp-module-title">
                            Módulo {mIndex + 1}: {mod.title}
                          </h4>
                          <span className="mtp-module-meta">
                            {moduleCompleted}/{moduleLessons.length} aulas • {moduleProgress}%
                          </span>
                        </div>
                        {mod.description && <p className="mtp-module-desc">{mod.description}</p>}
                      </div>
                      
                      {moduleLessons.length > 0 && (
                        <div className="mtp-lessons-list">
                          {moduleLessons.map((lesson, lIndex) => {
                            const isCompleted = completedLessons.has(lesson.id);
                            const isActive = lesson.id === activeLessonId;
                            
                            return (
                              <div 
                                key={lesson.id} 
                                className={`mtp-lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                onClick={() => selectLesson(mod.id, lesson.id)}
                              >
                                <div className="mtp-lesson-info">
                                  <div className="mtp-lesson-icon">
                                    <Icon name={isCompleted ? "check" : isActive ? "play" : "play"} />
                                  </div>
                                  <span className="mtp-lesson-title">
                                    {mIndex + 1}.{lIndex + 1} - {lesson.title}
                                  </span>
                                </div>
                                <span className="mtp-lesson-duration">
                                  {lesson.duration || "10m"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
            
          </div>
          {/* SIDEBAR */}
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
                    <strong>{completedCount} de {totalLessons}</strong>
                  </div>
                  <div className="mtp-data-row">
                    <span>Próxima aula</span>
                    <strong>{activeLesson?.title || "Nenhuma"}</strong>
                  </div>
                  <div className="mtp-data-row">
                    <span>Pontos a receber</span>
                    <strong>+100 pts</strong>
                  </div>
                </div>
              </div>
            </aside>

            {mentorship.mentorName && (
              <aside className="mtp-widget">
                <div className="mtp-widget-head">
                  <h4>Instrutor</h4>
                </div>
                <div className="mtp-widget-body">
                  <div className="mtp-mentor-card">
                    <div className="mtp-mentor-avatar">
                      <ManagedMedia 
                        src={mentorship.mentorAvatar || "/images/avatar-01.png"} 
                        alt={mentorship.mentorName}
                        sizeLabel="64x64"
                        className="managed-media-fill"
                      />
                    </div>
                    <div className="mtp-mentor-info">
                      <h5>{mentorship.mentorName}</h5>
                      <span>Mentor e Estrategista</span>
                    </div>
                  </div>
                </div>
              </aside>
            )}

            <aside className="mtp-widget">
              <div className="mtp-widget-head">
                <h4>Gamificação</h4>
              </div>
              <div className="mtp-widget-body" style={{ padding: '2rem 1.25rem' }}>
                <div className="mtp-gamification">
                  <div className="mtp-gami-icon">
                    <Icon name="award" />
                  </div>
                  <div className="mtp-gami-text">
                    <h5>Missão vinculada</h5>
                    <p>Conclua esta mentoria para desbloquear o badge "Estrategista de Elite" e ganhar 100 pontos no ranking.</p>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </ClientShell>
  );
}
