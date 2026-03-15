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
      
      // Replace text-black with text-white
      content = content.replace(/text-black/g, 'text-white');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('./src/pages');
replaceInDir('./src/components');
console.log('text-black replaced successfully!');
