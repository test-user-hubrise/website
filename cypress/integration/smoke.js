describe(`website`, () => {
  it(`doesn't crash and burn`, () => {
    cy.visit(`/`)
  })

  it(`renders elements, allows interaction and navigation between various pages`, () => {
    cy.viewport(1024, 660)

    cy.visit(`/`)
    cy.contains(`form`, `Create your account`)
    cy.contains(`HubRise makes POS integration easy`)
    cy.contains(`li`, `Developers`).click()
    cy.contains(`Contact us`).click()
    cy.get(`div[role="dialog"]`).should(`be.visible`)

    cy.visit(`/fr`)
    cy.contains(`form`, `Créer votre compte`)
    cy.contains(`li`, `Apps`).click()
    cy.contains(`LivePepper`)

    cy.visit(`/fr/api/catalog-management`)
    cy.get(`h2#skus a`).click()
    cy.url().should(`include`, `#skus`)
  })
})
