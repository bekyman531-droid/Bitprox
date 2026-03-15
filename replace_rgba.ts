import fs from 'fs';
import path from 'path';

function replaceInDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace rgba(250,204,21 with rgba(6,182,212
      content = content.replace(/rgba\(250,204,21/g, 'rgba(6,182,212');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('./src/pages');
replaceInDir('./src/components');
console.log('Colors replaced successfully!');
