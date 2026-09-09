const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  console.log("Navigating to http://localhost:3000/trackpic ...");
  await page.goto('http://localhost:3000/trackpic', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Upload dummy image via input
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) {
    await fileInput.uploadFile('/Users/keijunishimura/.gemini/antigravity/brain/1c018478-ceda-4c02-a21d-8ddd627cf732/media__1788948571206.jpg');
    await new Promise(r => setTimeout(r, 1000));
  }

  // Open color tab
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.mobile-tool'));
    const colorBtn = btns.find(b => b.textContent.includes('カラー'));
    if (colorBtn) colorBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Click dropper button
  await page.evaluate(() => {
    const btn = document.querySelector('.mobile-sheet button');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  const artifactPath = '/Users/keijunishimura/.gemini/antigravity/brain/1c018478-ceda-4c02-a21d-8ddd627cf732/preview_screenshot.png';
  await page.screenshot({ path: artifactPath, fullPage: true });
  console.log("Screenshot saved to", artifactPath);

  await browser.close();
})();
