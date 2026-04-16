import datos from '../../fixtures/Dieselpunk_Countries.json';

describe('Smoke Test Dieselpunk Countries', () => {
  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url, { timeout: 10000 });
  });

  it('Validar paginación', () => {
    cy.get(datos.selectors.pagination_counter)
      .invoke('text')
      .then((text_before) => {
        cy.get(datos.selectors.next_page).click();
        cy.get(datos.selectors.pagination_counter).invoke('text').should('not.equal', text_before);
      });
    cy.get(datos.selectors.previous_page).click();
    cy.get(datos.selectors.pagination_counter).should('contain', '1 /');
  });

  it('Validar filtrado por búsqueda', () => {
    const card_selector = datos.selectors.country_card_by_code.replace('{{code}}', datos.data.country_code);
    cy.get(datos.selectors.search_input).type(datos.data.country);
    cy.get(card_selector).should('be.visible');
  });

  it('Validar filtrado por region', () => {
    const region_selector = datos.selectors.region_btn_by_region;
    cy.get(datos.selectors.region_buttons)
      .find(region_selector.replace('{{region}}', datos.data.regions.africa))
      .click();
    cy.get(datos.selectors.region_buttons)
      .find(region_selector.replace('{{region}}', datos.data.regions.americas))
      .click();
    cy.get(datos.selectors.region_buttons).find(region_selector.replace('{{region}}', datos.data.regions.asia)).click();
    cy.get(datos.selectors.region_buttons)
      .find(region_selector.replace('{{region}}', datos.data.regions.europe))
      .click();
    cy.get(datos.selectors.region_buttons)
      .find(region_selector.replace('{{region}}', datos.data.regions.oceania))
      .click();
    cy.get(datos.selectors.region_buttons).find(region_selector.replace('{{region}}', datos.data.regions.all)).click();
  });

  it('Validar obtener noticias de un país', () => {
    const selector = datos.selectors.country_card_by_code.replace('{{code}}', datos.data.country_code);
    cy.get(selector).click();
    cy.url().should('include', `/news/${datos.data.country_code}`, { timeout: 10000 });
  });
});
