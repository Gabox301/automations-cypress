import datos from '../../fixtures/PDF_Atelier.json';

describe('Smoke Test PDF Atelier', () => {
  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
  });

  it('Validar creación de PDF', () => {
    cy.get(datos.selectors.create.title_input).clear().type('GaboTech');
    cy.get(datos.selectors.create.content).clear().type('Prueba de validación del servicio');
    cy.get(datos.selectors.create.font).type('{selectall}13');
    cy.get(datos.selectors.create.element_r).type('{selectall}0.7');
    cy.get(datos.selectors.create.element_g).type('{selectall}0.2');
    cy.get(datos.selectors.create.element_b).type('{selectall}0.5');
    cy.get(datos.selectors.create.add_element).click();
    cy.get(datos.selectors.create.generate_pdf).click();
    cy.readFile('cypress/downloads/GaboTech.pdf', { timeout: 10000 }).should('exist');
  });

  it('Validar combinación de PDFs', () => {
    cy.get(datos.tabs.combinar).click();
    cy.get(datos.merge.input).selectFile('cypress/downloads/GaboTech.pdf', { force: true });
    cy.get(datos.merge.input).selectFile('cypress/downloads/GaboTech.pdf', { force: true });
    cy.get(datos.merge.merge_pdf).click();
    cy.readFile('cypress/downloads/combinado.pdf', { timeout: 10000 }).should('exist');
  });

  it('Validar agregar imagen a PDF', () => {
    cy.get(datos.tabs.imagen).click();
    cy.get(datos.add_image.pdf).selectFile('cypress/downloads/GaboTech.pdf', { force: true });
    cy.get(datos.add_image.image).selectFile('cypress/fixtures/images/Atelier.png', { force: true });
    cy.get(datos.add_image.add_image).click();
    cy.readFile('cypress/downloads/editado_GaboTech.pdf', { timeout: 10000 }).should('exist');
  });
});

after(() => {
  const downloadsFolder = Cypress.config('downloadsFolder');
  cy.task('delete_file', { filePath: `${downloadsFolder}/GaboTech.pdf` });
  cy.task('delete_file', { filePath: `${downloadsFolder}/editado_GaboTech.pdf` });
  cy.task('delete_file', { filePath: `${downloadsFolder}/combinado.pdf` });
});
