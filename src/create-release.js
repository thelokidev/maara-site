#!/usr/bin/env node

/**
 * Helper script to create a GitHub release with the Maara installer
 * Run this after setting up your GitHub token
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Maara Release Creator');
console.log('========================\n');

// Check if installer exists
const installerPath = path.join(__dirname, 'Maara-1.0.3-Setup.exe');

if (fs.existsSync(installerPath)) {
  const stats = fs.statSync(installerPath);
  console.log(`✅ Found installer: ${installerPath}`);
  console.log(`📏 File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB\n`);
} else {
  console.log('❌ Installer not found at:', installerPath);
  console.log('Please ensure Maara-1.0.3-Setup.exe is in the src directory\n');
}

console.log('📋 Next Steps:');
console.log('1. Go to: https://github.com/thelokidev/maara-site/releases/new');
console.log('2. Tag version: v1.0.3');
console.log('3. Title: Maara v1.0.3 - Windows Installer');
console.log('4. Upload the Maara-1.0.3-Setup.exe file');
console.log('5. Click "Publish release"');
console.log('\n✨ After publishing, your download section will automatically update!\n');

console.log('🔗 Test your API endpoint:');
console.log('GET http://localhost:9002/api/github/releases');
console.log('(Make sure your .env.local has the GitHub configuration)\n');
