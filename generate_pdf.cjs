const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const htmlPath = path.resolve(__dirname, 'YEANA_Project_Paper.html');
const pdfPath = path.resolve(__dirname, 'YEANA_Project_Paper.pdf');

console.log('Using browser:', chromePath);
console.log('Input HTML:', htmlPath);
console.log('Output PDF:', pdfPath);

const args = [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdfPath}`,
  htmlPath
];

execFile(chromePath, args, (error, stdout, stderr) => {
  if (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
  console.log('PDF Generation output:', stdout, stderr);
  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log(`SUCCESS! Generated PDF: ${pdfPath} (${stats.size} bytes)`);
  } else {
    console.error('PDF file was not created.');
    process.exit(1);
  }
});
