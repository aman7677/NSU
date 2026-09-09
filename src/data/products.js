export const productFilters = [
  { id: 'all', label: 'All' },
  { id: 'sindoor', label: 'Sindoor' },
  { id: 'fluorescent', label: 'Fluorescent' },
  { id: 'colour-powder', label: 'Colour Powder' },
  { id: 'custom', label: 'Custom' },
]

// Shared, approved application context for the fluorescent pigment range.
// Product-specific technical values remain unfilled until NSU documentation is available.
export const fluorescentApplications = [
  'Fluorescent pigment powder',
  'Water Based Paints',
  'Solvent Based Paints',
  'Aerosol Spray Paints',
  'Paper Coating',
  'PVC Coating',
  'Gravure Coating',
  'Industrial Markers',
  'Highlighter Ink',
  'Crack Detection',
  'Leak Detection',
  'Security Pigments',
  'Paint Balls',
  'Poster Colours',
]

export const fluorescentApplicationSummary = fluorescentApplications.join(', ')

export const emptyFluorescentTechnicalSpecifications = {
  physicalForm: null,
  particleSize: null,
  heatStability: null,
  lightFastness: null,
  moisture: null,
  recommendedDosage: null,
  packaging: null,
  storage: null,
}

const createFluorescentProduct = ({ name, grade, shade }) => {
  const slug = `fluorescent-${shade.toLowerCase().replaceAll(' ', '-')}-${grade}`

  return {
    id: slug,
    slug,
    name,
    grade: String(grade),
    code: String(grade),
    shade,
    colour: shade,
    category: 'Fluorescent Pigments',
    filter: 'fluorescent',
    description: `NSU ${shade} fluorescent pigment for application-led colour requirements.`,
    applications: fluorescentApplications,
    application: fluorescentApplicationSummary,
    tags: fluorescentApplications,
    technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications },
    tds: null,
    sds: null,
    coa: null,
    seoTitle: `${name} ${grade} | Fluorescent Pigment`,
    metaDescription: `Explore ${name} grade ${grade}, shade ${shade}, from NSU Fluorescent Pigments for application-led colour requirements.`,
    pigment: null,
  }
}

export const nsuFluorescentPigments = [
  createFluorescentProduct({
    name: 'NSU Fluorescent Lemon Yellow',
    grade: 418,
    shade: 'Lemon Yellow',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Green',
    grade: 435,
    shade: 'Green',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Pink',
    grade: 435,
    shade: 'Pink',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Golden Yellow',
    grade: 515,
    shade: 'Golden Yellow',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Red Orange',
    grade: 515,
    shade: 'Red Orange',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Orange',
    grade: 520,
    shade: 'Orange',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Violet',
    grade: 430,
    shade: 'Violet',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Red Violet',
    grade: 430,
    shade: 'Red Violet',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Magenta',
    grade: 430,
    shade: 'Magenta',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Blood Red',
    grade: 498,
    shade: 'Blood Red',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Scarlet Red',
    grade: 530,
    shade: 'Scarlet Red',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Royal Blue',
    grade: 430,
    shade: 'Royal Blue',
  }),
  createFluorescentProduct({
    name: 'NSU Fluorescent Tor Blue',
    grade: 430,
    shade: 'Tor Blue',
  }),
]

