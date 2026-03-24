import datos from '../../fixtures/Go-WPA.json';

describe('Smoke Test Go WPA', () => {
  it('Validar acceso al panel de control', () => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
    cy.get(datos.selectors.access_panel).should('be.visible').click();
    cy.url().should('include', datos.test_url);
  });

  [
    { device: datos.data.desktop, region: datos.data.USA_West, nombre: 'desktop' },
    { device: datos.data.mobile, region: datos.data.Europe_West, nombre: 'mobile' },
  ].forEach(({ device, region, nombre }) => {
    it(`Realizar un Scan en ${nombre}`, () => {
      cy.visit(datos.test_url);
      cy.get(datos.selectors.sidebar_scan).should('be.visible').click();
      cy.get(datos.selectors.scan_url).should('be.visible').type(datos.data.url);
      cy.get(datos.selectors.scan_device).should('be.visible').select(device);
      cy.get(datos.selectors.scan_region).should('be.visible').select(region);
      cy.get(datos.selectors.scan_button).should('be.visible').click();
      cy.get(datos.selectors.scan_status, { timeout: 80000 }).should('be.visible').should('contain', 'Pendiente');
      cy.get(datos.selectors.scan_status, { timeout: 80000 }).should('be.visible').should('contain', 'Procesando');
    });
  });

  it('Verificar funcionamiento de tabs en historial', () => {
    cy.visit(datos.test_url);
    cy.get(datos.selectors.sidebar_history).should('be.visible').click();
    cy.get(datos.selectors.history_all).should('be.visible').click();
    cy.get(datos.selectors.history_success).should('be.visible').click();
    cy.get(datos.selectors.history_failed).should('be.visible').click();
    cy.get(datos.selectors.history_pending).should('be.visible').click();
    cy.get(datos.selectors.history_processing).should('be.visible').click();
    cy.get(datos.selectors.history_search).should('be.visible');
  });

  it('Verificar cards visibles en Core Web Vitals', () => {
    cy.visit(datos.test_url);
    cy.get(datos.selectors.sidebar_cwb, { timeout: 80000 }).should('be.visible').click();
    cy.get(datos.selectors.domain_select, { timeout: 80000 }).should('be.visible');
    cy.get(datos.selectors.lcp_card, { timeout: 80000 }).should('be.visible');
    cy.get(datos.selectors.cls_card, { timeout: 80000 }).should('be.visible');
    cy.get(datos.selectors.ttfb_card, { timeout: 80000 }).should('be.visible');
    cy.get(datos.selectors.fcp_card, { timeout: 80000 }).should('be.visible');
    cy.get(datos.selectors.score_card, { timeout: 80000 }).should('be.visible');
    cy.get(datos.selectors.speed_index_card, { timeout: 80000 }).should('be.visible');
  });
});
