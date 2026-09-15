const fs = require('node:fs');
const path = require('node:path');

const outputPath = process.argv[2];
const files = process.argv.slice(3);
if (!outputPath || files.length === 0) throw new Error('Usage: node source-metrics.cjs <output.json> <html>...');

const metrics = files.map((file) => {
  const source = fs.readFileSync(file, 'utf8');
  const markup = source.replace(/<script[\s\S]*?<\/script>/g, '');
  const staticIdentities = [...markup.matchAll(/data-ref="([^"]+)"/g)].map((match) => match[1]);
  const assignedIdentities = [...source.matchAll(/dataset\.ref\s*=\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
  const identityMap = source.match(/const identities\s*=\s*\{([^}]+)\}/);
  const mappedIdentities = identityMap ? [...identityMap[1].matchAll(/:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]) : [];
  const logicalIdentities = [...staticIdentities, ...assignedIdentities, ...mappedIdentities];
  const scenarioBlock = source.match(/<script type="application\/json" data-reference-scenarios>([\s\S]*?)<\/script>/);
  const contract = scenarioBlock ? JSON.parse(scenarioBlock[1]) : null;
  return {
    file: path.basename(file),
    bytes: Buffer.byteLength(source),
    lines: source.split(/\r?\n/).length,
    styleBytes: [...source.matchAll(/<style>([\s\S]*?)<\/style>/g)].reduce((sum, match) => sum + Buffer.byteLength(match[1]), 0),
    executableScriptBytes: [...source.matchAll(/<script(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((sum, match) => sum + Buffer.byteLength(match[1]), 0),
    staticIdentityAnnotationCount: staticIdentities.length,
    staticIdentityKeyCount: new Set(staticIdentities).size,
    logicalExplicitIdentityKeyCount: new Set(logicalIdentities).size,
    harnessAnnotationCount: (source.match(/data-reference-harness=/g) || []).length,
    scenarioCount: contract?.scenarios?.length || 0,
    scenarioStepCount: contract?.scenarios?.reduce((sum, scenario) => sum + scenario.steps.length, 0) || 0
  };
});

fs.writeFileSync(outputPath, `${JSON.stringify({ generatedBy: 'tools/source-metrics.cjs', metrics }, null, 2)}\n`);
console.log(JSON.stringify(metrics, null, 2));
