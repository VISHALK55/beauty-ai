const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  try {
    let executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    if (!fs.existsSync(executablePath)) {
      executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    }

    const browser = await puppeteer.launch({
      executablePath: executablePath,
      headless: true
    });
    const page = await browser.newPage();
    
    // 1. Admin Dashboard
    console.log('Taking screenshot of Admin Dashboard...');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://restaurant-system-frontend-443496863115.s3-website-us-east-1.amazonaws.com/admin.html', {waitUntil: 'networkidle2', timeout: 30000});
    // Wait an extra second for any animations
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: 'Admin_Dashboard.png'});

    // 2. KOT Screen
    console.log('Taking screenshot of KOT Screen...');
    await page.goto('http://restaurant-system-frontend-443496863115.s3-website-us-east-1.amazonaws.com/kot.html', {waitUntil: 'networkidle2', timeout: 30000});
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: 'KOT_Screen.png'});

    // 3. Mobile QR Screen (Guest View)
    console.log('Taking screenshot of Mobile View...');
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.goto('http://restaurant-system-frontend-443496863115.s3-website-us-east-1.amazonaws.com/index.html', {waitUntil: 'networkidle2', timeout: 30000});
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: 'Mobile_QR_Code_Screen.png'});

    await browser.close();
    console.log('Screenshots captured successfully!');
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  }
})();
