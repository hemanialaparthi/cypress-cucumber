const fs = require("fs");

const jsonFile = "cypress/e2e/Inytes/reports/results.json";
const htmlFile = "cypress/e2e/Inytes/reports/results.html";

fs.readFile(jsonFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  const results = JSON.parse(data);
  let html = `<html><head><title>Cypress Test Report</title></head><body>`;
  html += `<h1>Test Execution Report</h1>`;
  html += `<pre>${JSON.stringify(results, null, 2)}</pre>`;
  html += `</body></html>`;

  fs.writeFile(htmlFile, html, (err) => {
    if (err) {
      console.error("Error writing HTML report:", err);
    } else {
      console.log(`Report saved: ${htmlFile}`);
    }
  });
});
