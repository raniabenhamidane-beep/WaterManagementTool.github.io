/*
  Sika Water Action Tool – measure catalogue
  -------------------------------------------
  Source: "Masta Clean #1" (sheets "Measures for matrix" and "Measures for group"),
  updated with the Global Engineering call of 30.10.2026.

  This is the only file the team needs to edit to add or change a measure.

  Fields
  - id          Masta number (or letter for group measures). Keep it unique.
  - title       Short, plain-language name of the measure.
  - summary     One or two sentences: what it is and why it saves water.
  - type        reduce | reuse | monitor | nature | strategy      (colour on the matrix)
  - level       site_ops | site_invest | partner | community | group   (shape on the matrix)
  - uses        Water uses it acts on: product, cleaning, cooling, sanitary, garden, or "all"
  - production  Production types it fits: admixture, mortar, adhesive, membrane, coating, or "all"
  - effort      1 (very easy, cheap) to 10 (very hard, expensive)   -> x axis
  - impact      1 (small water saving or risk reduction) to 10 (large) -> y axis
                DRAFT ESTIMATES by the TP team, to be validated with Sika engineering.
  - horizon     Rough implementation time
  - cost        low (< CHF 50k) | medium (CHF 50k–500k) | high (> CHF 500k)
  - checkFirst  What the site should check before starting
  - steps       Implementation steps, in order
  - sika        Sika sites that already do it (from the Initiative Tracker)
  - others      Examples from other companies or literature
  - note        Optional caveat (e.g. engineering feedback)
*/

