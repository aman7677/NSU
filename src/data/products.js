export const productFilters = [
  { id: 'all', label: 'All' },
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

export function getFluorescentReferenceTechnicalSpecifications(shade = '') {
  const normalizedShade = shade.toLowerCase()
  const isBlueOrViolet = normalizedShade.includes('blue') || normalizedShade.includes('violet')
  const isWarmShade = ['yellow', 'orange', 'red', 'pink', 'magenta'].some((colour) => normalizedShade.includes(colour))

  if (isWarmShade) {
    return {
      bulkDensity: '0.25 – 0.30 g/cm³',
      specificGravity: 'To be confirmed',
      softeningPoint: '130° – 140° C',
      particleSize: '2.5 – 4.0 μm',
      thermalStability: '210° C',
      oilAbsorptionValue: '50 – 60 g/100 g pigment',
      ph: '7 – 8',
    }
  }

  return {
    bulkDensity: '0.32 – 0.36 g/cm³',
    specificGravity: '1.35 – 1.40',
    softeningPoint: isBlueOrViolet ? '165° – 175° C' : '160° – 170° C',
    particleSize: isBlueOrViolet ? '4.5 – 6.0 μm' : '3.0 – 5.5 μm',
    thermalStability: isBlueOrViolet ? '230° C' : '210° – 230° C',
    oilAbsorptionValue: '50 – 60 g/100 g pigment',
    ph: '7 – 8',
  }
}

export function getReferenceTechnicalSpecifications({ category = '', shade = '' } = {}) {
  if (category === 'Fluorescent Pigments') {
    return getFluorescentReferenceTechnicalSpecifications(shade)
  }

  return {
    bulkDensity: '0.35 – 0.60 g/cm³',
    specificGravity: '1.2 – 1.6',
    softeningPoint: '130° – 180° C',
    particleSize: '2 – 10 μm',
    thermalStability: '180° – 230° C',
    oilAbsorptionValue: '40 – 70 g/100 g pigment',
    ph: '6 – 8',
  }
}

const createFluorescentProduct = ({ name, grade, shade }) => {
  const slug = `fluorescent-${shade.toLowerCase().replaceAll(' ', '-')}-${grade}`

  return {
    id: slug,
    slug,
    name: `${name} (ASDBN)`,
    grade: String(grade),
    code: String(grade),
    shade,
    colour: shade,
    category: 'Fluorescent Pigments',
    filter: 'fluorescent',
    description: `NSU ${shade} fluorescent pigment for application-led colour requirements.`,
    productDescription: 'ASDBN Pigments are thermoplastic fluorescent pigments recommended for use in a wide range of applications where resistance to strong solvents is not required. These are especially useful for water based systems. These pigments are non-toxic and contain no heavy metal constituents.',
    applications: fluorescentApplications,
    application: fluorescentApplicationSummary,
    tags: fluorescentApplications,
    technicalSpecifications: {
      ...getReferenceTechnicalSpecifications({ category: 'Fluorescent Pigments', shade }),
    },
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
    name: 'Fluorescent Lemon Yellow',
    grade: 418,
    shade: 'Lemon Yellow',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Green',
    grade: 435,
    shade: 'Green',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Pink',
    grade: 435,
    shade: 'Pink',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Golden Yellow',
    grade: 515,
    shade: 'Golden Yellow',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Red Orange',
    grade: 515,
    shade: 'Red Orange',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Orange',
    grade: 520,
    shade: 'Orange',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Violet',
    grade: 430,
    shade: 'Violet',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Red Violet',
    grade: 430,
    shade: 'Red Violet',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Magenta',
    grade: 430,
    shade: 'Magenta',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Blood Red',
    grade: 498,
    shade: 'Blood Red',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Scarlet Red',
    grade: 530,
    shade: 'Scarlet Red',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Royal Blue',
    grade: 430,
    shade: 'Royal Blue',
  }),
  createFluorescentProduct({
    name: 'Fluorescent Tor Blue',
    grade: 430,
    shade: 'Tor Blue',
  }),
]

