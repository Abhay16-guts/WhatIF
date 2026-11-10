/**
 * Mock data for scenarios to test pages, history, comparison and interaction flows.
 */

export const SAMPLE_SCENARIO_DATA = {
  id: 'sample-awake-era',
  title: 'The Great Vigil: The Century Without Slumber',
  tagline: 'When human biochemistry evolved past the circadian necessity of sleep.',
  premise: 'In 2042, an atmospheric catalyst permanently altered the adenosine feedback loop in Homo sapiens. Within six months, the requirement for biological sleep vanished entirely, giving every person eight extra waking hours every single day.',
  assumptions: [
    'Cellular repair occurs passively through micro-rests during regular wakefulness.',
    'Cognitive fatigue is managed by caloric intake rather than unconscious rest.',
    'Brain neuroplasticity remains stable without REM cycles.',
  ],
  timeline: [
    {
      yearLabel: 'Year 1 (2042)',
      eventTitle: 'The 24-Hour Grid Shift',
      description: 'Global power consumption surges 34%. Residential real estate redesigns remove bedrooms in favor of private studios and secondary workshops.',
    },
    {
      yearLabel: 'Year 10 (2052)',
      eventTitle: 'The Tri-Career Paradigm',
      description: 'The standard working day fractures. Adults routinely master two independent professions simultaneously, doubling scientific publication rates.',
    },
    {
      yearLabel: 'Year 50 (2092)',
      eventTitle: 'The Great Cultural Deceleration',
      description: 'With 33% more lifespan-hours, the hurry of modern life evaporates. Books lengthen, symphonies expand to twelve hours, and generational wisdom deepens.',
    },
  ],
  impacts: {
    society: 'The concept of nightlife ceases to exist; cities operate at continuous steady-state vibrancy without curfews.',
    economy: 'Output triples over two decades, but labor unions successfully mandate 16-hour weekly leisure quotas.',
    technology: 'Personal computing interfaces adapt to non-stop cognitive flow, creating adaptive brainwave modulation screens.',
    environment: 'Light pollution doubles, forcing subterranean observatories and bio-luminescent city street canopies.',
    culture: 'Sleep is romanticized as an ancient mystical trance; simulated sleep parlors become luxury retreats.',
  },
  story: {
    title: 'The 4 A.M. Tea Merchant',
    body: 'Maren set the brass kettle down over the induction coil as the chime struck 04:00. Fifty years ago, she was told, this street was bathed in quiet darkness, shuttered behind drawn blinds. Tonight, poets and structural architects sat at her terrace tables arguing over tensile bridge calculations under the gentle amber glow of street lanterns. "To think our ancestors spent a third of life behind closed eyelids," an old professor murmured. Maren poured the steeped mint tea and smiled. In the eternal morning, there was finally time for everything.',
  },
};