export const products = [
  { id: 'sindoor-red', name: 'Red Sindoor Colour', category: 'Sindoor Colour', colour: 'Classic red', application: 'Sindhoor, Rangoli, Holi colours & traditional colour products', description: 'A vivid red colour option suited to traditional sindhoor applications, rangoli preparations, and festive colour products with a direct, recognisable visual character.', filter: 'sindoor', pigment: '#d91818', tags: ['Sindhoor', 'Rangoli', 'Holi', 'Idol Coating', 'Poster Colours'] },
  { id: 'sindoor-bright-red', name: 'Bright Red Sindoor', category: 'Sindoor Colour', colour: 'Bright red', application: 'Sindhoor, Rangoli, Holi colours & festive colour products', description: 'A high-impact bright red shade for sindhoor, rangoli, and holi colour applications where a more immediate colour impression is needed.', filter: 'sindoor', pigment: '#ff3220', tags: ['Sindhoor', 'Rangoli', 'Holi', 'Idol Coating'] },
  { id: 'sindoor-deep-red', name: 'Deep Red Sindoor', category: 'Sindoor Colour', colour: 'Deep red', application: 'Sindhoor, Rangoli & traditional colour products', description: 'A deeper red direction with visual richness, suited to premium sindhoor formulations, rangoli, and traditional idol coating colour applications.', filter: 'sindoor', pigment: '#850414', tags: ['Sindhoor', 'Rangoli', 'Idol Coating'] },
  { id: 'sindoor-orange', name: 'Orange Sindoor', category: 'Sindoor Colour', colour: 'Orange', application: 'Sindhoor, Rangoli, Holi colours & traditional colour products', description: 'A warm orange sindhoor shade with a vibrant, distinctive finish ideal for traditional sindhoor, holi colour, and festive rangoli applications.', filter: 'sindoor', pigment: '#ff761c', tags: ['Sindhoor', 'Rangoli', 'Holi', 'Idol Coating'] },
  { id: 'asdbn-11', name: 'Yellow (ASDBN-11)', category: 'Colour Powder', colour: 'Yellow (ASDBN-11)', application: 'Water based paints, solvent based paints, poster colours, paper coating, rangoli, holi & general colour applications', description: 'A bright yellow pigment powder suited for water based paints, solvent based paints, poster colours, aerosol spray paints, paper coating, wax crayons, rangoli, holi colour, and a range of general colour applications.', filter: 'colour-powder', pigment: '#f5d347', code: 'ASDBN-11', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Clay Coating', 'Seed Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Clay Dough', 'Soap'] },
  { id: 'asdbn-16', name: 'Red (ASDBN-16)', category: 'Colour Powder', colour: 'Red (ASDBN-16)', application: 'Water based paints, solvent based paints, poster colours, paper coating, rangoli, holi & traditional colour applications', description: 'A strong red pigment powder with classic visual impact, designed for water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, rangoli, holi colour, and dependable colour coverage across surfaces.', filter: 'colour-powder', pigment: '#d91818', code: 'ASDBN-16', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'PVC Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap', 'Sindhoor'] },
  { id: 'asdbn-02', name: 'Green (ASDBN-02)', category: 'Colour Powder', colour: 'Green (ASDBN-02)', application: 'Water based paints, solvent based paints, poster colours, paper coating, rangoli & general colour applications', description: 'A fresh green pigment powder tone for eye-catching use in water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, wax crayons, rangoli, and vibrant decorative applications.', filter: 'colour-powder', pigment: '#3ca65d', code: 'ASDBN-02', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Seed Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Clay Dough'] },
  { id: 'asdbn-17', name: 'Pink (ASDBN-17)', category: 'Colour Powder', colour: 'Pink (ASDBN-17)', application: 'Water based paints, solvent based paints, poster colours, rangoli, holi & decorative colour applications', description: 'A vivid pink pigment powder with a soft yet striking colour presence, suited to water based paints, solvent based paints, aerosol spray paints, poster colours, holi colours, and decorative products.', filter: 'colour-powder', pigment: '#f06ca8', code: 'ASDBN-17', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap', 'Clay Dough'] },
  { id: 'asdbn-12', name: 'Green (ASDBN-12)', category: 'Fluorescent Pigments', colour: 'Green (ASDBN-12)', application: 'Fluorescent pigment powder for application-led colour requirements', description: 'Green fluorescent pigment powder for application-led colour requirements. Review the intended use with the NSU team.', filter: 'fluorescent', pigment: '#70ed27', code: 'ASDBN-12', tags: ['Fluorescent Pigment Powder', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Paper Coating'] },
  { id: 'asdbn-18', name: 'Magenta (ASDBN-18)', category: 'Colour Powder', colour: 'Magenta (ASDBN-18)', application: 'Water based paints, solvent based paints, poster colours, textile colouring & expressive colour applications', description: 'A saturated magenta pigment powder for expressive, attention-led colour use in water based paints, solvent based paints, aerosol spray paints, poster colours, textile colouring, and vibrant product surfaces.', filter: 'colour-powder', pigment: '#d91179', code: 'ASDBN-18', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'PVC Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap'] },
  { id: 'asdbn-13', name: 'Chrome (ASDBN-13)', category: 'Colour Powder', colour: 'Chrome (ASDBN-13)', application: 'Metallic finishes, solvent based paints, aerosol spray paints & polished surface applications', description: 'A high-lustre chrome tone pigment powder suited to metallic and polished visual finishes in solvent based paints, aerosol spray paints, PVC coating, candles, and decorative surface applications.', filter: 'colour-powder', pigment: '#b7b7b7', code: 'ASDBN-13', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'PVC Coating', 'Gravure Coating', 'Candles', 'Clay Dough'] },
  { id: 'asdbn-19', name: 'Red Violet (ASDBN-19)', category: 'Colour Powder', colour: 'Red Violet (ASDBN-19)', application: 'Water based paints, solvent based paints, poster colours, rangoli & decorative colour applications', description: 'A deep red-violet pigment powder direction with rich tone, ideal for water based paints, solvent based paints, aerosol spray paints, poster colours, rangoli, and decorative colour applications.', filter: 'colour-powder', pigment: '#8d3b8a', code: 'ASDBN-19', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles'] },
  { id: 'asdbn-04', name: 'Orange (ASDBN-04)', category: 'Colour Powder', colour: 'Orange (ASDBN-04)', application: 'Water based paints, solvent based paints, poster colours, holi colours & vibrant surface applications', description: 'A warm orange pigment powder designed to add energy and brightness to water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, holi colour products, and decorative surfaces.', filter: 'colour-powder', pigment: '#ff761c', code: 'ASDBN-04', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Clay Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap'] },
  { id: 'asdbn-20', name: 'Royal Blue (ASDBN-20)', category: 'Colour Powder', colour: 'Royal Blue (ASDBN-20)', application: 'Water based paints, solvent based paints, poster colours & premium colour applications', description: 'A rich royal blue pigment powder tone with depth, clarity, and premium presentation for water based paints, solvent based paints, aerosol spray paints, poster colours, and high-end decorative products.', filter: 'colour-powder', pigment: '#2d4fb2', code: 'ASDBN-20', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Gravure Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles'] },
  { id: 'asdbn-14', name: 'Orange R (ASDBN-14)', category: 'Fluorescent Pigments', colour: 'Orange R (ASDBN-14)', application: 'Fluorescent pigment powder for application-led colour requirements', description: 'Orange R fluorescent pigment powder for application-led colour requirements. Review the intended use with the NSU team.', filter: 'fluorescent', pigment: '#ff6a2a', code: 'ASDBN-14', tags: ['Fluorescent Pigment Powder', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Paper Coating'] },
  { id: 'asdbn-15', name: 'Red Orange (ASDBN-15)', category: 'Colour Powder', colour: 'Red Orange (ASDBN-15)', application: 'Water based paints, solvent based paints, poster colours, holi colours & traditional colour applications', description: 'A warm red-orange pigment powder that balances vibrancy with a rich, traditional finish for water based paints, solvent based paints, aerosol spray paints, poster colours, holi colour, and rangoli applications.', filter: 'colour-powder', pigment: '#e65a2c', code: 'ASDBN-15', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'PVC Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap'] },
  ...nsuFluorescentPigments,
]
