import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse/lib/pdf-parse.js'; // direct path to avoid internal test default

// Simple heuristic badge extractor: look for known certification issuers/keywords.
const KEYWORDS = [
  'Google', 'IBM', 'Cisco', 'Microsoft', 'ISC2', 'CertiProf', 'MongoDB', 'WorldQuant', 'Sage', 'Data Analytics', 'Cybersecurity', 'Project Management'
];

async function main() {
  const root = path.resolve(process.cwd(), '..');
  // Try to locate transcript PDF(s) at repo root (case-insensitive contains 'transcript')
  const candidates = fs.readdirSync(root).filter(f => /transcript.+\.pdf$/i.test(f));
  if (!candidates.length) {
    console.error('No transcript PDF matching pattern found at repo root.');
    process.exit(1);
  }
  const file = path.join(root, candidates[0]);
  const dataBuffer = fs.readFileSync(file);
  const pdfData = await pdfParse(dataBuffer);
  const lines = pdfData.text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // Collect lines containing any keyword, remove duplicates, and keep medium length lines
  const matches = Array.from(new Set(lines.filter(l => {
    if (l.length < 4 || l.length > 140) return false;
    return KEYWORDS.some(k => l.toLowerCase().includes(k.toLowerCase()));
  })));

  // Further clean: remove lines that are obviously codes or all caps short codes
  const cleaned = matches.filter(l => !/^[A-Z0-9]{2,10}$/.test(l));

  console.log('\n=== Extracted Potential Badge / Course Lines ===');
  cleaned.forEach(l => console.log('- ' + l));
  console.log('\n(Review and map these to structured CERTIFICATIONS entries.)');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
