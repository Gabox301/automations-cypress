import datos from '../../fixtures/CyberMap.json';

describe('Smoke Test CyberMap', () => {
  before(() => {
    cy.limpiar_base('redis');
    cy.limpiar_base('db');
  });

  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
    cy.contains('Conectado', { timeout: 80000 }).should('be.visible');
    cy.get('.text-card-foreground', { timeout: 10000 }).should('be.visible');
    cy.wait(1000);
  });

  it('Validar source Nominatim', () => {
    cy.get('body').click('center');
    cy.contains('Nominatim').should('be.visible');
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

  it('Validar source Turso DB', () => {
    cy.limpiar_base('redis');
    cy.reload();
    cy.contains('Conectado', { timeout: 80000 }).should('be.visible');
    cy.get('body').click('center');
    cy.contains('Turso DB').should('be.visible');
    cy.get(datos.selectors.close_button).should('be.visible').click();
    cy.get(datos.selectors.popup_delete_button).should('be.visible').click();
  });
});
