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
      
      // Replace yellow with cyan
      content = content.replace(/yellow-500/g, 'cyan-500');
      content = content.replace(/yellow-400/g, 'cyan-400');
      content = content.replace(/yellow-600/g, 'blue-600');
      content = content.replace(/yellow/g, 'cyan');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('./src/pages');
replaceInDir('./src/components');
console.log('Colors replaced successfully!');
