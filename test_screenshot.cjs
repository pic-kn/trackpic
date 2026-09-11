const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log("Navigating to http://localhost:3000/trackpic ...");
  await page.goto('http://localhost:3000/trackpic', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Type a very long title into the title input field
  const titleInput = await page.$('input[value="青色がすき。"]');
  if (titleInput) {
    await titleInput.click({ clickCount: 3 });
    await titleInput.type('非常に長い楽曲タイトルのテストメッセージ（絶対にハートアイコンと被らないはずの長文テスト）');
    await new Promise(r => setTimeout(r, 800));
  }

  const artifactPath = '/Users/keijunishimura/.gemini/antigravity/brain/1c018478-ceda-4c02-a21d-8ddd627cf732/preview_screenshot.png';
  await page.screenshot({ path: artifactPath, fullPage: true });
  console.log("Screenshot saved to", artifactPath);

  await browser.close();
})();
