/* ============================================================
   SOLAR SYSTEM EXPLORER  —  script.js

   This file does three things:
   1. Stores all the planet data (names, colors, facts, stats)
   2. Updates the page when you pick a different planet
   3. Sets up the navigation buttons so clicking them works
   ============================================================ */


/* ------------------------------------------------------------------
   ICON LIBRARY
   Each icon is a tiny SVG drawing stored as a piece of text.
   We look them up by name (e.g. ICONS.moon) when building the page.
   ------------------------------------------------------------------ */
const ICONS = {
  people:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="3"/><path d="M2 21v-1a6 6 0 0 1 12 0v1"/><path d="M16 3.5a3 3 0 0 1 0 7M22 21v-1a6 6 0 0 0-4-5.6"/></svg>',
  ruler:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17 17 3l4 4L7 21z"/><path d="M7 11l2 2M11 7l2 2M9 15l1 1"/></svg>',
  moon:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  pin:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  temp:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/></svg>',
  orbit:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20"/></svg>',
  water:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.5C12 2.5 5 10 5 15a7 7 0 0 0 14 0c0-5-7-12.5-7-12.5z"/></svg>',
  shield:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"/></svg>',
  leaf:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 11 6c4-4 9-4 9-4s0 5-4 9a7 7 0 0 1-5 9zM5 21c2-6 5-9 9-11"/></svg>',
  magnet:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4v7a6 6 0 0 0 12 0V4M6 8h4M14 8h4"/></svg>',
  cloud:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.4A4 4 0 0 1 17 18z"/></svg>',
  volcano:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 9l-6 12h18L15 9M9 9h6M11 2l1 4 1-3"/></svg>',
  pressure: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16v3a8 8 0 0 1-16 0z"/><path d="M12 18v3M9 21h6"/></svg>',
  sun:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></svg>',
  crater:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="13" r="2"/><circle cx="10" cy="15" r="1"/></svg>',
  wind:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5M3 16h14a2.5 2.5 0 1 1-2.5 2.5M3 12h17"/></svg>',
  storm:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7c-3 0-5 2-5 5M12 17c3 0 5-2 5-5"/></svg>',
  ice:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M4 7l16 10M20 7 4 17M12 5l-3 2 3 2 3-2zM12 19l3-2-3-2-3 2z"/></svg>',
  ring:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-20 12 12)"/></svg>',
  rock:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 20l3-11 5-3 6 5-2 9z"/></svg>'
};


/* ------------------------------------------------------------------
   PLANET DATA + COLOR THEMES
   Every planet (and the Home screen) has its own entry here.

   Each entry contains:
   - accent / a2  : the main highlight color and a lighter version
   - hero / deep  : background colors for the card
   - grad         : the gradient painted on the planet ball
   - badge        : small label shown above the planet name
   - lede         : one-line description shown in the hero
   - stats        : four key facts shown in the stats bar
   - overview     : a short paragraph about the planet
   - features     : four feature cards with icon, heading, and text
   - fact         : the fun fact shown at the bottom
   - ring (opt.)  : set to true for Saturn and Uranus to draw rings
   ------------------------------------------------------------------ */