export const MOCK_SCENARIOS = [
  {
    id: 'scenario-humans-never-slept',
    title: 'The Great Vigil: The Century Without Slumber',
    tagline: 'When human biochemistry evolved past the circadian necessity of sleep.',
    prompt: 'What if humans never needed sleep?',
    tone: 'Thoughtful',
    timelineScale: '50',
    createdAt: '2026-11-10T14:30:00.000Z',
    premise: 'In 2042, an atmospheric catalyst permanently altered the adenosine feedback loop in Homo sapiens. Within six months, the biological need for sleep vanished entirely, gifting humanity eight additional waking hours every day.',
    assumptions: [
      'Cellular and neuronal recovery occurs continuously during regular quiet wakefulness.',
      'Metabolic caloric requirements increase by approximately 22% daily.',
      'Memory consolidation occurs during relaxed focus rather than unconscious delta waves.',
    ],
    timeline: [
      {
        yearLabel: 'Year 1 (2042)',
        eventTitle: 'The 24-Hour Grid Shift',
        description: 'Global municipal power networks transition to perpetual full-load. Architecture firms eliminate master bedrooms in favor of dual private research studios.',
      },
      {
        yearLabel: 'Year 5 (2047)',
        eventTitle: 'The Dual-Vocation Accord',
        description: 'Labor ministries formally outlaw 16-hour corporate workdays. Most citizens adopt two distinct professions—one analytical, one artistic.',
      },
      {
        yearLabel: 'Year 20 (2062)',
        eventTitle: 'Scientific Output Quadruples',
        description: 'Global research cycles run uninterrupted across continents, leading to breakthroughs in room-temperature superconductors decades ahead of forecast.',
      },
      {
        yearLabel: 'Year 50 (2092)',
        eventTitle: 'The Cult of Simulated Slumber',
        description: 'Artificial sleep induction spas become the ultimate luxury retreat for hyper-stimulated minds seeking silent contemplation.',
      },
    ],
    impacts: {
      society: 'Night and day lose their social distinction; human interactions operate on asynchronous overlapping rhythms.',
      economy: 'Global productivity surges, accompanied by strong statutory caps on individual work shifts to protect leisure.',
      technology: 'Lighting and display technology evolve to mimic soft dawn illumination to avoid chronic retinal strain.',
      environment: 'Continuous energy consumption strains early power grids before triggering massive accelerated deployment of nuclear and solar energy.',
      culture: 'Dreaming becomes an extinct biological phenomenon, sparking an unprecedented renaissance in surrealist literature and virtual reality art.',
    },
    story: {
      title: 'The Midday Bell at 03:00',
      body: 'Kaelen adjusted his brass magnifying lens as the municipal clock chimed three in the morning. Outside his studio window, the cobblestones of Old Prague were bathed in gentle gold gaslight, thronged with fruit sellers and chess players enjoying the third hour of their nocturnal leisure block. "My grandmother used to tell me stories about beds," his apprentice mused, polishing a glass telescope prism. "How strange it must have been—spending a third of your only life in darkness, doing nothing at all."',
    },
    followUpQuestions: [
      'How did religious rituals and sabbath traditions adapt to a non-circadian existence?',
      'What happened to architectural design when residential buildings no longer needed bedrooms?',
      'Did interpersonal relationships become closer or more distant with continuous interaction?',
    ],
    fictionNotice: 'This scenario is a speculative thought experiment generated for creative exploration. It does not represent factual predictions or scientific claims.',
  },
  {
    id: 'scenario-alexandria-preserved',
    title: 'The Eternal Papyrus: If Alexandria Had Endured',
    tagline: 'When antiquity\'s greatest archive sparked an industrial dawn twelve centuries early.',
    prompt: 'What if the Library of Alexandria never burned?',
    tone: 'Scientific',
    timelineScale: '100',
    createdAt: '2026-11-09T18:15:00.000Z',
    premise: 'In 48 BC, Julius Caesar\'s fleet defense employed flame-retardant brine barricades around the Royal Harbor. The Great Library and its sister daughter-library at the Serapeum survived completely intact, safeguarding over 500,000 Hellenistic, Babylonian, and Egyptian codices.',
    assumptions: [
      'Hero of Alexandria\'s steam-driven aeolipile designs were preserved and cross-pollinated with Archimedean metallurgy.',
      'Eratosthenes\' geographical scrolls and Aristarchus\' heliocentric calculations became foundational Mediterranean textbooks.',
      'Political stability allowed continuous scholastic patronage across successive dynasties.',
    ],
    timeline: [
      {
        yearLabel: 'Year 20 (28 BC)',
        eventTitle: 'The Great Catalog Translation Act',
        description: 'Ptolemaic scholars formalize standard Latin, Persian, and Sanskrit translations of all mathematical scrolls, distributing duplicates to Rome and Antioch.',
      },
      {
        yearLabel: 'Year 80 (32 AD)',
        eventTitle: 'Ptolemaic Steam Pump Irrigation',
        description: 'Engineers adapt Hero of Alexandria\'s mechanical treatises to pump Nile floodwaters into arid desert terraces, ending Mediterranean famine cycles.',
      },
      {
        yearLabel: 'Year 200 (152 AD)',
        eventTitle: 'The First Mechanical Printing Press',
        description: 'Movable ceramic type is developed in Alexandria to keep pace with global demand for anatomical and astronomical folios.',
      },
      {
        yearLabel: 'Year 500 (452 AD)',
        eventTitle: 'First Sub-Orbital Observation Tower',
        description: 'Advanced lens grinding and trigonometric cartography enable planetary astronomical surveys a millennium before Galileo.',
      },
    ],
    impacts: {
      society: 'Universal literacy spreads through public scroll dispensaries; secular natural philosophy becomes a civic standard.',
      economy: 'Early mechanical automation in agriculture and textile production displaces slave-based economic models by the 2nd century AD.',
      technology: 'Steam power, precision clockwork, and chemical sanitation develop concurrently in the 1st millennium.',
      environment: 'Early coal and peat extraction in Northern Europe causes localized smog centuries before the modern industrial revolution.',
      culture: 'Hellenistic scientific rationalism merges with global philosophical traditions, preventing ideological dark ages.',
    },
    story: {
      title: 'Ink Across the Harbor',
      body: 'Chief Archivist Sostratos inspected the damp clay seals on the newly arrived cargo from Byzantium. Twenty crates of copper-engraved anatomical studies, carefully insulated with wax parchment. Across the harbor, the Pharos lighthouse beacon was powered not by timber, but by a gleaming mechanical reflector designed by the Academy three generations ago. "Every word survived," Sostratos whispered, touching the dry vellum. "Every thought our fathers had is still here to guide us forward."',
    },
    followUpQuestions: [
      'How would the development of early steam power have affected the Roman Empire\'s territorial expansion?',
      'Did preserving ancient medical texts prevent the devastating Antonine and Justinian plagues?',
      'How did world religions evolve in an era of early heliocentrism and universal printing?',
    ],
    fictionNotice: 'This scenario is a speculative thought experiment generated for creative exploration. It does not represent factual predictions or scientific claims.',
  },
];