const productDescriptions = {
  'asdbn-11': 'ASDBN Pigments are thermoplastic colour pigments well suited for water based and clay based systems. These pigments are non-toxic and contain no heavy metal constituents, making them ideal for seed coating, clay dough, soap making, rangoli, and holi colour preparations.',
  'asdbn-16': 'ASDBN Pigments are thermoplastic colour pigments designed for water based and PVC based coating systems. These pigments are non-toxic and contain no heavy metal constituents, making them well suited for sindur making, soap, rangoli, holi colours, and traditional colour applications.',
  'asdbn-02': 'ASDBN Pigments are thermoplastic colour pigments recommended for water based systems and seed coating applications. These pigments are non-toxic and contain no heavy metal constituents, suitable for clay dough, rangoli, holi colours, and decorative use.',
  'asdbn-17': 'ASDBN Pigments are thermoplastic colour pigments recommended for water based systems. These pigments are non-toxic and contain no heavy metal constituents, making them ideal for soap making, clay dough, rangoli, holi colours, and decorative colour applications.',
  'asdbn-12': 'ASDBN Pigments are thermoplastic fluorescent pigments recommended for solvent based and aerosol spray systems. These pigments are non-toxic and contain no heavy metal constituents, designed for paper coating and high-visibility colour applications.',
  'asdbn-18': 'ASDBN Pigments are thermoplastic colour pigments designed for water based and PVC coating systems. These pigments are non-toxic and contain no heavy metal constituents, well suited for soap making, rangoli, holi colours, and expressive colour applications.',
  'asdbn-13': 'ASDBN Pigments are thermoplastic colour pigments formulated for solvent based and PVC coating systems. These pigments are non-toxic and contain no heavy metal constituents, ideal for gravure coating, clay dough, candle making, and metallic finish applications.',
  'asdbn-19': 'ASDBN Pigments are thermoplastic colour pigments recommended for water based systems. These pigments are non-toxic and contain no heavy metal constituents, well suited for rangoli, holi colours, candle making, and decorative colour applications.',
  'asdbn-04': 'ASDBN Pigments are thermoplastic colour pigments well suited for water based and clay coating systems. These pigments are non-toxic and contain no heavy metal constituents, making them ideal for soap making, rangoli, holi colours, and vibrant surface applications.',
  'asdbn-20': 'ASDBN Pigments are thermoplastic colour pigments recommended for water based and gravure coating systems. These pigments are non-toxic and contain no heavy metal constituents, suited for rangoli, holi colours, candle making, and premium colour applications.',
  'asdbn-14': 'ASDBN Pigments are thermoplastic fluorescent pigments recommended for solvent based and aerosol spray systems. These pigments are non-toxic and contain no heavy metal constituents, designed for paper coating, sindur making, and high-visibility colour applications.',
  'asdbn-15': 'ASDBN Pigments are thermoplastic colour pigments designed for water based and PVC coating systems. These pigments are non-toxic and contain no heavy metal constituents, making them well suited for sindur making, soap, rangoli, holi colours, and traditional colour applications.',
}