const PLANETS = {

  /* ---- Home screen (shown when you click the logo) ---- */
  Home: {
    accent: '#e0e0e0',
    a2:     '#ffffff',
    hero:   '#1a1a1a',
    deep:   '#0a0a0a',
    grad:   'radial-gradient(circle at 35% 30%, #555555, #1a1a1a 55%, #000000 100%)',
    badge:  'Explore the Solar System',
    lede:   'A journey through the eight worlds orbiting our Sun. Pick a planet above to begin.',
    stats: [
      { ico: 'sun',   lbl: 'Star',        val: 'The Sun'  },
      { ico: 'orbit', lbl: 'Planets',     val: '8'        },
      { ico: 'moon',  lbl: 'Known Moons', val: '290+'     },
      { ico: 'pin',   lbl: 'System Age',  val: '4.6B yrs' }
    ],
    overview: 'Our solar system formed about 4.6 billion years ago from a giant cloud of gas and dust. Eight planets, dozens of moons, asteroids and comets all orbit a single star — the Sun. Choose any planet above to explore its world.',
    features: [
      { ico: 'sun',   h: 'Inner Planets', p: 'Mercury, Venus, Earth and Mars are rocky worlds.'        },
      { ico: 'cloud', h: 'Gas Giants',    p: 'Jupiter and Saturn are enormous balls of gas.'           },
      { ico: 'ice',   h: 'Ice Giants',    p: 'Uranus and Neptune are cold, distant ice giants.'        },
      { ico: 'ring',  h: 'Rings & Moons', p: 'Many planets host rings and dozens of moons.'           }
    ],
    fact: 'The Sun makes up 99.8% of all the mass in the solar system.'
  },

  /* ---- Mercury ---- */
  Mercury: {
    accent: '#cfc9bd',
    a2:     '#e4ded2',
    hero:   '#4a4a52',
    deep:   '#141418',
    grad:   'radial-gradient(circle at 35% 30%, #c9c2b4, #7c756a 55%, #2c2925 100%)',
    badge:  'The Swift Planet',
    lede:   'The closest planet to the Sun and the fastest in its orbit.',
    stats: [
      { ico: 'orbit', lbl: 'Orbital Period',    val: '88 days'   },
      { ico: 'ruler', lbl: 'Diameter',           val: '4,879 km'  },
      { ico: 'moon',  lbl: 'Moons',              val: '0'         },
      { ico: 'pin',   lbl: 'Distance from Sun',  val: '57.9M km'  }
    ],
    overview: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has a rocky surface covered in craters, similar to our Moon.',
    features: [
      { ico: 'sun',    h: 'Closest to the Sun',    p: 'Mercury is the closest planet to the Sun.'             },
      { ico: 'temp',   h: 'Extreme Temperatures',  p: 'Daytime highs reach 430°C while nights drop to -180°C.' },
      { ico: 'orbit',  h: 'Fastest Orbit',         p: 'It orbits the Sun in just 88 Earth days.'              },
      { ico: 'crater', h: 'Heavily Cratered',      p: 'Its surface is covered in impact craters.'             }
    ],
    fact: 'Mercury has a huge iron core that takes up about 85% of its radius.'
  },

  /* ---- Venus ---- */
  Venus: {
    accent: '#f0b44a',
    a2:     '#f8cd7a',
    hero:   '#b9701a',
    deep:   '#3f2607',
    grad:   'radial-gradient(circle at 35% 30%, #ffd27a, #d98026 55%, #5e3410 100%)',
    badge:  'The Morning Star',
    lede:   'The hottest planet in our solar system.',
    stats: [
      { ico: 'temp',  lbl: 'Surface Temp',       val: '464 °C'    },
      { ico: 'ruler', lbl: 'Diameter',            val: '12,104 km' },
      { ico: 'moon',  lbl: 'Moons',               val: '0'         },
      { ico: 'pin',   lbl: 'Distance from Sun',   val: '108.2M km' }
    ],
    overview: 'Venus is the second planet from the Sun and is shrouded in thick clouds of sulfuric acid. It has a runaway greenhouse effect that makes it the hottest planet in our solar system.',
    features: [
      { ico: 'cloud',    h: 'Thick Atmosphere', p: 'Its atmosphere is 96% carbon dioxide, trapping heat.'      },
      { ico: 'temp',     h: 'Extreme Heat',     p: 'Surface temperatures are hot enough to melt lead.'         },
      { ico: 'volcano',  h: 'Volcanic Activity',p: 'Venus has more volcanoes than any other planet.'           },
      { ico: 'pressure', h: 'High Pressure',    p: 'Atmospheric pressure is 92 times stronger than Earth’s.' }
    ],
    fact: 'A day on Venus is longer than a year on Venus.'
  },

  /* ---- Earth ---- */
  Earth: {
    accent: '#5fa0ff',
    a2:     '#8bbcff',
    hero:   '#1d4ed8',
    deep:   '#0c1838',
    grad:   'radial-gradient(circle at 35% 30%, #7fb2ff, #1d4ed8 55%, #0a1f4d 100%)',
    badge:  'The Blue Planet',
    lede:   'Our home. The only place we know of that’s teeming with life.',
    stats: [
      { ico: 'people', lbl: 'Population',        val: '8.1B'      },
      { ico: 'ruler',  lbl: 'Diameter',           val: '12,742 km' },
      { ico: 'moon',   lbl: 'Moons',              val: '1'         },
      { ico: 'pin',    lbl: 'Distance from Sun',  val: '149.6M km' }
    ],
    overview: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It has a diverse environment and conditions that support life, including liquid water, a protective atmosphere, and a moderate climate.',
    features: [
      { ico: 'water',  h: 'Liquid Water',          p: 'Earth is the only planet known to have stable liquid water on its surface.' },
      { ico: 'shield', h: 'Protective Atmosphere', p: 'Our atmosphere protects us from harmful solar radiation.'                    },
      { ico: 'leaf',   h: 'Rich Biodiversity',     p: 'Home to millions of species of plants, animals, and microorganisms.'        },
      { ico: 'magnet', h: 'Strong Magnetic Field', p: 'Earth’s magnetic field protects us from the solar wind and cosmic radiation.' }
    ],
    fact: 'Earth is the only planet not named after a god or goddess in Greek or Roman mythology.'
  },

  /* ---- Mars ---- */
  Mars: {
    accent: '#ff7a55',
    a2:     '#ff9b7d',
    hero:   '#a83a1e',
    deep:   '#34100a',
    grad:   'radial-gradient(circle at 35% 30%, #f0876a, #b13c1e 55%, #4a1408 100%)',
    badge:  'The Red Planet',
    lede:   'A cold, dusty desert world and the most explored planet beyond Earth.',
    stats: [
      { ico: 'temp',  lbl: 'Surface Temp',      val: '-63 °C'    },
      { ico: 'ruler', lbl: 'Diameter',           val: '6,779 km'  },
      { ico: 'moon',  lbl: 'Moons',              val: '2'         },
      { ico: 'pin',   lbl: 'Distance from Sun',  val: '227.9M km' }
    ],
    overview: 'Mars is the fourth planet from the Sun, a dusty, cold desert world with a very thin atmosphere. Iron oxide on its surface gives it the famous red color, and signs suggest it was once far wetter.',
    features: [
      { ico: 'rock',   h: 'Tallest Volcano', p: 'Olympus Mons is the largest volcano in the solar system.' },
      { ico: 'crater', h: 'Two Moons',       p: 'Mars has two small moons, Phobos and Deimos.'             },
      { ico: 'ruler',  h: 'Vast Canyons',    p: 'Valles Marineris stretches over 4,000 km long.'          },
      { ico: 'cloud',  h: 'Thin Atmosphere', p: 'Its atmosphere is mostly carbon dioxide and very thin.'   }
    ],
    fact: 'A year on Mars lasts 687 Earth days — almost two Earth years.'
  },

  /* ---- Jupiter ---- */
  Jupiter: {
    accent: '#e0b67e',
    a2:     '#eccfa3',
    hero:   '#9c6b38',
    deep:   '#2e1c0c',
    grad:   'radial-gradient(circle at 35% 30%, #e8c89a, #b07c45 55%, #5a3a1c 100%)',
    badge:  'The Giant',
    lede:   'The largest planet in our solar system — a massive ball of gas.',
    stats: [
      { ico: 'storm', lbl: 'Great Red Spot',    val: '350+ yrs'  },
      { ico: 'ruler', lbl: 'Diameter',           val: '139,820 km'},
      { ico: 'moon',  lbl: 'Moons',              val: '95'        },
      { ico: 'pin',   lbl: 'Distance from Sun',  val: '778.5M km' }
    ],
    overview: 'Jupiter is the largest planet in the solar system, a gas giant more than twice as massive as all the other planets combined. It is famous for its swirling bands of clouds and the Great Red Spot.',
    features: [
      { ico: 'storm', h: 'Great Red Spot',  p: 'A giant storm larger than Earth raging for centuries.'    },
      { ico: 'moon',  h: 'Dozens of Moons', p: 'Jupiter has 95 known moons, including giant Ganymede.'    },
      { ico: 'wind',  h: 'Fierce Winds',    p: 'Storm winds can exceed 600 km/h in its cloud bands.'      },
      { ico: 'ring',  h: 'Faint Rings',     p: 'Jupiter has a thin, dusty ring system.'                   }
    ],
    fact: 'Jupiter is so big that all the other planets could fit inside it.'
  },

  /* ---- Saturn ---- */
  Saturn: {
    accent: '#f0d77a',
    a2:     '#f6e5a4',
    hero:   '#b09030',
    deep:   '#2e240c',
    ring:   true,  // draw the ring decoration in CSS
    grad:   'radial-gradient(circle at 35% 30%, #f6e3a4, #c9a64e 55%, #6b5220 100%)',
    badge:  'The Ringed Planet',
    lede:   'Famous for its spectacular and complex system of icy rings.',
    stats: [
      { ico: 'ring',  lbl: 'Ring Span',         val: '282,000 km' },
      { ico: 'ruler', lbl: 'Diameter',           val: '116,460 km' },
      { ico: 'moon',  lbl: 'Moons',              val: '146'        },
      { ico: 'pin',   lbl: 'Distance from Sun',  val: '1.43B km'   }
    ],
    overview: 'Saturn is the sixth planet from the Sun and the second largest. It is best known for its stunning rings, made of countless chunks of ice and rock orbiting the planet.',
    features: [
      { ico: 'ring',     h: 'Iconic Rings',  p: 'Made of billions of pieces of ice and rock.'                },
      { ico: 'moon',     h: 'Most Moons',    p: 'Saturn has 146 confirmed moons, the most of any planet.'    },
      { ico: 'cloud',    h: 'Gas Giant',     p: 'Mostly hydrogen and helium with no solid surface.'          },
      { ico: 'pressure', h: 'Low Density',   p: 'Saturn is light enough that it would float in water.'       }
    ],
    fact: 'Saturn’s rings span thousands of kilometers but are only about 10 meters thick in places.'
  },

  /* ---- Uranus ---- */
  Uranus: {
    accent: '#8be4e8',
    a2:     '#b3eff2',
    hero:   '#2f9aa0',
    deep:   '#0c3033',
    ring:   true,  // draw the ring decoration in CSS
    grad:   'radial-gradient(circle at 35% 30%, #aef0f2, #45b8bd 55%, #144a4d 100%)',
    badge:  'The Ice Giant',
    lede:   'A pale blue ice giant that rotates on its side.',
    stats: [
      { ico: 'ice',   lbl: 'Surface Temp',      val: '-224 °C'   },
      { ico: 'ruler', lbl: 'Diameter',           val: '50,724 km' },
      { ico: 'moon',  lbl: 'Moons',              val: '28'        },
      { ico: 'pin',   lbl: 'Distance from Sun',  val: '2.87B km'  }
    ],
    overview: 'Uranus is the seventh planet from the Sun, an ice giant made largely of water, methane and ammonia. Methane gas gives it its pale cyan color, and it uniquely rotates on its side.',
    features: [
      { ico: 'ice',   h: 'Coldest Planet',  p: 'It has the coldest atmosphere in the solar system.' },
      { ico: 'orbit', h: 'Sideways Spin',   p: 'Uranus rotates on its side at a 98° tilt.'          },
      { ico: 'cloud', h: 'Methane Skies',   p: 'Methane gives Uranus its distinctive blue-green hue.'},
      { ico: 'ring',  h: 'Faint Rings',     p: 'It has 13 known dark, narrow rings.'                 }
    ],
    fact: 'One season on Uranus lasts about 21 Earth years.'
  },

  /* ---- Neptune ---- */
  Neptune: {
    accent: '#7d9ff0',
    a2:     '#a9c0ff',
    hero:   '#2a44a8',
    deep:   '#0a1238',
    grad:   'radial-gradient(circle at 35% 30%, #7d9ff0, #2848b8 55%, #0c1a52 100%)',
    badge:  'The Windy Planet',
    lede:   'The most distant planet — a deep blue world of supersonic winds.',
    stats: [
      { ico: 'wind',  lbl: 'Wind Speed',        val: '2,100 km/h' },
      { ico: 'ruler', lbl: 'Diameter',           val: '49,244 km'  },
      { ico: 'moon',  lbl: 'Moons',              val: '16'         },
      { ico: 'pin',   lbl: 'Distance from Sun',  val: '4.5B km'    }
    ],
    overview: 'Neptune is the eighth and most distant planet from the Sun. This dark, cold ice giant has the strongest winds in the solar system and a vivid blue color from methane in its atmosphere.',
    features: [
      { ico: 'wind',  h: 'Fastest Winds',  p: 'Supersonic winds reach over 2,000 km/h.'              },
      { ico: 'storm', h: 'Great Dark Spot',p: 'Massive storm systems appear and vanish in its clouds.' },
      { ico: 'ice',   h: 'Ice Giant',      p: 'Made of water, ammonia and methane ices.'              },
      { ico: 'pin',   h: 'Most Distant',   p: 'It orbits about 4.5 billion km from the Sun.'          }
    ],
    fact: 'Neptune was the first planet found by mathematical prediction rather than observation.'
  }
};


