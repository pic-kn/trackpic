import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.error('BROWSER PAGE ERROR:', err));

    await page.setViewport({ width: 1440, height: 960 });
    await page.goto('http://localhost:3000/music-player-maker/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    
    await page.screenshot({ path: 'preview_screenshot.png', fullPage: true });
    console.log('Dev Screenshot saved successfully.');
    await browser.close();
  } catch (err) {
    console.error('Puppeteer screenshot failed:', err);
  }
})();
