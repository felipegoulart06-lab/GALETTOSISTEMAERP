"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import { Icon } from "@/components/ui-icon";
import type { SupplierListRecord, SupplierRecord } from "@/lib/platform-types";

export function SupplierListDetailPage({
  supplierList
}: {
  supplierList: SupplierListRecord;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [cityFilter, setCityFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const suppliers = Array.isArray(supplierList.suppliers) ? supplierList.suppliers : [];
  
  // Extract unique categories and cities for filters
  const categories = useMemo(() => {
    const cats = new Set(suppliers.map(s => s.category).filter(Boolean));
    return ["Todas", ...Array.from(cats)];
  }, [suppliers]);

  const cities = useMemo(() => {
    const cts = new Set(suppliers.map(s => s.cityState?.split("/")[0]?.trim()).filter(Boolean));
    return ["Todas", ...Array.from(cts)];
  }, [suppliers]);

  // Filtering
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchesSearch = searchTerm === "" || 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        supplier.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (supplier.products && supplier.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesCategory = categoryFilter === "Todas" || supplier.category === categoryFilter;
      
      const supplierCity = supplier.cityState?.split("/")[0]?.trim();
      const matchesCity = cityFilter === "Todas" || supplierCity === cityFilter;

      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [suppliers, searchTerm, categoryFilter, cityFilter]);

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const currentSuppliers = filteredSuppliers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Metrics
  const totalSuppliers = suppliers.length;
  const totalCities = new Set(suppliers.map(s => s.cityState).filter(Boolean)).size;
  const totalCategories = new Set(suppliers.map(s => s.category).filter(Boolean)).size;
  const totalContacts = suppliers.filter(s => s.phone || s.whatsapp || s.email).length;

  return (
    <ClientShell
      activeSection="listas"
      title={supplierList.title}
      breadcrumb={`FG EXACTA / LISTAS / ${supplierList.title.toUpperCase()}`}
    >
      <div className="list-premium-wrapper">
        
        {/* HEADER */}
        <header className="spl-header">
          <div className="spl-header-inner">
            <div className="spl-brand-block">
              <div className="spl-title-block">
                <div className="spl-tags">
                  <span className="spl-tag highlight">{supplierList.badge || "Lista"}</span>
                  <span className="spl-tag subtle">Atualizada: Hoje</span>
                </div>
                <h1 className="spl-title">{supplierList.title}</h1>
                <div className="spl-meta-row">
                  <span className="spl-meta-item"><Icon name="folder" /> {supplierList.category || "Atacado"}</span>
                  <span className="spl-meta-item"><Icon name="check-circle" /> Status: {supplierList.status === "PUBLICADO" ? "Ativa" : supplierList.status}</span>
                </div>
              </div>
            </div>
            <div className="spl-actions-block">
              <Link href="/listas" className="spl-btn-outline">
                <Icon name="arrow-left" /> Voltar
              </Link>
            </div>
          </div>
        </header>

        {/* METRICS */}
        <div className="spl-metrics-grid">
          <div className="spl-metric-card">
            <span className="spl-metric-value text-blue">{totalSuppliers}</span>
            <span className="spl-metric-label">Fornecedores cadastrados</span>
          </div>
          <div className="spl-metric-card">
            <span className="spl-metric-value text-green">{totalCities}</span>
            <span className="spl-metric-label">Cidades atendidas</span>
          </div>
          <div className="spl-metric-card">
            <span className="spl-metric-value text-orange">{totalCategories}</span>
            <span className="spl-metric-label">Categorias presentes</span>
          </div>
          <div className="spl-metric-card">
            <span className="spl-metric-value text-violet">{totalContacts}</span>
            <span className="spl-metric-label">Contatos disponíveis</span>
          </div>
        </div>
        <div className="spl-main-grid">
          <div className="spl-content-column">
            
            {/* SEARCH & FILTERS */}
            <div className="spl-filters-panel">
              <div className="spl-search-box">
                <Icon name="search" />
                <input 
                  type="text" 
                  placeholder="Buscar fornecedor, empresa ou produto..." 
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
              </div>
              <div className="spl-filter-group">
                <select 
                  value={categoryFilter}
                  onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                  className="spl-select"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select 
                  value={cityFilter}
                  onChange={(e) => { setCityFilter(e.target.value); setCurrentPage(1); }}
                  className="spl-select"
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* SUPPLIERS TABLE/LIST */}
            <div className="spl-suppliers-container">
              <div className="spl-suppliers-header">
                <h3>Fornecedores da Lista ({filteredSuppliers.length})</h3>
              </div>
              
              <div className="spl-suppliers-list">
                {currentSuppliers.length > 0 ? (
                  currentSuppliers.map((supplier) => (
                    <div key={supplier.id} className="spl-supplier-row">
                      <div className="spl-supplier-logo">
                        <ManagedMedia 
                          src={supplier.logo || supplier.image || "/images/empresa-logo-01-v1.png"} 
                          alt={supplier.name}
                          sizeLabel="100x100"
                          className="managed-media-fill managed-media-fit-contain"
                        />
                      </div>
                      <div className="spl-supplier-info">
                        <h4>{supplier.name}</h4>
                        <div className="spl-supplier-meta">
                          <span className="spl-meta-badge">{supplier.segment || supplier.category}</span>
                          {supplier.cityState && <span><Icon name="map-pin" /> {supplier.cityState}</span>}
                        </div>
                        <p className="spl-supplier-desc">{supplier.description || supplier.company}</p>
                        
                        {supplier.products && supplier.products.length > 0 && (
                          <div className="spl-supplier-products">
                            <strong>Fornece:</strong> {supplier.products.join(", ")}
                          </div>
                        )}
                      </div>
                      <div className="spl-supplier-actions">
                        {supplier.whatsapp && (
                          <a href={`https://wa.me/${supplier.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="spl-btn-contact whatsapp">
                            <Icon name="message-circle" /> Contato
                          </a>
                        )}
                        {!supplier.whatsapp && (supplier.phone || supplier.email) && (
                          <a href={supplier.phone ? `tel:${supplier.phone.replace(/\D/g,'')}` : `mailto:${supplier.email}`} className="spl-btn-contact">
                            <Icon name="phone" /> Contato
                          </a>
                        )}
                        {supplier.companySlug ? (
                          <Link href={`/detalhes/empresas/${supplier.companySlug}`} className="spl-btn-primary">
                            Ver fornecedor
                          </Link>
                        ) : (
                          <button className="spl-btn-primary disabled" disabled>
                            Ver fornecedor
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="spl-empty-state">
                    <Icon name="filter" />
                    <p>Nenhum fornecedor encontrado para os filtros atuais.</p>
                    <button onClick={() => { setSearchTerm(""); setCategoryFilter("Todas"); setCityFilter("Todas"); }} className="spl-btn-outline">Limpar filtros</button>
                  </div>
                )}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="spl-pagination">
                  <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="spl-page-btn"
                  >
                    Anterior
                  </button>
                  <span className="spl-page-info">Página {currentPage} de {totalPages}</span>
                  <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="spl-page-btn"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </div>
            
          </div>

          {/* COLUNA LATERAL (LEITURA COMERCIAL) */}
          <div className="spl-sidebar-column">
            
            <aside className="spl-widget">
              <div className="spl-widget-header">
                <h3>Leitura Comercial</h3>
              </div>
              
              <div className="spl-widget-body">
                <div className="spl-commercial-overview">
                  <p>{supplierList.description || supplierList.subtitle}</p>
                </div>
                
                <div className="spl-data-list">
                  <div className="spl-data-item">
                    <Icon name="target" />
                    <div>
                      <strong>Objetivo da lista</strong>
                      <span>Compras em atacado / B2B</span>
                    </div>
                  </div>
                  <div className="spl-data-item">
                    <Icon name="map" />
                    <div>
                      <strong>Região principal</strong>
                      <span>{supplierList.facts?.[0] || "Nacional"}</span>
                    </div>
                  </div>
                  <div className="spl-data-item">
                    <Icon name="shopping-bag" />
                    <div>
                      <strong>Perfil de compra</strong>
                      <span>{supplierList.facts?.[1] || "Volume e Recorrência"}</span>
                    </div>
                  </div>
                  <div className="spl-data-item">
                    <Icon name="briefcase" />
                    <div>
                      <strong>Segmento</strong>
                      <span>{supplierList.category || "Diversos"}</span>
                    </div>
                  </div>
                </div>

                {supplierList.chips && supplierList.chips.length > 0 && (
                  <div className="spl-tags-container">
                    <strong>Tags relacionadas:</strong>
                    <div className="spl-chips-list">
                      {supplierList.chips.map(chip => (
                        <span key={chip} className="spl-chip">{chip}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

          </div>
        </div>
        
      </div>
    </ClientShell>
  );
}