/* ------------------------------------------------------------------
   HELPER FUNCTIONS
   Small utilities used throughout the code below.
   ------------------------------------------------------------------ */

/* List of planet names in the order they appear in the nav bar */
const planetNames = Object.keys(PLANETS);

/* Shortcut: finds an HTML element by its id attribute.
   Instead of writing document.getElementById('badge') every time,
   we can just write getEl('badge'). */
const getEl = id => document.getElementById(id);

/* Converts a hex color like "#5fa0ff" into an rgba() color string.
   The 'alpha' parameter controls how transparent it is (0 = invisible, 1 = solid).
   Example: hexToRgba('#5fa0ff', 0.18)  →  'rgba(95,160,255,0.18)' */
function hexToRgba(hexColor, alpha) {
  const hex = hexColor.replace('#', '');
  const red   = parseInt(hex.substr(0, 2), 16);
  const green = parseInt(hex.substr(2, 2), 16);
  const blue  = parseInt(hex.substr(4, 2), 16);
  return `rgba(${red},${green},${blue},${alpha})`;
}


/* ------------------------------------------------------------------
   APPLY THEME
   Changes the color scheme for the whole page to match a planet.
   CSS variables (--accent, --hero, etc.) are defined in styles.css
   and referenced by every colored element on the page.
   ------------------------------------------------------------------ */
