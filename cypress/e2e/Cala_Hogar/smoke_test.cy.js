import datos from '../../fixtures/Cala_Hogar.json';

const inputs_to_manage = {
  article: ['title', 'price', 'description'],
  promotion: ['title', 'code', 'percent'],
};

describe('Navegación a Cala Hogar (pública)', () => {
  it('Debería navegar a la URL base y ver el catálogo', () => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
    cy.scrollTo('bottom');
    cy.get(datos.catalog_button).should('be.visible').click();
    cy.url().should('include', '/catalog');
    cy.contains('Catálogo', { timeout: 20000 }).should('be.visible');
  });
});

describe('Navegación a Cala Hogar (admin)', () => {
  let promo_id, article_id;

  beforeEach(() => {
    cy.env(['CALA_HOGAR_ADMIN_LOGIN', 'CALA_HOGAR_ADMIN_URL', 'CALA_HOGAR_USER', 'CALA_HOGAR_PASSWORD']).then(
      ({ CALA_HOGAR_ADMIN_LOGIN, CALA_HOGAR_ADMIN_URL, CALA_HOGAR_USER, CALA_HOGAR_PASSWORD }) => {
        cy.session(CALA_HOGAR_USER, () => {
          cy.visit(CALA_HOGAR_ADMIN_LOGIN);
          cy.get(datos.selectors.login.username).should('be.visible').type(CALA_HOGAR_USER);
          cy.get(datos.selectors.login.password).should('be.visible').type(CALA_HOGAR_PASSWORD);
          cy.click_buttons([datos.selectors.login.login_button]);
          cy.contains('Bienvenido', { timeout: 10000 }).should('be.visible');
          cy.contains('Panel de Administración', { timeout: 10000 }).should('be.visible');
          cy.url().should('not.include', '/login');
        });
        cy.visit(CALA_HOGAR_ADMIN_URL);
      },
    );
  });

  it('Debería poder navegar a las distintas pantallas', () => {
    cy.click_buttons([datos.selectors.navigations.create_article]);
    cy.url().should('include', '/panel/crear-articulo');
    cy.click_buttons([datos.selectors.navigations.manage_articles]);
    cy.url().should('include', '/panel/gestionar-articulos');
    cy.click_buttons([datos.selectors.navigations.create_promotion]);
    cy.url().should('include', '/panel/crear-promocion');
    cy.click_buttons([datos.selectors.navigations.manage_promotions]);
    cy.url().should('include', '/panel/promociones');
  });

  it('Debería crear un artículo', () => {
    const inputs_data = inputs_to_manage.article.map((field) => ({
      selector: datos.selectors.create_article[field],
      value: datos.article_data[field],
    }));
    cy.click_buttons([datos.selectors.navigations.create_article]);
    cy.llenar_inputs(inputs_data);
    cy.get(datos.selectors.create_article.image).selectFile(datos.article_data.image, { force: true });
    cy.click_buttons([datos.selectors.create_article.create_button]);
    cy.contains('Artículo creado', { timeout: 20000 }).should('be.visible');
  });

  it('Debería crear una promoción', () => {
    const inputs_data = inputs_to_manage.promotion.map((field) => ({
      selector: datos.selectors.create_promotion[field],
      value: datos.promotion_data[field],
    }));
    cy.click_buttons([datos.selectors.navigations.create_promotion]);
    cy.llenar_inputs(inputs_data);
    cy.get(datos.selectors.create_promotion.products_select).click();
    datos.promotion_data.products.forEach((product) => {
      cy.contains('[role="option"]', product).click();
    });
    cy.click_buttons([datos.selectors.create_promotion.create_button]);
    cy.contains('Promoción creada', { timeout: 20000 }).should('be.visible');
  });

  it('Debería editar una promoción', () => {
    const edits_data = inputs_to_manage.promotion.map((field) => ({
      selector: datos.selectors.edit_promotion[field],
      value: datos.promotion_edit[field],
    }));
    cy.click_buttons([datos.selectors.navigations.manage_promotions]);
    cy.get(datos.selectors.manage_promotion.edit_button)
      .first()
      .invoke('attr', 'id')
      .then((id) => {
        promo_id = id.replace('btn-edit-promotion-', '');
        cy.visit(`${datos.base_url}admin/panel/promociones/${promo_id}/editar`);
      });
    cy.limpiar_inputs(inputs_to_manage.promotion.map((field) => datos.selectors.edit_promotion[field]));
    cy.llenar_inputs(edits_data);
    cy.get(datos.selectors.edit_promotion.products_select).click();
    datos.promotion_edit.products.forEach((product) => {
      cy.contains('[role="option"]', product).click();
    });
    cy.click_buttons([datos.selectors.edit_promotion.update_button]);
    cy.contains('Promoción actualizada', { timeout: 20000 }).should('be.visible');
    cy.contains(datos.promotion_edit.title, { timeout: 20000 }).should('be.visible');
  });

  it('Debería poder eliminar una promoción', () => {
    cy.click_buttons([datos.selectors.navigations.manage_promotions]);
    cy.get(`#btn-delete-promotion-${promo_id}`).click();
    cy.click_buttons([datos.selectors.manage_promotion.confirm_delete_button]);
    cy.contains('Promoción eliminada', { timeout: 20000 }).should('be.visible');
  });

  it('Debería poder editar un artículo', () => {
    const edits_data = inputs_to_manage.article.map((field) => ({
      selector: datos.selectors.edit_article[field],
      value: datos.article_edit[field],
    }));
    cy.click_buttons([datos.selectors.navigations.manage_articles]);
    cy.get(datos.selectors.manage_article.edit_button)
      .first()
      .invoke('attr', 'id')
      .then((id) => {
        article_id = id.replace('admin-article-card-', '').replace('-edit-btn', '');
        cy.env(['CALA_HOGAR_ADMIN_URL']).then(({ CALA_HOGAR_ADMIN_URL }) => {
          cy.visit(`${CALA_HOGAR_ADMIN_URL}/gestionar-articulos/${article_id}/editar`);
        });
      });
    cy.limpiar_inputs(inputs_to_manage.article.map((field) => datos.selectors.edit_article[field]));
    cy.llenar_inputs(edits_data);
    cy.get(datos.selectors.edit_article.state).select(datos.selectors.edit_article.state_option[0]);
    cy.get(datos.selectors.create_article.image).selectFile(datos.article_edit.image, { force: true });
    cy.click_buttons([datos.selectors.edit_article.update_button]);
    cy.contains('Cambios guardados', { timeout: 20000 }).should('be.visible');
    cy.contains('Sin stock', { timeout: 20000 }).should('be.visible');
    cy.contains(datos.article_edit.title, { timeout: 20000 }).should('be.visible');
  });

  it('Debería poder eliminar un artículo', () => {
    cy.click_buttons([datos.selectors.navigations.manage_articles]);
    cy.get(`[id="admin-article-card-${article_id}-delete-btn"]`).click();
    cy.click_buttons([datos.selectors.manage_article.confirm_delete_button]);
    cy.contains('Artículo eliminado', { timeout: 20000 }).should('be.visible');
  });

  it('Debería poder cerrar sesión', () => {
    cy.env(['CALA_HOGAR_ADMIN_LOGIN']).then(({ CALA_HOGAR_ADMIN_LOGIN }) => {
      cy.click_buttons([datos.selectors.navigations.logout, datos.selectors.navigations.confirm_logout]);
      cy.url().should('eq', CALA_HOGAR_ADMIN_LOGIN);
    });
  });
});
