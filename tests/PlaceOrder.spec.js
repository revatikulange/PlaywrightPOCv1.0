const {test, expect} = require('@playwright/test');
const {POManager} = require('../pages/POManager');
const { type } = require('node:os');

//Json->string->js object
const dataset =  JSON.parse(JSON.stringify(require("../utils/testdata.json")));
console.log(dataset);
console.log(dataset.username);
console.log(typeof dataset.username);

test("Place an order", async ({page})=>
{
  const poManager = new POManager(page);
   //js file- Login js, DashboardPage

   //Login to application
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataset.username,dataset.password);

    //Search product on dashboard & Add to cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataset.productName);

    //Navigate to Cart page & check if product added to cart
    await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(dataset.productName);

   //Place an order & get order id
   await cartPage.Checkout();
   const ordersReviewPage = poManager.getOrdersReviewPage();
   await ordersReviewPage.searchCountryAndSelect("ind","India");
   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  //Navigate to Orderhistory page & check if above order id present on page
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});