function applyTheme(planetData) {
  const rootStyles = document.documentElement.style;
  rootStyles.setProperty('--accent',      planetData.accent);
  rootStyles.setProperty('--accent-2',    planetData.a2);
  rootStyles.setProperty('--accent-soft', hexToRgba(planetData.accent, 0.18));
  rootStyles.setProperty('--hero',        planetData.hero);
  rootStyles.setProperty('--deep',        planetData.deep);
  rootStyles.setProperty('--stat-bg',     hexToRgba(planetData.hero, 0.45));
  rootStyles.setProperty('--planet-grad', planetData.grad);
}


/* ------------------------------------------------------------------
   ANIMATE IN
   Adds a fade-up animation to each section so the page feels alive
   when you switch planets. Each section gets a tiny delay so they
   appear one after another instead of all at once.
   ------------------------------------------------------------------ */
function animateIn() {
  const sections = [
    getEl('badge').parentElement.parentElement, // the hero section
    getEl('stats'),
    ...document.querySelectorAll('.block')      // overview, features, fun fact
  ];

  sections.forEach((section, index) => {
    section.classList.remove('anim');
    void section.offsetWidth;                          // forces the browser to reset the animation
    section.style.animationDelay = (index * 0.07) + 's';
    section.classList.add('anim');
  });
}


