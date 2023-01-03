
describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  });

  it("should book an interview", () => {
    cy.visit("/");
    cy.get('[alt="Add"]:visible')
      .click();
    cy.get("[data-testid=student-name-input]")
      .type("Bob Jones");
    cy.get('[alt="Tori Malcolm"]')
      .click();
    cy.contains('Save')
      .click();

    cy.contains('Bob Jones');
    cy.contains('Tori Malcolm');    
      
  })

  it("should edit an interview", () => {
    cy.visit("/");
    cy.get('[alt="Edit"]')
      .invoke('show')
      .click();
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Bob Jones");
      cy.get('[alt="Tori Malcolm"]')
      .click();
    cy.contains('Save')
      .click();
    
    cy.contains('Bob Jones');
    cy.contains('Tori Malcolm');    
     
  })

  it("should cancel an interview", () => {
    cy.visit("/");
    cy.get('[alt="Delete"]')
      .invoke('show')
      .click();
    cy.contains("Confirm")
      .click();


    cy.contains("Archie Cohen").should('not.exist');
  });
});