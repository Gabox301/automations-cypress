import datos from '../../fixtures/Hono_URLs.json';

describe('Smoke Test Hono_URLs', () => {
  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
    cy.get(datos.selectors.service_check_state).should('contain', 'Online').should('be.visible');
    cy.get(datos.selectors.service_check_button).should('be.visible').click();
    cy.url().should('include', datos.base_url + 'test');
  });

  it('Comprobar el estado del servicio', () => {
    cy.get(datos.selectors.health_check_button).should('be.visible').click();
    cy.get(datos.selectors.modal_status).should('contain.text', '200').should('be.visible');
  });

  it('Acceder a la documentacion del servicio', () => {
    cy.get(datos.selectors.get_docs_button).should('be.visible').click();
    cy.get(datos.selectors.modal_status).should('contain.text', '200').should('be.visible');
    cy.get(datos.selectors.modal_meta).should('contain.text', datos.base_url + 'docs');
  });

  it('Crear una nueva URL', () => {
    cy.get(datos.selectors.input_url).type(datos.url.github);
    cy.get(datos.selectors.custom_code).type(datos.code.gabo);
    cy.get(datos.selectors.create_url_button).should('be.visible').click();
    cy.get(datos.selectors.modal_status).should('contain.text', '201').should('be.visible');
    cy.get(datos.selectors.modal_output).should('contain.text', datos.url.github).should('be.visible');
  });

  it('Intentar crear una URL ya en uso', () => {
    cy.get(datos.selectors.input_url).type(datos.url.github);
    cy.get(datos.selectors.custom_code).type(datos.code.gabo);
    cy.get(datos.selectors.create_url_button).should('be.visible').click();
    cy.get(datos.selectors.modal_status).should('contain.text', '400').should('be.visible');
    cy.get(datos.selectors.modal_output)
      .should('contain.text', '"error": "El codigo \\"' + datos.code.gabo + '\\" ya esta en uso"')
      .should('be.visible');
  });

  it('Obtener la informacion de una URL', () => {
    cy.get(datos.selectors.custom_code_stats).type(datos.code.gabo);
    cy.get(datos.selectors.get_stats_button).should('be.visible').click();
    cy.get(datos.selectors.modal_status).should('contain.text', '200').should('be.visible');
    cy.get(datos.selectors.modal_output).should('contain.text', datos.code.gabo).should('be.visible');
    cy.get(datos.selectors.modal_output).should('contain.text', datos.url.github).should('be.visible');
  });

  it('Obtener el listado de URLs', () => {
    cy.get(datos.selectors.list_urls_button).should('be.visible').click();
    cy.get(datos.selectors.modal_status).should('contain.text', '200').should('be.visible');
    cy.get(datos.selectors.modal_output).should('contain.text', datos.code.gabo).should('be.visible');
  });

  it('Intentar utilizar codigo reservado', () => {
    cy.get(datos.selectors.update_code).type(datos.code.reserved);
    cy.get(datos.selectors.update_url_button).should('be.visible').click();
    cy.get(datos.selectors.modal_output)
      .should('contain.text', 'El código "' + datos.code.reserved + '" está reservado. Por favor utiliza otro nombre')
      .should('be.visible');
  });

  it('Actualizar la informacion de una URL', () => {
    cy.get(datos.selectors.update_code).type(datos.code.gabo);
    cy.get(datos.selectors.update_url).type(datos.url.linkedin);
    cy.get(datos.selectors.update_url_button).should('be.visible').click();
    cy.get(datos.selectors.modal_status).should('contain.text', '200').should('be.visible');
    cy.get(datos.selectors.modal_output).should('contain.text', datos.code.gabo).should('be.visible');
    cy.get(datos.selectors.modal_output).should('contain.text', datos.url.linkedin).should('be.visible');
  });

  it('Comprobar la redireccion de una URL', () => {
    cy.get(datos.selectors.redirect_code).type(datos.code.gabo);
    cy.get(datos.selectors.redirect_url_button).should('be.visible').click();
    cy.get(datos.selectors.modal_status).should('contain.text', '302').should('be.visible');
    cy.get(datos.selectors.modal_output)
      .should('contain.text', 'Abierto ' + datos.base_url + datos.code.gabo + ' en una nueva pestaña.')
      .should('be.visible');
  });

  it('Eliminar una URL', () => {
    cy.get(datos.selectors.delete_code).type(datos.code.gabo);
    cy.get(datos.selectors.delete_url_button).should('be.visible').click();
    cy.get(datos.selectors.modal_status).should('contain.text', '200').should('be.visible');
    cy.get(datos.selectors.modal_output)
      .should('contain.text', '"message": "Short URL \\"' + datos.code.gabo + '\\" deleted"')
      .should('contain.text', '"success": true')
      .should('be.visible');
  });

  afterEach(() => {
    cy.get(datos.selectors.modal_close_button).should('be.visible').click();
  });
});
