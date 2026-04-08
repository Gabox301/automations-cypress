import path from 'path';
import datos from '../../fixtures/Avro_Transformer.json';

function cargarAvro() {
  cy.get(datos.selectors.file_input, { includeShadowDom: true }).selectFile(datos.data.avro, { force: true });
  cy.contains('Ritual de Transformación', { includeShadowDom: true });
}

describe('Smoke Test Avro Transformer', () => {
  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('include', new URL(datos.base_url).hostname);
  });

  it('Cargar archivo con formato inválido', () => {
    cy.get(datos.selectors.file_input, { includeShadowDom: true }).selectFile(datos.data.json, { force: true });
    cy.contains('Solo archivos .avro son aceptados', {
      includeShadowDom: true,
    });
  });

  it('Verificar el botón de copiar', () => {
    cargarAvro();
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, 'writeText').resolves();
    });
    cy.get(datos.selectors.copy, { includeShadowDom: true }).click();
    cy.get(datos.selectors.copy, { includeShadowDom: true }).should('contain', 'Copiado');
  });

  it('Descarga en vista JSON: archivo con extensión .json', () => {
    cargarAvro();
    cy.get(datos.selectors.json_tab, { includeShadowDom: true }).click();
    cy.get(datos.selectors.json_tab, { includeShadowDom: true }).should('have.attr', 'aria-selected', 'true');
    cy.get(datos.selectors.download, { includeShadowDom: true }).click();
    const jsonPath = path.join(Cypress.config('downloadsFolder'), datos.downloads.json_name);
    expect(datos.downloads.json_name, 'nombre esperado').to.match(/\.json$/i);
    cy.readFile(jsonPath, { timeout: 20000 }).should('have.length.gt', 2);
  });

  it('Descarga en vista Tabla: archivo con extensión .csv', () => {
    cargarAvro();
    cy.get(datos.selectors.table_tab, { includeShadowDom: true }).click();
    cy.get(datos.selectors.table_tab, { includeShadowDom: true }).should('have.attr', 'aria-selected', 'true');
    cy.get(datos.selectors.download, { includeShadowDom: true }).click();
    const csvPath = path.join(Cypress.config('downloadsFolder'), datos.downloads.csv_name);
    expect(datos.downloads.csv_name, 'nombre esperado').to.match(/\.csv$/i);
    cy.readFile(csvPath, { timeout: 20000 }).should('have.length.gt', 2);
  });

  it('Nuevo Papiro: vuelve a la pantalla de carga de archivo', () => {
    cargarAvro();
    cy.get(datos.selectors.new_file, { includeShadowDom: true }).click();
    cy.contains('Deposita el Archivo', { includeShadowDom: true });
    cy.get(datos.selectors.file_input, { includeShadowDom: true }).should('exist');
    cy.get(datos.selectors.open_file_button, { includeShadowDom: true }).should('be.visible');
  });

  after(() => {
    cy.task('clearDownloadsFolder');
  });
});
