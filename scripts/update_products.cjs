const fs = require('fs');

let content = fs.readFileSync('src/data/products.js', 'utf8');

// The replacement logic will inject slug, grade, shade, technicalSpecifications, tds, sds, coa, seoTitle, metaDescription
const updatedContent = content.replace(/\{ id: '([^']+)', name: '([^']+)', category: '([^']+)', colour: '([^']+)', application: '([^']+)', description: '([^']+)', filter: '([^']+)', pigment: '([^']+)'(?:, code: '([^']+)')?, tags: (\[[^\]]+\]) \}/g, (match, id, name, category, colour, application, description, filter, pigment, code, tags) => {
  const slug = id;
  const seoTitle = `${name} | ${category}`;
  const metaDescription = description.replace(/'/g, '');
  const grade = code || 'Standard';
  const shade = colour;
  
  return `{ id: '${id}', slug: '${slug}', name: '${name}', grade: '${grade}', shade: '${shade}', category: '${category}', colour: '${colour}', application: '${application}', description: '${description}', filter: '${filter}', pigment: '${pigment}', code: ${code ? `'${code}'` : 'null'}, tags: ${tags}, technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: '${seoTitle}', metaDescription: '${metaDescription}' }`;
});

fs.writeFileSync('src/data/products.js', updatedContent);
