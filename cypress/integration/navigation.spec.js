describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});

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
  })
/*
  it("should cancel an interview", () => {
    cy.visit("/");
  })*/
})