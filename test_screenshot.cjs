const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log("Navigating to http://localhost:3000/music-player-maker ...");
  await page.goto('http://localhost:3000/music-player-maker', { waitUntil: 'networkidle2' });

  // Wait for canvas to draw
  await new Promise(r => setTimeout(r, 1000));

  const artifactPath = '/Users/keijunishimura/.gemini/antigravity/brain/1c018478-ceda-4c02-a21d-8ddd627cf732/preview_screenshot.png';
  await page.screenshot({ path: artifactPath, fullPage: true });
  console.log("Screenshot saved to", artifactPath);

  await browser.close();
})();
