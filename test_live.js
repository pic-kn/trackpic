import puppeteer from 'puppeteer';

(async () => {
  try {
    console.log('Testing live GitHub Pages URL with request failure logs...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('requestfailed', request => {
      console.log('FAILED URL:', request.url(), request.failure()?.errorText);
    });

    page.on('response', response => {
      if (response.status() >= 400) {
        console.log('404 URL:', response.url(), response.status());
      }
    });

    await page.setViewport({ width: 1440, height: 960 });
    await page.goto('https://pic-kn.github.io/music-player-maker/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));

    await browser.close();
  } catch (err) {
    console.error('Puppeteer live test error:', err);
  }
})();
