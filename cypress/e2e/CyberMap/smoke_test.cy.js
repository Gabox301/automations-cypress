import datos from '../../fixtures/CyberMap.json';

const get_providers = () => {
  cy.get(datos.selectors.provider_trigger).should('be.visible').click();
  cy.get(datos.selectors.nominatim_status, { timeout: 80000 }).should('be.visible').and('contain', 'Activo');
  cy.get(datos.selectors.locationiq_status, { timeout: 80000 }).should('be.visible').and('contain', 'Activo');
};

describe('Smoke Test CyberMap', { testIsolation: false }, () => {
  before(() => {
    cy.limpiar_base('redis');
    cy.limpiar_base('db');
  });

  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('eq', datos.base_url);
    cy.contains('Conectado', { timeout: 10000 }).should('be.visible');
    get_providers();
  });

  it('Validar source API de Geocodificación (Nominatim/LocationIQ)', () => {
    cy.get('body').click('center');
    cy.contains(/Nominatim|LocationIQ/).should('be.visible');
    cy.get(datos.selectors.close_button).should('be.visible').click();
  });

  it('Validar source Upstash Redis', () => {
    cy.get('body').click('center');
    cy.contains('Redis').should('be.visible');
    cy.get(datos.selectors.close_button).should('be.visible').click();
    cy.get(datos.selectors.popup_details_button).should('be.visible').click();
    cy.contains('Redis').should('be.visible');
    cy.get(datos.selectors.close_button).should('be.visible').click();
  });

  it('Validar source Turso', () => {
    cy.limpiar_base('redis');
    cy.visit(datos.base_url);
    get_providers();
    cy.get('.text-card-foreground', { timeout: 10000 }).should('be.visible');
    cy.get('body').click('center');
    cy.contains('Turso').should('be.visible');
    cy.get(datos.selectors.close_button).should('be.visible').click();
    cy.get(datos.selectors.popup_delete_button).should('be.visible').click();
  });
});
