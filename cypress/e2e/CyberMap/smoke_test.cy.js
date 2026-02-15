import datos from '../../fixtures/CyberMap.json';

before(() => {
  cy.limpiar_redis();
  cy.limpiar_turso();
});

describe('Gestión de datos en CyberMap', () => {
  it('Debe limpiar datos existentes y validar sources de datos', () => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
    cy.contains('Conectado', { timeout: 80000 }).should('be.visible');
    cy.get('.text-card-foreground', { timeout: 10000 }).should('be.visible');
    cy.wait(1000);
    cy.get('body').click('center');
    cy.contains('Nominatim').should('be.visible');
    cy.get(datos.selectors.close_button).should('be.visible').click();
    cy.get(datos.selectors.popup_details_button).should('be.visible').click();
    cy.contains('Redis').should('be.visible');
    cy.get(datos.selectors.close_button).should('be.visible').click();
    cy.limpiar_redis();
    cy.reload();
    cy.contains('Conectado', { timeout: 80000 }).should('be.visible');
    cy.get('body').click('center');
    cy.contains('Turso').should('be.visible');
    cy.get(datos.selectors.close_button).should('be.visible').click();
    cy.get(datos.selectors.popup_delete_button).should('be.visible').click();
  });
});
