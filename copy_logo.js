const fs = require('fs');
const path = require('path');
const src = './public/img/logo.png'; 
const destDir = 'e:\\SS INFOTECH WEBSITE\\website\\Public\\images\\logos';
const destPng = path.join(destDir, 'logo.png');
const destJpg = path.join(destDir, 'logo.jpg');
const jsDest = 'e:\\SS INFOTECH WEBSITE\\website\\src\\components\\logoData.js';

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const buffer = fs.readFileSync(src);
  fs.writeFileSync(destPng, buffer);
  fs.writeFileSync(destJpg, buffer);
  console.log('Successfully copied binary image to logo.png and logo.jpg');

  const base64 = buffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64}`;

  const jsContent = `export const SS_INFOTECH_LOGO_BASE64 = "${dataUrl}";\n`;
  const jsDir = path.dirname(jsDest);
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
  }
  fs.writeFileSync(jsDest, jsContent);
  console.log('Successfully created logoData.js with base64 string');
} catch (err) {
  console.error('Error executing copy script:', err);
  process.exit(1);
}