/* ------------------------------------------------------------------
   RENDER
   The main function. Call render('Mars') and the whole page updates
   to show Mars's data, colors, and content.
   ------------------------------------------------------------------ */
function render(planetKey) {
  const isHome     = planetKey === 'Home';
  const planetData = PLANETS[planetKey];

  /* 1. Update the color theme */
  applyTheme(planetData);

  /* 2. Fill in the hero section (big title, badge, description, button) */
  getEl('badge').textContent    = planetData.badge.toUpperCase();
  getEl('name').textContent     = isHome ? 'SOLAR SYSTEM' : planetKey.toUpperCase();
  getEl('lede').textContent     = planetData.lede;
  getEl('exploreBtn').innerHTML = `Explore ${isHome ? 'Planets' : planetKey} <span>&rarr;</span>`;

  /* 3. Add or remove the ring decoration on the planet ball */
  getEl('planet').className    = 'planet' + (planetData.ring ? ' ringed' : '');
  getEl('miniPlanet').className = 'mini-planet';

  /* 4. Build the stats bar (four key facts) */
  getEl('stats').innerHTML = planetData.stats.map(stat => `
    <div class="stat">
      <div class="ico">${ICONS[stat.ico]}</div>
      <div class="lbl">${stat.lbl}</div>
      <div class="val">${stat.val}</div>
    </div>`).join('');

  /* 5. Fill the overview paragraph */
  getEl('overviewText').textContent = planetData.overview;

  /* 6. Build the four feature cards */
  getEl('features').innerHTML = planetData.features.map(feature => `
    <div class="feat">
      <div class="fico">${ICONS[feature.ico]}</div>
      <h4>${feature.h}</h4>
      <p>${feature.p}</p>
    </div>`).join('');

  /* 7. Fill the fun fact */
  getEl('funfact').textContent = planetData.fact;

  /* 8. Highlight the active nav button */
  document.querySelectorAll('.nav-links button').forEach(button =>
    button.classList.toggle('active', button.dataset.key === planetKey));

  /* 9. Play the reveal animation and scroll to the top */
  animateIn();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ------------------------------------------------------------------
   INITIALISE THE APP
   Runs once when the page loads:
   1. Creates a nav button for every planet
   2. Wires up click events
   3. Shows Earth as the starting view
   ------------------------------------------------------------------ */

/* Build the navigation buttons from the planet names */
getEl('navLinks').innerHTML = planetNames.map(name =>
  `<button data-key="${name}">${name}</button>`).join('');

/* Clicking a nav button renders that planet */
document.querySelectorAll('.nav-links button').forEach(button =>
  button.addEventListener('click', () => render(button.dataset.key)));

/* Clicking the logo goes back to the Home screen */
getEl('logo').addEventListener('click', () => render('Home'));

/* Clicking "Explore …" scrolls down to the stats section */
getEl('exploreBtn').addEventListener('click', () =>
  getEl('stats').scrollIntoView({ behavior: 'smooth' }));

/* Show Earth when the page first opens */
render('Earth');
