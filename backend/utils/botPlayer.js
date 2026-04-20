const puppeteer = require("puppeteer");

const startBot = async (tableId) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("http://localhost:5173/tictactoe", {
    waitUntil: "networkidle2", // ✅ wait for React load
  });

  // ✅ WAIT FOR INPUTS
  await page.waitForSelector("input[placeholder='Enter Table ID']");
  await page.waitForSelector("input[placeholder='Enter User ID']");
  await page.waitForSelector("button");

  // ✅ NOW SAFE TO USE
  await page.evaluate((tableId) => {
    const tableInput = document.querySelector(
      "input[placeholder='Enter Table ID']"
    );
    const userInput = document.querySelector(
      "input[placeholder='Enter User ID']"
    );
    const btn = document.querySelector("button");

    if (!tableInput || !userInput || !btn) {
      console.log("Elements not found");
      return;
    }

    tableInput.value = tableId;
    userInput.value = "BOT_" + Math.floor(Math.random() * 1000);

    tableInput.dispatchEvent(new Event("input", { bubbles: true }));
    userInput.dispatchEvent(new Event("input", { bubbles: true }));

    btn.click();
  }, tableId);

  console.log("🤖 Bot joined via Chrome");

  return browser;
};

module.exports = startBot;