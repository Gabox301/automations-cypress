import datos from '../../fixtures/Ruby-Scraper.json';

describe('Smoke Test Ruby Scraper', () => {
  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url, { timeout: 80000 });
  });

  it('Crear un nuevo rastreo', () => {
    cy.env(['API_KEY']).then((env) => {
      const API_KEY = env.API_KEY;
      cy.get(datos.selectors.navigation.crawl).click();
      cy.get(datos.selectors.crawl.url).type(datos.data.url);
      cy.get(datos.selectors.crawl.api_key).type(API_KEY);
      cy.get(datos.selectors.crawl.depth).clear().type(datos.data.depth);
      cy.get(datos.selectors.crawl.max_pages).clear().type(datos.data.max_pages);
      cy.get(datos.selectors.crawl.delay).clear().type(datos.data.delay);
      cy.get(datos.selectors.crawl.same_domain).click();
      cy.get(datos.selectors.crawl.skip_duplicate).click();
      cy.get(datos.selectors.crawl.submit).click();
      cy.contains('Enviando solicitud de rastreo', { timeout: 10000 }).should('be.visible');
      cy.get(datos.selectors.crawl.success_message)
        .contains('Rastreo completado exitosamente', { timeout: 80000 })
        .should('be.visible');
      cy.get(datos.selectors.navigation.view_pages).should('be.visible');
    });
  });

  it('Ingresar a los webhooks', () => {
    cy.get(datos.selectors.navigation.webhooks).click();
    cy.url().should('include', '/webhooks', { timeout: 10000 });
  });

  it('Ingresar a la vista de páginas rastreadas y usar el buscador', () => {
    cy.get(datos.selectors.navigation.pages).click();
    cy.url().should('include', '/pages', { timeout: 10000 });
    cy.get(datos.selectors.pages.input_search).type(datos.data.url_search);
    cy.contains('Buscando', { timeout: 10000 }).should('be.visible');
  });

  it('Ingresar al historial de rastreos e ingresar al detalle de un rastreo', () => {
    cy.get(datos.selectors.navigation.history).click();
    cy.url().should('include', '/history', { timeout: 10000 });
    cy.get(datos.selectors.history.link)
      .invoke('attr', 'href')
      .then((href) => {
        const crawl_id = href.split('/').pop();
        Cypress.expose('crawl_id', crawl_id);
        cy.get(datos.selectors.history.link).click();
        cy.url().should('include', `/pages/${crawl_id}`, { timeout: 10000 });
      });
  });

  it('Eliminar una página rastreada', () => {
    cy.env(['API_KEY']).then((env) => {
      const API_KEY = env.API_KEY;
      const page_id = Cypress.expose('crawl_id');
      cy.get(datos.selectors.navigation.pages).click();
      cy.get(datos.selectors.pages.delete).filter(`[id="btn-delete-page-${page_id}"]`).click();
      cy.get(datos.selectors.pages.modal_api_key).type(API_KEY);
      cy.get(datos.selectors.pages.confirm).click();
      cy.contains('No se encontraron páginas.', { timeout: 10000 }).should('be.visible');
    });
  });
});