export const products = [
  { id: 'sindoor-red', slug: 'sindoor-red', name: 'Red Sindoor Colour', grade: 'Standard', shade: 'Classic red', category: 'Sindoor Colour', colour: 'Classic red', application: 'Sindhoor, Rangoli, Holi colours & traditional colour products', description: 'A vivid red colour option suited to traditional sindhoor applications, rangoli preparations, and festive colour products with a direct, recognisable visual character.', filter: 'sindoor', pigment: '#d91818', code: null, tags: ['Sindhoor', 'Rangoli', 'Holi', 'Idol Coating', 'Poster Colours'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Red Sindoor Colour | Sindoor Colour', metaDescription: 'A vivid red colour option suited to traditional sindhoor applications, rangoli preparations, and festive colour products with a direct, recognisable visual character.' },
  { id: 'sindoor-bright-red', slug: 'sindoor-bright-red', name: 'Bright Red Sindoor', grade: 'Standard', shade: 'Bright red', category: 'Sindoor Colour', colour: 'Bright red', application: 'Sindhoor, Rangoli, Holi colours & festive colour products', description: 'A high-impact bright red shade for sindhoor, rangoli, and holi colour applications where a more immediate colour impression is needed.', filter: 'sindoor', pigment: '#ff3220', code: null, tags: ['Sindhoor', 'Rangoli', 'Holi', 'Idol Coating'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Bright Red Sindoor | Sindoor Colour', metaDescription: 'A high-impact bright red shade for sindhoor, rangoli, and holi colour applications where a more immediate colour impression is needed.' },
  { id: 'sindoor-deep-red', slug: 'sindoor-deep-red', name: 'Deep Red Sindoor', grade: 'Standard', shade: 'Deep red', category: 'Sindoor Colour', colour: 'Deep red', application: 'Sindhoor, Rangoli & traditional colour products', description: 'A deeper red direction with visual richness, suited to premium sindhoor formulations, rangoli, and traditional idol coating colour applications.', filter: 'sindoor', pigment: '#850414', code: null, tags: ['Sindhoor', 'Rangoli', 'Idol Coating'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Deep Red Sindoor | Sindoor Colour', metaDescription: 'A deeper red direction with visual richness, suited to premium sindhoor formulations, rangoli, and traditional idol coating colour applications.' },
  { id: 'sindoor-orange', slug: 'sindoor-orange', name: 'Orange Sindoor', grade: 'Standard', shade: 'Orange', category: 'Sindoor Colour', colour: 'Orange', application: 'Sindhoor, Rangoli, Holi colours & traditional colour products', description: 'A warm orange sindhoor shade with a vibrant, distinctive finish ideal for traditional sindhoor, holi colour, and festive rangoli applications.', filter: 'sindoor', pigment: '#ff761c', code: null, tags: ['Sindhoor', 'Rangoli', 'Holi', 'Idol Coating'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Orange Sindoor | Sindoor Colour', metaDescription: 'A warm orange sindhoor shade with a vibrant, distinctive finish ideal for traditional sindhoor, holi colour, and festive rangoli applications.' },
  { id: 'asdbn-11', slug: 'asdbn-11', name: 'Yellow (ASDBN-11)', grade: 'ASDBN-11', shade: 'Yellow (ASDBN-11)', category: 'Colour Powder', colour: 'Yellow (ASDBN-11)', application: 'Water based paints, solvent based paints, poster colours, paper coating, rangoli, holi & general colour applications', description: 'A bright yellow pigment powder suited for water based paints, solvent based paints, poster colours, aerosol spray paints, paper coating, wax crayons, rangoli, holi colour, and a range of general colour applications.', filter: 'colour-powder', pigment: '#f5d347', code: 'ASDBN-11', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Clay Coating', 'Seed Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Clay Dough', 'Soap'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Yellow (ASDBN-11) | Colour Powder', metaDescription: 'A bright yellow pigment powder suited for water based paints, solvent based paints, poster colours, aerosol spray paints, paper coating, wax crayons, rangoli, holi colour, and a range of general colour applications.' },
  { id: 'asdbn-16', slug: 'asdbn-16', name: 'Red (ASDBN-16)', grade: 'ASDBN-16', shade: 'Red (ASDBN-16)', category: 'Colour Powder', colour: 'Red (ASDBN-16)', application: 'Water based paints, solvent based paints, poster colours, paper coating, rangoli, holi & traditional colour applications', description: 'A strong red pigment powder with classic visual impact, designed for water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, rangoli, holi colour, and dependable colour coverage across surfaces.', filter: 'colour-powder', pigment: '#d91818', code: 'ASDBN-16', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'PVC Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap', 'Sindhoor'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Red (ASDBN-16) | Colour Powder', metaDescription: 'A strong red pigment powder with classic visual impact, designed for water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, rangoli, holi colour, and dependable colour coverage across surfaces.' },
  { id: 'asdbn-02', slug: 'asdbn-02', name: 'Green (ASDBN-02)', grade: 'ASDBN-02', shade: 'Green (ASDBN-02)', category: 'Colour Powder', colour: 'Green (ASDBN-02)', application: 'Water based paints, solvent based paints, poster colours, paper coating, rangoli & general colour applications', description: 'A fresh green pigment powder tone for eye-catching use in water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, wax crayons, rangoli, and vibrant decorative applications.', filter: 'colour-powder', pigment: '#3ca65d', code: 'ASDBN-02', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Seed Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Clay Dough'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Green (ASDBN-02) | Colour Powder', metaDescription: 'A fresh green pigment powder tone for eye-catching use in water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, wax crayons, rangoli, and vibrant decorative applications.' },
  { id: 'asdbn-17', slug: 'asdbn-17', name: 'Pink (ASDBN-17)', grade: 'ASDBN-17', shade: 'Pink (ASDBN-17)', category: 'Colour Powder', colour: 'Pink (ASDBN-17)', application: 'Water based paints, solvent based paints, poster colours, rangoli, holi & decorative colour applications', description: 'A vivid pink pigment powder with a soft yet striking colour presence, suited to water based paints, solvent based paints, aerosol spray paints, poster colours, holi colours, and decorative products.', filter: 'colour-powder', pigment: '#f06ca8', code: 'ASDBN-17', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap', 'Clay Dough'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Pink (ASDBN-17) | Colour Powder', metaDescription: 'A vivid pink pigment powder with a soft yet striking colour presence, suited to water based paints, solvent based paints, aerosol spray paints, poster colours, holi colours, and decorative products.' },
  { id: 'asdbn-12', slug: 'asdbn-12', name: 'Green (ASDBN-12)', grade: 'ASDBN-12', shade: 'Green (ASDBN-12)', category: 'Fluorescent Pigments', colour: 'Green (ASDBN-12)', application: 'Fluorescent pigment powder for application-led colour requirements', description: 'Green fluorescent pigment powder for application-led colour requirements. Review the intended use with the NSU team.', filter: 'fluorescent', pigment: '#70ed27', code: 'ASDBN-12', tags: ['Fluorescent Pigment Powder', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Paper Coating'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Green (ASDBN-12) | Fluorescent Pigments', metaDescription: 'Green fluorescent pigment powder for application-led colour requirements. Review the intended use with the NSU team.' },
  { id: 'asdbn-18', slug: 'asdbn-18', name: 'Magenta (ASDBN-18)', grade: 'ASDBN-18', shade: 'Magenta (ASDBN-18)', category: 'Colour Powder', colour: 'Magenta (ASDBN-18)', application: 'Water based paints, solvent based paints, poster colours, textile colouring & expressive colour applications', description: 'A saturated magenta pigment powder for expressive, attention-led colour use in water based paints, solvent based paints, aerosol spray paints, poster colours, textile colouring, and vibrant product surfaces.', filter: 'colour-powder', pigment: '#d91179', code: 'ASDBN-18', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'PVC Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Magenta (ASDBN-18) | Colour Powder', metaDescription: 'A saturated magenta pigment powder for expressive, attention-led colour use in water based paints, solvent based paints, aerosol spray paints, poster colours, textile colouring, and vibrant product surfaces.' },
  { id: 'asdbn-13', slug: 'asdbn-13', name: 'Chrome (ASDBN-13)', grade: 'ASDBN-13', shade: 'Chrome (ASDBN-13)', category: 'Colour Powder', colour: 'Chrome (ASDBN-13)', application: 'Metallic finishes, solvent based paints, aerosol spray paints & polished surface applications', description: 'A high-lustre chrome tone pigment powder suited to metallic and polished visual finishes in solvent based paints, aerosol spray paints, PVC coating, candles, and decorative surface applications.', filter: 'colour-powder', pigment: '#b7b7b7', code: 'ASDBN-13', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'PVC Coating', 'Gravure Coating', 'Candles', 'Clay Dough'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Chrome (ASDBN-13) | Colour Powder', metaDescription: 'A high-lustre chrome tone pigment powder suited to metallic and polished visual finishes in solvent based paints, aerosol spray paints, PVC coating, candles, and decorative surface applications.' },
  { id: 'asdbn-19', slug: 'asdbn-19', name: 'Red Violet (ASDBN-19)', grade: 'ASDBN-19', shade: 'Red Violet (ASDBN-19)', category: 'Colour Powder', colour: 'Red Violet (ASDBN-19)', application: 'Water based paints, solvent based paints, poster colours, rangoli & decorative colour applications', description: 'A deep red-violet pigment powder direction with rich tone, ideal for water based paints, solvent based paints, aerosol spray paints, poster colours, rangoli, and decorative colour applications.', filter: 'colour-powder', pigment: '#8d3b8a', code: 'ASDBN-19', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Red Violet (ASDBN-19) | Colour Powder', metaDescription: 'A deep red-violet pigment powder direction with rich tone, ideal for water based paints, solvent based paints, aerosol spray paints, poster colours, rangoli, and decorative colour applications.' },
  { id: 'asdbn-04', slug: 'asdbn-04', name: 'Orange (ASDBN-04)', grade: 'ASDBN-04', shade: 'Orange (ASDBN-04)', category: 'Colour Powder', colour: 'Orange (ASDBN-04)', application: 'Water based paints, solvent based paints, poster colours, holi colours & vibrant surface applications', description: 'A warm orange pigment powder designed to add energy and brightness to water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, holi colour products, and decorative surfaces.', filter: 'colour-powder', pigment: '#ff761c', code: 'ASDBN-04', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Clay Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Orange (ASDBN-04) | Colour Powder', metaDescription: 'A warm orange pigment powder designed to add energy and brightness to water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, holi colour products, and decorative surfaces.' },
  { id: 'asdbn-20', slug: 'asdbn-20', name: 'Royal Blue (ASDBN-20)', grade: 'ASDBN-20', shade: 'Royal Blue (ASDBN-20)', category: 'Colour Powder', colour: 'Royal Blue (ASDBN-20)', application: 'Water based paints, solvent based paints, poster colours & premium colour applications', description: 'A rich royal blue pigment powder tone with depth, clarity, and premium presentation for water based paints, solvent based paints, aerosol spray paints, poster colours, and high-end decorative products.', filter: 'colour-powder', pigment: '#2d4fb2', code: 'ASDBN-20', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'Gravure Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Royal Blue (ASDBN-20) | Colour Powder', metaDescription: 'A rich royal blue pigment powder tone with depth, clarity, and premium presentation for water based paints, solvent based paints, aerosol spray paints, poster colours, and high-end decorative products.' },
  { id: 'asdbn-14', slug: 'asdbn-14', name: 'Orange R (ASDBN-14)', grade: 'ASDBN-14', shade: 'Orange R (ASDBN-14)', category: 'Fluorescent Pigments', colour: 'Orange R (ASDBN-14)', application: 'Fluorescent pigment powder for application-led colour requirements', description: 'Orange R fluorescent pigment powder for application-led colour requirements. Review the intended use with the NSU team.', filter: 'fluorescent', pigment: '#ff6a2a', code: 'ASDBN-14', tags: ['Fluorescent Pigment Powder', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Paper Coating'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Orange R (ASDBN-14) | Fluorescent Pigments', metaDescription: 'Orange R fluorescent pigment powder for application-led colour requirements. Review the intended use with the NSU team.' },
  { id: 'asdbn-15', slug: 'asdbn-15', name: 'Red Orange (ASDBN-15)', grade: 'ASDBN-15', shade: 'Red Orange (ASDBN-15)', category: 'Colour Powder', colour: 'Red Orange (ASDBN-15)', application: 'Water based paints, solvent based paints, poster colours, holi colours & traditional colour applications', description: 'A warm red-orange pigment powder that balances vibrancy with a rich, traditional finish for water based paints, solvent based paints, aerosol spray paints, poster colours, holi colour, and rangoli applications.', filter: 'colour-powder', pigment: '#e65a2c', code: 'ASDBN-15', tags: ['Water Based Paints', 'Solvent Based Paints', 'Aerosol Spray Paints', 'Poster Colours', 'Water Colours', 'Paper Coating', 'PVC Coating', 'Wax Crayons', 'Rangoli', 'Holi', 'Candles', 'Soap'], technicalSpecifications: { ...emptyFluorescentTechnicalSpecifications }, tds: null, sds: null, coa: null, seoTitle: 'Red Orange (ASDBN-15) | Colour Powder', metaDescription: 'A warm red-orange pigment powder that balances vibrancy with a rich, traditional finish for water based paints, solvent based paints, aerosol spray paints, poster colours, holi colour, and rangoli applications.' },
  ...nsuFluorescentPigments,
].map((product) => {
  if (!product.code?.startsWith('ASDBN-')) return product

  const code = 'ASDBN'
  const stripNumericCode = (value) => value?.replace(/ASDBN-\d+/g, code)
  const displayName = stripNumericCode(product.name).replace(/\s*\(ASDBN\)\s*$/i, '')
  const displaySeoTitle = stripNumericCode(product.seoTitle)
  const normalizedTags = product.tags?.map((tag) => tag === 'Sindhoor' ? 'Sindur' : tag)
  const applicationTags = ['asdbn-14', 'asdbn-15'].includes(product.id)
    ? [...new Set([...(normalizedTags || []), 'Sindur'])]
    : normalizedTags

  return {
    ...product,
    technicalSpecifications: {
      ...getReferenceTechnicalSpecifications({ category: product.category, shade: product.shade || product.colour }),
    },
    name: product.id === 'asdbn-13' ? 'Chrome / Golden Yellow (ASDBN)' : `${displayName} (ASDBN)`,
    grade: code,
    shade: stripNumericCode(product.shade),
    colour: stripNumericCode(product.colour),
    code,
    application: product.id === 'asdbn-15'
      ? `${product.application}, Sindoor making`
      : product.application,
    tags: product.id === 'asdbn-15'
      ? [...new Set([...(applicationTags || []), 'Sindur Making'])]
      : applicationTags,
    pigment: product.id === 'asdbn-13' ? '#d4af37' : product.pigment,
    seoTitle: product.id === 'asdbn-13' ? 'Chrome / Golden Yellow | Colour Powder' : displaySeoTitle,
    productDescription: productDescriptions[product.id] || product.productDescription || null,
  }
}).filter((product) => product.filter !== 'sindoor')
