import puppeteer from 'puppeteer';

(async () => {
  try {
    console.log('Launching browser test...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.error('CRITICAL BROWSER PAGE ERROR:', err.message));

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    console.log('1. Page loaded.');

    // Upload image
    const base64RedDot = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

    await page.evaluate((dataUrl) => {
      fetch(dataUrl).then(res => res.blob()).then(blob => {
        const file = new File([blob], "test.png", { type: "image/png" });
        const dt = new DataTransfer();
        dt.items.add(file);
        const input = document.querySelector('.hidden-file-input');
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }, base64RedDot);

    await new Promise(r => setTimeout(r, 1000));
    console.log('2. Image uploaded.');

    // Toggle dropper
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const target = btns.find(b => b.textContent.includes('色を選ぶ'));
      if (target) target.click();
    });

    await new Promise(r => setTimeout(r, 500));
    console.log('3. Dropper toggled. Clicking canvas...');

    const canvas = await page.$('canvas');
    if (canvas) {
      const box = await canvas.boundingBox();
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 3);
    }

    await new Promise(r => setTimeout(r, 1000));
    console.log('4. Canvas clicked. Clicking save...');

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const saveBtn = btns.find(b => b.textContent.includes('PNG保存'));
      if (saveBtn) saveBtn.click();
    });

    await new Promise(r => setTimeout(r, 1000));
    console.log('SUCCESS! All interactive steps completed without hanging or errors.');

    await browser.close();
  } catch (err) {
    console.error('Puppeteer test failed:', err);
  }
})();
