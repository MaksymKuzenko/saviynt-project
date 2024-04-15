import HomePage from "../../fixtures/page_objects/home.page";
import CareersPage from "../../fixtures/page_objects/careers.page";
import JobDescriptionsItemPage from "../../fixtures/page_objects/job-descriptions-item.page";

describe("the suit covering the Careers functionality", () => {
  it("should navigate to Careers page and Job Description page", () => {
    cy.visit("/");
    HomePage.careersButton.click();
    cy.contains("h1", "Careers at Saviynt");

    CareersPage.jobDescriptionsButtons.first().click();
    cy.contains("h2", "Saviynt Job Listings");
  });

  it("should search a job from Job Description page", () => {
    cy.intercept("*/px.ads.linkedin.com/*").as("filteredItems")
    cy.visit("/careers/job-descriptions/");
    JobDescriptionsPage.jobsSearchInput.type("QA");
    cy.wait("@filteredItems");
    JobDescriptionsPage.listOfVacancies
      .first()
      .invoke("removeAttr", "onclick")
      .click();

    cy.origin("https://jobs.lever.co", () => {
      const JobDescriptionsItemPage = Cypress.require(
        "../../fixtures/page_objects/job-description.page"
      );
      cy.contains(/qa|sdet/i).should('be.visible');
      JobDescriptionsItemPage.applyForAJobButton.each(($button) =>
        cy.wrap($button).should("be.visible")
      );
    });
  });
});
