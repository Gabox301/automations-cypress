import datos from '../../fixtures/WAV_Decoder.json';

describe('Smoke Test WAV Decoder', () => {
  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
  });

  it('Validar estado del servicio', () => {
    cy.get(datos.selectors.base_url_input, { timeout: 15000 }).should('have.value', datos.api_url);
    cy.get(datos.selectors.check_health_button, { timeout: 15000 }).should('be.visible').click();
    cy.contains('El servicio está en línea y respondiendo.', { timeout: 80000 }).should('be.visible');
  });

  it('Validar limitación de tamaño de archivo', () => {
    cy.get(datos.selectors.file_input, { timeout: 15000 }).should('exist');
    cy.get(datos.selectors.file_input).selectFile(datos.data.heavy_wav);
    cy.contains('el máximo permitido es 4MB', { timeout: 15000 }).should('be.visible');
  });

  it('Validar conversión de archivo', () => {
    const filename = 'converted_light.wav';
    cy.get(datos.selectors.file_input, { timeout: 15000 }).should('exist');
    cy.get(datos.selectors.file_input).selectFile(datos.data.light_wav);
    cy.get(datos.selectors.filename, { timeout: 15000 }).should('be.visible');
    cy.contains('CONTROLES DE MODULACIÓN', { timeout: 15000 }).should('be.visible');
    const random_sample_rate = datos.selectors.selects.sample_rates[Math.floor(Math.random() * 9) + 1];
    const random_channels = datos.selectors.selects.channels[Math.floor(Math.random() * 5) + 1];
    const random_bit_depth = datos.selectors.selects.bit_depths[Math.floor(Math.random() * 4) + 1];
    cy.get(datos.selectors.sample_rate_select).click();
    cy.get(random_sample_rate).click();
    cy.get(datos.selectors.channels_select).click();
    cy.get(random_channels).click();
    cy.get(datos.selectors.bit_depth_select).click();
    cy.get(random_bit_depth).click();
    cy.get(datos.selectors.convert_button).click();
    cy.task('delete_file', { filePath: `${Cypress.config('downloads')}/${filename}`, timeout: 30000 }).then(
      (result) => {
        if (result) {
          cy.log(`Archivo '${filename}' eliminado exitosamente`);
        } else {
          cy.log(`Archivo '${filename}' no encontrado o eliminación fallida`);
        }
      },
    );
  });
});
