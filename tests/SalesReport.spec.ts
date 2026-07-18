import { test } from '@playwright/test';
import { SalesReportPage } from '../pages/SalesReportPage';

test('SalesReport', async ({ page }) => {

  const salesReport = new SalesReportPage(page);

  await salesReport.login();

  await salesReport.openSalesReport();

  const frame = await salesReport.getFrame();

  await salesReport.setDateRange(frame);

  await salesReport.selectInvoiceStatus(frame);

  await page.waitForTimeout(2000);

  await salesReport.selectPatient(frame);

  const data = await salesReport.getHoverDetails(frame);

  console.log(data.popupText1);
  console.log(data.popupText2);
  console.log(data.popupText3);
});