window.MEASURES = [

  /* ---------------- Monitoring & assessment ---------------- */
  {
    id: "1",
    title: "Detect leaks by monitoring site consumption",
    summary: "Track water consumption closely enough to spot abnormal peaks, so leaks are found in days instead of at the next quarterly report.",
    type: "monitor", level: "site_ops",
    uses: ["all"], production: ["all"],
    effort: 3, impact: 6, horizon: "< 6 months", cost: "low",
    checkFirst: [
      "Where your main meter is and how often it can be read",
      "Your normal consumption per day or per batch, to set an alert threshold"
    ],
    steps: [
      "Read the main water meter at least weekly (daily if possible) and log the value.",
      "Compare each reading with the normal level for your production volume.",
      "Set an alert when consumption is clearly above normal (for example +15%).",
      "When an alert fires, walk the network and repair the leak quickly; record the fix."
    ],
    sika: [{ site: "CN Davco (Wuhan)", text: "Standardised audit protocol to detect and prevent leaks." }],
    others: [{ company: "Holcim", text: "\"Treasure Hunt\" campaigns where employees track and report leaks through a mobile app." }],
    note: "Engineering feedback: pipes are often too small for smart sensors, so consumption monitoring works better than sensors on pipes. Leaks are followed at board level."
  },
  {
    id: "A",
    title: "Install sub-meters at each main consumption point",
    summary: "Meter cleaning, cooling, production and sanitary water separately, so you know where the water goes and which measure will save the most.",
    type: "monitor", level: "site_invest",
    uses: ["all"], production: ["all"],
    effort: 4, impact: 6, horizon: "6–12 months", cost: "low",
    checkFirst: [
      "Which water uses exist on site (product, cleaning, cooling, sanitary, garden)",
      "Where pipes can be fitted with a meter"
    ],
    steps: [
      "List every point where water is used on site.",
      "Install a meter on each main use (at least: production, cleaning, cooling, sanitary).",
      "Read the meters monthly and add them to the quarterly environmental report.",
      "Use the results to pick the next measure from this tool."
    ],
    sika: [
      { site: "VE Valencia", text: "Flow and rate meters installed to provide accurate material balances." },
      { site: "CN MBCC Minhang", text: "Flow and rate meters installed in the facilities." },
      { site: "African sites", text: "Metering is being deployed at every consumption point." }
    ],
    others: [{ company: "AkzoNobel", text: "Water metering and mass-balance tracking rolled out across sites." }],
    note: "Proposed as a minimum requirement for all sites in water-stressed areas (AWS, CDP Water Security, GRI 303)."
  },
  {
    id: "18",
    title: "Run a local water risk check for your site",
    summary: "Look at the local situation: water stress, past restrictions, upcoming regulation and water prices. It tells you how urgent action is on your site.",
    type: "monitor", level: "site_ops",
    uses: ["all"], production: ["all"],
    effort: 3, impact: 5, horizon: "< 6 months", cost: "low",
    checkFirst: ["Your site coordinates and your water supplier"],
    steps: [
      "Check your site on WRI Aqueduct and the WWF Water Risk Filter.",
      "Ask your water supplier or city about past restrictions and their drought plan.",
      "List local rules on withdrawal, reuse and discharge.",
      "Share the result with your EHS manager and the Group sustainability team."
    ],
    sika: [],
    others: [
      { company: "Holcim", text: "Basin-specific freshwater reduction targets based on local hydrology." },
      { company: "LVMH", text: "All sites must run a water management programme by 2030." }
    ]
  },
  {
    id: "J",
    title: "Prepare a water shortage plan",
    summary: "Decide in advance what the site does if water is restricted or cut: which uses stop first, how much storage you have, who to call.",
    type: "monitor", level: "site_ops",
    uses: ["all"], production: ["all"],
    effort: 2, impact: 6, horizon: "< 6 months", cost: "low",
    checkFirst: [
      "Whether your city or supplier has restriction levels (many have 10% to 50% steps)",
      "How many days of production your on-site storage covers"
    ],
    steps: [
      "Rank your water uses: what must continue, what can stop for a few days.",
      "Write what to do at each restriction level announced by your supplier.",
      "Check on-site storage and whether a buffer tank is worth adding.",
      "Name a responsible person and test the plan once a year."
    ],
    sika: [],
    others: [{ company: "Arkema", text: "Site emergency action plans for water shortage situations." }],
    note: "Example: Santa Fe Springs (Los Angeles) can face six restriction levels, and the regional supplier already cut deliveries by 15% in 2015–16."
  },
  {
    id: "26",
    title: "Separate clean and dirty wastewater streams",
    summary: "Clean streams often become unusable only because they are mixed with dirty ones. Keeping them apart makes reuse cheap.",
    type: "monitor", level: "site_invest",
    uses: ["cleaning", "cooling", "sanitary"], production: ["all"],
    effort: 5, impact: 6, horizon: "6–12 months", cost: "medium",
    checkFirst: ["Which streams are mixed today and their quality"],
    steps: [
      "Map the wastewater streams and measure their quality.",
      "Identify the cleanest streams that could be reused without heavy treatment.",
      "Separate these streams with dedicated piping or tanks.",
      "Send each stream to the right use or treatment."
    ],
    sika: [{ site: "FR Gournay-en-Bray", text: "Leader on wastewater stream segregation (call planned with the site)." }],
    others: [{ company: "Fab25 plant (literature)", text: "Segregating streams with conductivity monitoring saved USD 1.4 million per year." }]
  },

  /* ---------------- Product water ---------------- */
  {
    id: "4",
    title: "Reuse cleaning water in the next batch of the same product",
    summary: "Water used to rinse a mixer already contains product. Use it as base water for the next batch of the same product family instead of discharging it.",
    type: "reuse", level: "site_ops",
    uses: ["product", "cleaning"], production: ["admixture", "adhesive", "coating"],
    effort: 3, impact: 7, horizon: "< 6 months", cost: "low",
    checkFirst: [
      "Which product families can accept their own rinse water (quality check by the lab)",
      "Storage space for rinse water between batches"
    ],
    steps: [
      "Identify the product families produced often enough to reuse their rinse water.",
      "Collect rinse water in a dedicated, labelled tank per product family.",
      "Let the lab test a batch made with the rinse water.",
      "Adjust the recipe to account for the product already in the water and make it standard."
    ],
    sika: [
      { site: "TH Saraburi", text: "SG-599 cleaning wastewater reused as an ingredient in the next SG-599 batch." },
      { site: "US Fairless Hills", text: "Line rinse water pushed into the mixer is counted in the batch water." },
      { site: "US Jacksonville", text: "Washer water reused on the sealer line, which also increases yield." }
    ],
    others: [{ company: "Holcim", text: "Ready-mix concrete made with recycled water." }],
    note: "Validated by engineering: the only reuse of non-potable water inside products that works today."
  },
  {
    id: "13",
    title: "Treat sanitary and office wastewater for reuse",
    summary: "Offices and facilities can produce a large share of discharge. A compact treatment plant can bring this water back to the quality needed on site.",
    type: "reuse", level: "site_invest",
    uses: ["sanitary", "product", "cleaning"], production: ["all"],
    effort: 8, impact: 7, horizon: "1–2 years", cost: "high",
    checkFirst: [
      "Share of your discharge coming from offices and facilities",
      "Quality needed for the target use (water in products must be potable)"
    ],
    steps: [
      "Measure the volume and quality of sanitary wastewater.",
      "Choose the target use (cleaning, cooling, or product water after full treatment).",
      "Size and install the treatment unit (filtration + UV for example).",
      "Test the treated water and monitor its quality continuously."
    ],
    sika: [
      { site: "RS Simanovci", text: "CHF 615k containerised plant (filtration + UV) treats office sewage, 93% of site discharge, to EN 1008 for admixtures." },
      { site: "MX Abasolo, CO Rionegro", text: "Treatment plants under construction to loop sanitary and process water." }
    ],
    others: [],
    note: "Water used in products must be fit for human consumption, so treatment must reach potable standard."
  },

  /* ---------------- Cleaning water ---------------- */
  {
    id: "2",
    title: "Rinse in several stages",
    summary: "Use clean water only for the final rinse. That once-used rinse water becomes the pre-rinse of the next, dirtier cycle.",
    type: "reuse", level: "site_ops",
    uses: ["cleaning"], production: ["admixture", "adhesive", "membrane", "coating"],
    effort: 2, impact: 6, horizon: "< 6 months", cost: "low",
    checkFirst: ["Space for one or two small buffer tanks"],
    steps: [
      "Collect the final rinse water in a tank.",
      "Use it for the first rinse of the next cleaning cycle.",
      "Keep fresh water for the last rinse only.",
      "Write it into the cleaning procedure so every shift does the same."
    ],
    sika: [{ site: "IN Kharagpur", text: "Lab collects basin water in buckets for the first rinse of glassware." }],
    others: [],
    note: "Already common on some sites but not a standard. Proposed as a standard practice."
  },
  {
    id: "28",
    title: "Use high-pressure, heated washers",
    summary: "Pressure and heat do the job that large volumes of water used to do.",
    type: "reduce", level: "site_invest",
    uses: ["cleaning"], production: ["admixture", "adhesive", "membrane", "coating"],
    effort: 3, impact: 5, horizon: "< 6 months", cost: "low",
    checkFirst: ["Which cleaning tasks use open hoses today"],
    steps: [
      "List the cleaning tasks done with standard hoses.",
      "Replace hoses with high-pressure washers, heated where useful.",
      "Train operators and measure the water used per cleaning."
    ],
    sika: [
      { site: "US Sealy (Houston)", text: "Heated high-pressure system cut tanker rinsing water and time by 30%." },
      { site: "US Jacksonville, US Dunmore", text: "Swapped standard hoses for power washers." }
    ],
    others: []
  },
  {
    id: "27",
    title: "Automate equipment cleaning (clean-in-place)",
    summary: "Automated cleaning uses a fixed, validated amount of water. Manual hoses often lead to over-rinsing.",
    type: "reduce", level: "site_invest",
    uses: ["cleaning"], production: ["admixture", "adhesive", "coating"],
    effort: 6, impact: 6, horizon: "6–12 months", cost: "medium",
    checkFirst: ["Mixers and tanks compatible with spray heads", "Frequency of product changeovers"],
    steps: [
      "Audit current cleaning cycles: time, water volume, changeovers.",
      "Install spray heads and automated rinse control on the main mixers.",
      "Set the cycle (time, action, concentration, temperature) per product.",
      "Group production runs to reduce the number of changeovers."
    ],
    sika: [
      { site: "PH Taguig", text: "Replacing manual scrubbing with automated CIP/COP cleaning." },
      { site: "TH Saraburi", text: "Optimised changeover cleaning of batch mixers." }
    ],
    others: [
      { company: "Henkel (Toluca)", text: "Clean-in-place equipment installed to cut water in cleaning cycles." },
      { company: "Lonza", text: "CIP optimisation to reduce water and chemicals." }
    ]
  },
  {
    id: "29",
    title: "Move from IBC containers to bulk delivery",
    summary: "Every returned IBC container must be washed. Delivering in bulk (tank trucks) removes most of that cleaning.",
    type: "reduce", level: "partner",
    uses: ["cleaning"], production: ["admixture", "adhesive", "coating"],
    effort: 5, impact: 5, horizon: "1–2 years", cost: "medium",
    checkFirst: ["Which customers could accept bulk delivery"],
    steps: [
      "Identify customers who receive large, regular volumes in IBCs.",
      "Offer bulk delivery to them with the sales team.",
      "Track the number of IBCs washed per month."
    ],
    sika: [],
    others: [],
    note: "Depends on customers. Engineering suggests it is better than buying an IBC washer (about CHF 100k and a lot of space)."
  },
  {
    id: "12",
    title: "Outsource container cleaning",
    summary: "A specialised cleaning company can wash bulk containers. It reduces water and wastewater on site, but the water is still used elsewhere.",
    type: "reduce", level: "partner",
    uses: ["cleaning"], production: ["admixture", "adhesive", "coating"],
    effort: 3, impact: 4, horizon: "< 6 months", cost: "low",
    checkFirst: ["A cleaning provider nearby with good water practices"],
    steps: [
      "Count the containers cleaned on site and the water used.",
      "Compare with offers from local cleaning providers.",
      "Choose a provider that recycles its water if possible."
    ],
    sika: [{ site: "RO Ploiesti", text: "IBC cleaning outsourced; saves about 100 litres per IBC on site." }],
    others: [],
    note: "Shifts water use down the supply chain. Prefer measure 29 where customers allow it."
  },
  {
    id: "30",
    title: "Recover water from cleaning water by evaporation",
    summary: "Evaporate used cleaning water to separate clean water from the product residues, then reuse the condensate.",
    type: "reuse", level: "site_invest",
    uses: ["cleaning"], production: ["admixture", "adhesive", "coating"],
    effort: 7, impact: 5, horizon: "1–2 years", cost: "high",
    checkFirst: ["Energy available on site (evaporation uses heat)"],
    steps: [
      "Measure the volume of cleaning wastewater.",
      "Study an evaporator with a supplier, including energy use.",
      "Install and reuse the condensate for cleaning or cooling."
    ],
    sika: [],
    others: [],
    note: "New idea from the engineering call."
  },

  /* ---------------- Cooling ---------------- */
  {
    id: "5",
    title: "Switch to closed-loop cooling",
    summary: "Water circulates in a closed circuit instead of being used once and discharged. The most water-efficient cooling option.",
    type: "reuse", level: "site_invest",
    uses: ["cooling"], production: ["adhesive", "membrane", "coating"],
    effort: 7, impact: 8, horizon: "1–2 years", cost: "high",
    checkFirst: [
      "Which cooling system you have today (once-through, evaporative or closed)",
      "When the current system needs to be replaced"
    ],
    steps: [
      "Map the cooling uses and the current system.",
      "Plan the switch when the old system is due for replacement.",
      "Install the closed loop (heat exchangers, pumps, cooler).",
      "Monitor for leaks, corrosion and biofouling."
    ],
    sika: [
      { site: "DE MBCC Wittenberg", text: "Heat exchangers connected in series: 3,900 m³ of single-pass water eliminated, EUR 20k saved per year." },
      { site: "US Marion (Ohio)", text: "Closed-loop cooling for admixture production." },
      { site: "VE Valencia", text: "Closed-loop cooling in final engineering design." },
      { site: "CN Shanghai", text: "Circulating cooling pumps added for lab extraction." }
    ],
    others: [
      { company: "Henkel (Maribor)", text: "Closed loop cut cooling water by 80%." },
      { company: "Henkel (Cannon Falls)", text: "26,000 m³ saved in the first year." }
    ],
    note: "About 20% of sites need cooling. Closed loop is prioritised when systems are replaced."
  },
  {
    id: "14",
    title: "Use a recirculating cooling tower",
    summary: "If a closed loop is not possible, a cooling tower reuses water many times. Some water is lost by evaporation.",
    type: "reuse", level: "site_invest",
    uses: ["cooling"], production: ["adhesive", "membrane", "coating"],
    effort: 5, impact: 6, horizon: "6–12 months", cost: "medium",
    checkFirst: ["Current cooling system is once-through"],
    steps: [
      "Check the cooling load and the space available.",
      "Install a recirculating tower and water treatment.",
      "Optimise the cycles of concentration to reduce blowdown.",
      "Maintain the tower packing to avoid spills."
    ],
    sika: [{ site: "CN Zhenjiang (Jiangsu)", text: "Aged tower packing replaced to stop water spilling out." }],
    others: [{ company: "Literature", text: "Recycling inside the tower strongly reduces withdrawal compared with once-through cooling." }]
  },
  {
    id: "24",
    title: "Replace water cooling with air cooling",
    summary: "Air-cooled heat exchangers need no cooling water and can recover process heat.",
    type: "reduce", level: "site_invest",
    uses: ["cooling"], production: ["adhesive", "membrane", "coating"],
    effort: 7, impact: 6, horizon: "1–2 years", cost: "high",
    checkFirst: ["Enough outdoor space", "Cooling temperature needed by the process"],
    steps: [
      "Check which processes could be cooled by air.",
      "Study space, noise and energy with a supplier.",
      "Install and recover the heat where possible."
    ],
    sika: [],
    others: [{ company: "PepsiCo (Pune)", text: "Air-cooled heat exchanger recovers heat and condensate without cooling water." }],
    note: "Needs a lot of space."
  },
  {
    id: "23",
    title: "Use sea water or another water body for cooling",
    summary: "Coastal sites can cool with sea water instead of freshwater.",
    type: "reduce", level: "site_invest",
    uses: ["cooling"], production: ["adhesive", "membrane", "coating"],
    effort: 8, impact: 5, horizon: "2+ years", cost: "high",
    checkFirst: ["Site close to the sea", "Local rules on intake and warm-water discharge"],
    steps: [
      "Check permits with local authorities.",
      "Study intake, corrosion-resistant equipment and discharge temperature.",
      "Install and monitor the effect on the water body."
    ],
    sika: [],
    others: [{ company: "Evonik", text: "Uses surface water for cooling at some sites." }],
    note: "Only for coastal sites. Saves freshwater but increases discharge, which hurts the current discharge KPI."
  },

  /* ---------------- Alternative sources ---------------- */
  {
    id: "6",
    title: "Harvest rainwater",
    summary: "Collect rainwater from roofs for cleaning, gardening or sanitary use.",
    type: "reduce", level: "site_invest",
    uses: ["cleaning", "garden", "sanitary"], production: ["all"],
    effort: 4, impact: 4, horizon: "6–12 months", cost: "medium",
    checkFirst: ["Yearly rainfall at your site (not useful in very dry places)", "Roof surface"],
    steps: [
      "Estimate the volume: roof area × yearly rainfall.",
      "Install gutters, filter and storage tank.",
      "Connect it to non-product uses (cleaning, garden, toilets)."
    ],
    sika: [
      { site: "PH Taguig", text: "Rainwater from warehouse roofs stored and used in operations." },
      { site: "CN Zhenjiang, CN MBCC", text: "Rainwater collection in place." },
      { site: "IN Kharagpur", text: "Rooftop rainwater harvesting is required by the regional aquifer plan." }
    ],
    others: [{ company: "Henkel", text: "Rainwater harvesting at 12 adhesives sites (about 20,000 m³ capacity)." }],
    note: "Rain is an irregular supply: use it as a complement, never as the only source."
  },
  {
    id: "7",
    title: "Use treated municipal wastewater for non-product uses",
    summary: "Where the city treats its wastewater, it can supply recycled water for cooling, cleaning or gardening instead of drinking water.",
    type: "reuse", level: "partner",
    uses: ["cooling", "cleaning", "garden"], production: ["all"],
    effort: 7, impact: 7, horizon: "1–2 years", cost: "medium",
    checkFirst: ["A treatment plant close to the site", "Local rules on industrial reuse"],
    steps: [
      "Ask the city or water utility if recycled water is available.",
      "Check its quality against your cooling or cleaning needs.",
      "Agree on supply, price and quality monitoring.",
      "Install a separate network on site."
    ],
    sika: [],
    others: [
      { company: "Holcim", text: "Replaced freshwater with treated municipal wastewater in Mexico City and Morocco." },
      { company: "Henkel (Chennai)", text: "100% of external water is tertiary-treated municipal water." }
    ],
    note: "Engineering flagged risks (cost, bacteria, reliability). Kept for non-product uses only."
  },
  {
    id: "17",
    title: "Share water with neighbouring plants",
    summary: "In industrial parks, one plant's treated water can supply another plant's cooling or cleaning.",
    type: "reuse", level: "partner",
    uses: ["cooling", "cleaning"], production: ["all"],
    effort: 7, impact: 6, horizon: "2+ years", cost: "medium",
    checkFirst: ["Other industries nearby"],
    steps: [
      "List neighbouring plants and their water needs.",
      "Meet them with the park management or utility.",
      "Study a shared treatment or exchange project."
    ],
    sika: [],
    others: [{ company: "BASF (Tarragona)", text: "Wastewater reuse with the local water supplier and other companies." }],
    note: "Never considered by Sika engineering so far, seen as an interesting avenue."
  },
  {
    id: "19",
    title: "Water gardens with treated wastewater",
    summary: "Gardening does not need drinking water. Use treated wastewater or rainwater instead.",
    type: "reuse", level: "site_ops",
    uses: ["garden"], production: ["all"],
    effort: 2, impact: 3, horizon: "< 6 months", cost: "low",
    checkFirst: ["Green areas on site"],
    steps: [
      "Measure how much water goes to gardening.",
      "Connect irrigation to treated wastewater or rainwater.",
      "Water early or late in the day and reduce in summer."
    ],
    sika: [
      { site: "VN Bac Ninh", text: "Facility wastewater reused for gardening." },
      { site: "CN Davco (Wuhan)", text: "Less irrigation water in summer." }
    ],
    others: [{ company: "Henkel (Bay Point)", text: "Drought-resistant plants and drip irrigation saved 7% of site water." }]
  },
  {
    id: "31",
    title: "Cut water use in offices, toilets and canteen",
    summary: "Offices and facilities can be 30–40% of discharge. Low-flow taps, efficient toilets and good habits cost little.",
    type: "reduce", level: "site_ops",
    uses: ["sanitary"], production: ["all"],
    effort: 2, impact: 4, horizon: "< 6 months", cost: "low",
    checkFirst: ["Number of people on site"],
    steps: [
      "Install aerators on taps and dual-flush or waterless toilets.",
      "Fix dripping taps and running toilets quickly.",
      "Run the dishwasher full and display simple tips."
    ],
    sika: [],
    others: [{ company: "Henkel (Rancho Dominguez)", text: "29% less water through irrigation changes and planned waterless urinals." }],
    note: "Added after the engineering call (not yet in the Masta sheet)."
  },

  /* ---------------- People ---------------- */
  {
    id: "25",
    title: "Train teams to find water savings",
    summary: "Operators know where water is wasted. A short training and a site walk turn that knowledge into actions.",
    type: "reduce", level: "site_ops",
    uses: ["all"], production: ["all"],
    effort: 2, impact: 5, horizon: "< 6 months", cost: "low",
    checkFirst: [],
    steps: [
      "Train production and maintenance teams for one hour.",
      "Do a site walk together to list water losses.",
      "Pick the quick fixes and assign owners.",
      "Follow up every quarter."
    ],
    sika: [],
    others: [{ company: "PepsiCo", text: "ReCon programme: about 2,000 people trained and 25 site deep dives in 2024." }]
  },
  {
    id: "11",
    title: "Raise water awareness on site",
    summary: "Explain why water matters for the site: local stress, risk of shortage, cost.",
    type: "reduce", level: "site_ops",
    uses: ["all"], production: ["all"],
    effort: 1, impact: 3, horizon: "< 6 months", cost: "low",
    checkFirst: [],
    steps: [
      "Share the local water risk check with all staff.",
      "Display monthly consumption in the canteen or break room.",
      "Celebrate the savings achieved."
    ],
    sika: [],
    others: [
      { company: "Evonik", text: "Interviews and meetings with employees on water risks and their costs." },
      { company: "Arkema", text: "Optim'o programme with employee engagement." }
    ]
  },

  /* ---------------- Community & watershed ---------------- */
  {
    id: "16",
    title: "Work with local water associations",
    summary: "Local associations and NGOs know the state of the river or aquifer. Working with them helps the site understand and protect its water source.",
    type: "nature", level: "community",
    uses: ["all"], production: ["all"],
    effort: 4, impact: 4, horizon: "6–12 months", cost: "low",
    checkFirst: [],
    steps: [
      "Identify the associations active on your watershed.",
      "Meet them and share your water data.",
      "Join or support one local project."
    ],
    sika: [],
    others: [
      { company: "Henkel", text: "Collective action with communities, NGOs and water authorities." },
      { company: "Lonza", text: "Supports the Living Lakes programme and local stream clean-ups." }
    ]
  },
  {
    id: "8",
    title: "Support community water and sanitation",
    summary: "Fund safe water, sanitation and hygiene projects or watershed replenishment near water-stressed sites.",
    type: "nature", level: "community",
    uses: ["all"], production: ["all"],
    effort: 6, impact: 4, horizon: "1–2 years", cost: "medium",
    checkFirst: ["A clear local need"],
    steps: [
      "Identify needs with local authorities or NGOs.",
      "Choose a project with a partner organisation.",
      "Fund it and report the results."
    ],
    sika: [],
    others: [
      { company: "Holcim", text: "Water purification for schools and communities (Metapán, El Salvador)." },
      { company: "PepsiCo", text: "Community water systems and school rainwater harvesting." }
    ]
  },
  {
    id: "21",
    title: "Restore the local watershed",
    summary: "Reforestation and better soil management help rain infiltrate and reduce erosion, which protects local water resources.",
    type: "nature", level: "community",
    uses: ["all"], production: ["all"],
    effort: 6, impact: 4, horizon: "2+ years", cost: "medium",
    checkFirst: ["A local study showing a water benefit"],
    steps: [
      "Partner with authorities and NGOs.",
      "Choose areas to restore (forest, wetland, invasive species).",
      "Fund and monitor the project for several years."
    ],
    sika: [],
    others: [{ company: "BASF (Guaratinguetá)", text: "Water producer programme with reforestation since 2011." }]
  },
  {
    id: "22",
    title: "Partner with local research institutes",
    summary: "Work with universities or institutes to find and share water-saving practices with customers and communities.",
    type: "nature", level: "partner",
    uses: ["all"], production: ["all"],
    effort: 4, impact: 2, horizon: "1–2 years", cost: "low",
    checkFirst: [],
    steps: ["Contact a local university or institute.", "Define a joint project.", "Share the results locally."],
    sika: [],
    others: [{ company: "BASF", text: "Partnership with IRRI on water-saving rice cultivation." }]
  },

  /* ---------------- Group level ---------------- */
  {
    id: "E",
    title: "Reformulate products to use less or recycled water",
    summary: "Change recipes so products need less freshwater, without moving the water use to the customer.",
    type: "strategy", level: "group",
    uses: ["product"], production: ["admixture", "adhesive", "coating"],
    effort: 8, impact: 8, horizon: "2+ years", cost: "high",
    checkFirst: [], steps: ["R&D screens product lines for water reduction.", "Test with customers.", "Roll out new recipes."],
    sika: [], others: [{ company: "Evonik (Dombivli)", text: "Purified wastewater turned into a saleable product." }],
    note: "Most water at admixture sites ends in products, so this is where impact is largest, but it is an R&D decision."
  },
  {
    id: "M",
    title: "Develop low-water products",
    summary: "R&D on new product types that need less water, without shifting the water use to the customer.",
    type: "strategy", level: "group",
    uses: ["product"], production: ["all"],
    effort: 9, impact: 8, horizon: "2+ years", cost: "high",
    checkFirst: [], steps: ["Set a group R&D goal.", "Pilot new products.", "Scale."],
    sika: [], others: [{ company: "Henkel", text: "Compact and leave-in formulas." }]
  },
  {
    id: "N",
    title: "Develop processes that need less cooling",
    summary: "R&D on production processes with lower cooling needs.",
    type: "strategy", level: "group",
    uses: ["cooling"], production: ["adhesive", "membrane", "coating"],
    effort: 8, impact: 6, horizon: "2+ years", cost: "high",
    checkFirst: [], steps: ["Identify the processes with the highest cooling load.", "Study alternatives with R&D.", "Pilot and scale."],
    sika: [], others: []
  },
  {
    id: "D",
    title: "Set a stricter group standard for discharge quality",
    summary: "Go beyond local permits with one group-wide minimum for wastewater quality.",
    type: "strategy", level: "group",
    uses: ["all"], production: ["all"],
    effort: 5, impact: 5, horizon: "1–2 years", cost: "medium",
    checkFirst: [], steps: ["Define the parameters and limits.", "Add them to the Code of Conduct.", "Monitor every site."],
    sika: [{ site: "Saudi Arabia sites", text: "Not allowed to discharge process water, which makes them very efficient." }],
    others: [{ company: "Holcim", text: "Tracks pH, suspended solids, metals, oil and chlorides before discharge." }]
  },
  {
    id: "K",
    title: "Share best practices between sites",
    summary: "Make it easy for a site to learn from another site that already solved the same problem.",
    type: "strategy", level: "group",
    uses: ["all"], production: ["all"],
    effort: 3, impact: 5, horizon: "< 6 months", cost: "low",
    checkFirst: [], steps: ["Use the Initiative Tracker as a shared library.", "Name contact persons per measure.", "Hold a yearly water call between sites."],
    sika: [], others: [{ company: "Arkema", text: "Internal best-practice sharing." }]
  },
  {
    id: "B",
    title: "Offer concentrated or powder products",
    summary: "Products mixed with water at the point of use lower water dependence at the plant.",
    type: "strategy", level: "group",
    uses: ["product"], production: ["admixture", "adhesive"],
    effort: 8, impact: 6, horizon: "2+ years", cost: "high",
    checkFirst: [], steps: ["Study demand.", "Develop formulations.", "Launch."],
    sika: [], others: [{ company: "Henkel", text: "Compact detergent formulas." }],
    note: "Engineering warning: production and use are local, so this can just move the water use to the customer."
  },
  {
    id: "C",
    title: "Phase out hazardous process chemicals",
    summary: "Fewer hazardous substances protect downstream ecosystems and make internal water recycling easier.",
    type: "strategy", level: "group",
    uses: ["all"], production: ["all"],
    effort: 7, impact: 4, horizon: "2+ years", cost: "medium",
    checkFirst: [], steps: ["List substances of concern.", "Find substitutes.", "Phase out."],
    sika: [], others: [{ company: "Henkel", text: "Phasing out substances of concern and microplastics." }]
  },
  {
    id: "G",
    title: "Integrate nature-based solutions on sites",
    summary: "De-seal soils, plant native vegetation and manage rainwater naturally on site grounds.",
    type: "nature", level: "group",
    uses: ["garden"], production: ["all"],
    effort: 6, impact: 4, horizon: "1–2 years", cost: "medium",
    checkFirst: [], steps: ["Set a group guideline.", "Pilot on one site.", "Roll out."],
    sika: [], others: [{ company: "Lonza", text: "De-sealing soils for natural drainage." }]
  },
  {
    id: "F",
    title: "Screen suppliers for water risk",
    summary: "Check whether key suppliers operate in water-stressed basins and how they manage water.",
    type: "strategy", level: "group",
    uses: ["all"], production: ["all"],
    effort: 5, impact: 3, horizon: "1–2 years", cost: "low",
    checkFirst: [], steps: ["Map supplier locations.", "Screen them for water risk.", "Audit the riskiest."],
    sika: [], others: [{ company: "Holcim", text: "SBTN screening of suppliers in water-scarce areas." }]
  },
  {
    id: "L",
    title: "Train suppliers on water use",
    summary: "Add water to the supplier code of conduct and offer training.",
    type: "strategy", level: "group",
    uses: ["all"], production: ["all"],
    effort: 4, impact: 3, horizon: "1–2 years", cost: "low",
    checkFirst: [], steps: ["Update the supplier code of conduct.", "Offer training through TfS.", "Follow up."],
    sika: [], others: [{ company: "LVMH", text: "Supplier water training through LIFE 360 Business Partners." }]
  },
  {
    id: "H",
    title: "Promote low-water products in marketing",
    summary: "Make low-water products more visible to customers.",
    type: "strategy", level: "group",
    uses: ["product"], production: ["all"],
    effort: 6, impact: 3, horizon: "1–2 years", cost: "medium",
    checkFirst: [], steps: ["Identify low-water products.", "Label them.", "Promote them."],
    sika: [], others: [{ company: "Holcim", text: "Low-water solutions classified in its green portfolio." }]
  }
];
