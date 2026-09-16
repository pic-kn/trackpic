const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Monitor console logs for GA events or errors
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.toString()));

  console.log("Navigating to http://localhost:3000/trackpic ...");
  await page.goto('http://localhost:3000/trackpic', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Check window.gtag definition
  const hasGtag = await page.evaluate(() => typeof window.gtag === 'function');
  console.log("window.gtag function present:", hasGtag);

  await browser.close();
})();
