import HomePage from "../../fixtures/page_objects/home.page";
import AnalystReportPage from "../../fixtures/page_objects/analyst-reports.page";

describe("the suit covering the Analyst-report page", () => {
  it("should go to Analyst-reports page", () => {
    cy.visit("/");
    HomePage.AnalystReportsButton.click();
    cy.contains(".current-taxonomy", "content hub");
    cy.contains("h1", "Analyst Reports");
  });

  it("should filter reports and open one", () => {
    cy.intercept('POST', '/wp-json/content-hub/filter').as('filteredResults');
    cy.visit("/content-hub-term/content-type/analyst-reports/");
    cy.waitForStableDOM(({ pollInterval: 1000, timeout: 10000 }));

    AnalystReportPage.getAagFilterCounter().then(filterCounter => {
        AnalystReportPage.aagFilterCheckbox.click();
        cy.waitForStableDOM(({ pollInterval: 1000, timeout: 10000 }));        
        AnalystReportPage.getResultsCounter().then(resultsCounter => {
            expect(resultsCounter).to.eq(filterCounter);
        })
    })
  });
});
