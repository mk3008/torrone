const fs = require('node:fs');

for (const file of process.argv.slice(2)) {
  const source = fs.readFileSync(file, 'utf8');
  const scripts = [...source.matchAll(/<script(?:\s+type="([^"]+)")?[^>]*>([\s\S]*?)<\/script>/g)];
  for (const [, type, body] of scripts) {
    if (type === 'application/json') JSON.parse(body);
    else new Function(body);
  }
  console.log(`${file}: scripts ok (${scripts.length})`);
}
