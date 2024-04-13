import HomePage from "../../fixtures/page_objects/home.page";
import CareersPage from "../../fixtures/page_objects/careers.page";
import JobDescriptionsPage from "../../fixtures/page_objects/job-descriptions.page";


describe("the suit covering the Careers functionality", () => {
  it("should navigate to Careers page and Job Description page", () => {
    cy.visit("/");
    HomePage.careersButton.click();
    cy.contains("h1", "Careers at Saviynt");

    CareersPage.jobDescriptionsButtons.first().click();
    cy.contains("h2", "Saviynt Job Listings");
  });

  it("should search a job from Job Description page", () => {
    cy.intercept("POST", "*/px.ads.linkedin.com/*").as("filteredItems");
    cy.visit("/careers/job-descriptions/");
    cy.wait("@filteredItems").its("response.statusCode").should("eq", 204);

    JobDescriptionsPage.jobsSearchInput.type("QA{enter}");
    JobDescriptionsPage.listOfVacancies
      .first()
      .should('be.visible')
      .invoke("removeAttr", "onclick")
      .click();

    cy.origin("https://jobs.lever.co", () => {
      const JobDescriptionPage = Cypress.require(
        "../../fixtures/page_objects/job-description.page"
      );
      cy.contains(/qa|sdet/i);
      JobDescriptionPage.applyForAJobButton.each(($button) =>
        cy.wrap($button).should("be.visible")
      );
    });
  });
});
