import datos from '../../fixtures/WAV_Decoder.json';

describe('Smoke Test WAV Decoder', () => {
  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
  });

  it('Validar estado del servicio', () => {
    cy.get(datos.selectors.check_health_button, { timeout: 15000 }).should('be.visible').click();
    cy.contains('El servicio está en línea y respondiendo.', { timeout: 80000 }).should('be.visible');
  });

  it('Validar limitación de tamaño de archivo', () => {
    cy.get(datos.selectors.file_input, { timeout: 15000 }).should('exist');
    cy.get(datos.selectors.file_input).selectFile(datos.data.heavy_wav);
    cy.contains('El archivo es demasiado grande', { timeout: 15000 }).should('be.visible');
  });

  it('Validar conversión de archivo', () => {
    cy.get(datos.selectors.file_input, { timeout: 15000 }).should('exist');
    cy.get(datos.selectors.file_input).selectFile(datos.data.light_wav);
    cy.contains('Información del archivo', { timeout: 15000 }).should('be.visible');
    cy.contains('Convertir audio', { timeout: 15000 }).should('be.visible');
    const random_sample_rate = datos.selectors.selects.sample_rates[Math.floor(Math.random() * 9) + 1];
    const random_channels = datos.selectors.selects.channels[Math.floor(Math.random() * 5) + 1];
    const random_bit_depth = datos.selectors.selects.bit_depths[Math.floor(Math.random() * 4) + 1];
    cy.get(datos.selectors.sample_rate_select).select(random_sample_rate);
    cy.get(datos.selectors.channels_select).select(random_channels);
    cy.get(datos.selectors.bit_depth_select).select(random_bit_depth);
    cy.get(datos.selectors.convert_button).click();
  });

  after(() => {
    cy.readFile('cypress/downloads/converted_light.wav', { timeout: 15000 }).then(() => {
      cy.exec('del cypress\\downloads\\converted_light.wav').then((result) => {
        if (result.code === 0) {
          cy.log('Archivo descargado eliminado exitosamente');
        } else {
          cy.log('Archivo no encontrado o eliminación fallida');
        }
      });
    });
  });
});
