const fs = require('node:fs');
const path = require('node:path');

const sourcePath = process.argv[2];
const outputDirectory = process.argv[3];
if (!sourcePath || !outputDirectory) {
  throw new Error('Usage: node make-negatives.cjs <target.html> <output-directory>');
}

const source = fs.readFileSync(sourcePath, 'utf8');
fs.mkdirSync(outputDirectory, { recursive: true });

const mutations = {
  'focus-regressed.html': [
    ['--keyboard: #75abe0;', '--keyboard: #d91c8c;']
  ],
  'completion-regressed.html': [
    ['this.recover(); this.hide(); this.suppressOpen = true;', 'this.recover(); this.suppressOpen = true;']
  ],
  'partial-regressed.html': [
    ['this.nodes.confirm.disabled = !(this.state.draftStart || this.state.draftEnd);', 'this.nodes.confirm.disabled = !(this.state.draftStart && this.state.draftEnd);']
  ],
  'validation-regressed.html': [
    ["fail(text) { this.nodes.input.setAttribute('aria-invalid', 'true'); this.nodes.input.setCustomValidity(text); this.nodes.problem.textContent = text; this.nodes.problem.hidden = false; }", "fail() { this.nodes.input.removeAttribute('aria-invalid'); this.nodes.input.setCustomValidity(''); this.nodes.problem.textContent = ''; this.nodes.problem.hidden = true; }"]
  ],
  'availability-regressed.html': [
    ['if (value > MaintenanceWindowPicker.TODAY) cell.disabled = true;', 'if (false) cell.disabled = true;']
  ],
  'range-visual-regressed.html': [
    ['.calendar-number.inside-span { color: #173e5f; background: #d6eafa;', '.calendar-number.inside-span { color: #173e5f; background: #f4c1cb;']
  ]
};

for (const [name, replacements] of Object.entries(mutations)) {
  let output = source;
  for (const [before, after] of replacements) {
    if (!output.includes(before)) throw new Error(`${name}: mutation source not found: ${before}`);
    output = output.replace(before, after);
  }
  output = output.replace('<!doctype html>', `<!doctype html>\n<!-- Generated negative: ${name}; source ${path.basename(sourcePath)} -->`);
  fs.writeFileSync(path.join(outputDirectory, name), output);
  console.log(`generated ${name}`);
}
