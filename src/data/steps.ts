import type { OnboardingStep } from './types'

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'size-standards',
    title: 'Prove your business counts as "small"',
    explanation:
      'Before pursuing federal contracts, verify that your business meets the SBA size standards for your industry. These limits are based on either average annual revenue or number of employees, depending on your NAICS code. Use the SBA Size Standards Tool to look up your industry and confirm eligibility.',
    timeEstimate: '1–2 hours to research and confirm',
    commonMistake:
      'Assuming you are "small" without checking your specific NAICS code. Size standards vary dramatically — a business with $10M revenue may be small in one industry but large in another. Always verify against the NAICS code you plan to use.',
    govLink: {
      label: 'SBA Size Standards Tool',
      url: 'https://www.sba.gov/federal-contracting/contracting-guide/size-standards',
    },
    whyItMatters:
      'Only businesses classified as "small" can compete for set-aside contracts and participate in programs like 8(a) and HUBZone. If you exceed size limits, you will be ineligible for the majority of opportunities designed to help small businesses break into federal contracting.',
    section: 'core',
    industryNotes: {
      construction:
        'Construction NAICS codes often use $39.5M–$45M revenue thresholds. Bonding capacity also factors into your readiness — start researching surety requirements early.',
      'it-tech':
        'IT and tech NAICS codes typically use $34M–$34.5M revenue thresholds. Many agencies set aside IT contracts specifically for small businesses.',
      'professional-services':
        'Professional services thresholds vary widely by sub-sector ($8M–$25M). Identify your specific NAICS before assuming eligibility.',
      manufacturing:
        'Manufacturing size standards range from 500 to 1,500 employees depending on sub-sector. Employee count, not revenue, is the primary metric.',
      healthcare:
        'Healthcare NAICS codes often have employee-based thresholds (1,000–1,500 employees). Medical staffing and equipment sub-sectors differ significantly.',
      'transportation-logistics':
        'Transportation and warehousing NAICS codes commonly use $7.5M–$34.5M revenue thresholds depending on sub-sector (e.g., 484110 General Freight Trucking, 488510 Freight Transportation Arrangement).',
      'facilities-maintenance':
        'Facilities support and building maintenance NAICS codes (e.g., 561210, 561720) often use $25M–$41.5M revenue thresholds. Janitorial and grounds contracts may have separate size standards.',
      'education-training':
        'Education and training services NAICS codes (e.g., 611430, 611420) typically use revenue-based thresholds in the $8M–$19M range. Federal training contracts often reference specific labor categories.',
      defense:
        'Defense and aerospace NAICS codes vary by sub-sector — manufacturing often uses 500–1,500 employee thresholds while engineering and R&D services may use $25M–$41.5M revenue limits. Verify size standards for each code you plan to pursue with DoD.',
    },
    designationNotes: {
      'native-american-owned':
        'Native American-owned and tribally-owned businesses may qualify for the SBA 8(a) Business Development program. SBA size standards for your NAICS code still apply.',
      'economically-disadvantaged-woman':
        'EDWOSBs must meet SBA size standards plus economic disadvantage criteria under the WOSB/EDWOSB program. Eligibility depends on your NAICS code and ownership structure.',
    },
  },
  {
    id: 'sam-registration',
    title: 'Get on SAM.gov so agencies can pay you',
    explanation:
      'SAM.gov (System for Award Management) is the official U.S. government database of vendors. Create an account, complete entity registration, and provide your business details, banking information for electronic payments, and points of contact. Registration is free.',
    timeEstimate: '2–4 hours to complete the application; 7–10 business days to activate after submission',
    commonMistake:
      'SAM.gov registration expires every 12 months — a lapsed registration automatically disqualifies you from contract awards. Also, your legal business name in SAM must match your IRS EIN records exactly (including "LLC" or "Inc.") or your registration gets rejected.',
    govLink: {
      label: 'SAM.gov Registration',
      url: 'https://sam.gov/content/entity-registration',
    },
    whyItMatters:
      'You cannot receive a federal contract or grant without an active SAM registration. Agencies use SAM to verify your business exists, check your certifications, and send payments. An expired or missing registration will disqualify your bids.',
    section: 'core',
    structureNotes: {
      'sole-proprietor':
        'Sole proprietors can register using their SSN, but using an EIN is strongly recommended. An EIN presents a more professional entity profile to contracting officers.',
      llc: 'Register using your LLC\'s legal name exactly as it appears on your state formation documents and IRS EIN letter.',
      's-corp':
        'S-corps must register under the corporate legal name. Ensure your responsible party and officer information matches your corporate records.',
      'c-corp':
        'C-corps must register under the corporate legal name. You will need your EIN, state of incorporation, and corporate officer details.',
    },
    designationNotes: {
      veteran:
        'In SAM.gov you can self-represent as VOSB and/or SDVOSB. VA-verified SDVOSB status is required for some VA set-aside contracts.',
      'native-american-owned':
        'Ensure SAM entity records match SBA 8(a) application data. Tribally-owned entities follow SBA regulations for 8(a) participation.',
      'economically-disadvantaged-woman':
        'WOSB/EDWOSB representations in SAM must align with SBA certification rules for your NAICS codes (self-certification or third-party, per SBA lists).',
      hubzone:
        'HUBZone certification requires your principal office and employee residency to meet SBA HUBZone requirements before representing status in SAM.',
    },
  },
  {
    id: 'uei',
    title: 'Grab your UEI (your government ID number)',
    explanation:
      'The UEI is the official identifier for all entities doing business with the federal government. You receive your UEI automatically when you complete SAM.gov entity registration — no separate application is needed. You will also receive a CAGE code at the same time.',
    timeEstimate: '1–2 business days after SAM.gov registration is submitted (issued automatically)',
    commonMistake:
      'Any guide or resource that mentions a "DUNS number" is outdated. The UEI replaced DUNS in April 2022. You no longer need to contact Dun & Bradstreet — your UEI is assigned for free through SAM.gov.',
    govLink: {
      label: 'Learn About UEIs on SAM.gov',
      url: 'https://sam.gov/content/entity-registration',
    },
    whyItMatters:
      'Every solicitation, invoice, and contract references your UEI. It is how contracting officers find your business, verify your registration status, and process payments. Without it, you are invisible to the federal marketplace.',
    section: 'core',
  },
  {
    id: 'naics',
    title: 'Pick NAICS codes that match what you sell',
    explanation:
      'NAICS (North American Industry Classification System) codes describe what your business does. You will select primary and secondary codes during SAM registration and when responding to solicitations. Choose codes that accurately reflect the products or services you want to sell to the government.',
    timeEstimate: '1–2 hours to research and select the right codes',
    commonMistake:
      'NAICS codes matter because contracting officers filter opportunity searches by them. Picking the wrong code — or being too broad — means you won\'t appear in searches and will miss relevant solicitations entirely.',
    govLink: {
      label: 'NAICS Code Search',
      url: 'https://www.census.gov/naics/',
    },
    whyItMatters:
      'NAICS codes determine which contract opportunities appear in your searches, which size standards apply to you, and whether you qualify for industry-specific set-asides. Incorrect codes mean missed opportunities or rejected bids.',
    section: 'core',
    industryNotes: {
      construction:
        'Common construction NAICS: 236220 (Commercial Building), 237310 (Highway/Street), 238210 (Electrical). You may need multiple codes if you perform both general and specialty work.',
      'it-tech':
        'Common IT NAICS: 541511 (Custom Computer Programming), 541512 (Computer Systems Design), 541519 (Other Computer Related Services), 518210 (Data Processing/Hosting).',
      'professional-services':
        'Common codes: 541611 (Administrative Management Consulting), 541612 (Human Resources Consulting), 541690 (Other Scientific/Technical Consulting).',
      manufacturing:
        'Manufacturing codes are highly specific — 332XXX for fabricated metals, 334XXX for electronics, 336XXX for transportation equipment. Match your actual production activity.',
      healthcare:
        'Common codes: 621111 (Offices of Physicians), 621610 (Home Health Care), 339112 (Surgical/Medical Instrument Manufacturing).',
      other:
        'If your industry doesn\'t fit neatly, search the NAICS manual by keyword. Select the code that best describes what you actually sell to the government, not what you aspire to do.',
      'transportation-logistics':
        'Common codes: 484110 (General Freight Trucking), 484121 (General Freight Long-Distance), 488510 (Freight Transportation Arrangement), 493110 (General Warehousing).',
      'facilities-maintenance':
        'Common codes: 561210 (Facilities Support Services), 561720 (Janitorial Services), 561730 (Landscaping), 238220 (Plumbing/HVAC when maintenance-focused).',
      'education-training':
        'Common codes: 611430 (Professional and Management Development Training), 611420 (Computer Training), 611519 (Other Technical and Trade Schools).',
      defense:
        'Common defense NAICS: 336411 (Aircraft Manufacturing), 541330 (Engineering Services), 541512 (Computer Systems Design), 541715 (R&D in Physical/Engineering Sciences). Match codes to the systems, services, or R&D you deliver to DoD.',
    },
    designationNotes: {
      'woman-owned':
        'WOSB set-aside contracts are limited to NAICS codes on the SBA WOSB/EDWOSB eligible industries list — verify your codes before bidding.',
      'economically-disadvantaged-woman':
        'EDWOSB set-asides also require your NAICS to appear on the SBA eligible industries list at certify.sba.gov.',
      'minority-owned':
        '8(a) and minority-owned set-asides still require accurate NAICS selection — your codes determine which solicitations appear in searches.',
      'native-american-owned':
        'Tribally-owned and Native American-owned firms select NAICS codes reflecting commercial activity reviewed under 8(a) guidelines.',
    },
  },
  {
    id: 'far-basics',
    title: 'Know the buying rules before you bid',
    explanation:
      'The Federal Acquisition Regulation (FAR) governs how agencies buy goods and services. Key concepts include contract types, small business subcontracting plans, labor standards, and compliance requirements. You do not need to memorize the FAR, but you should understand the rules that apply to any solicitation you pursue.',
    timeEstimate: '2–4 hours for an introductory overview',
    commonMistake:
      'Ignoring FAR clauses in a solicitation because they look like boilerplate. Clauses about wages (Service Contract Act), cybersecurity (DFARS 252.204-7012), and Buy American requirements can disqualify your bid or create liability if you fail to comply.',
    govLink: {
      label: 'Federal Acquisition Regulation (FAR)',
      url: 'https://www.acquisition.gov/browse/index/far',
    },
    whyItMatters:
      'Non-compliance with FAR clauses is one of the top reasons bids are rejected or contracts are terminated. Understanding the rules protects your business from costly mistakes and shows contracting officers you are a serious, prepared vendor.',
    section: 'core',
    industryNotes: {
      defense:
        'DoD contracts incorporate the Defense Federal Acquisition Regulation Supplement (DFARS) in addition to FAR. Review DFARS clauses for cybersecurity, export controls, and subcontract flow-down requirements before responding.',
    },
  },
  {
    id: 'financial-systems',
    title: 'Set up invoicing so you get paid on time',
    explanation:
      'The government pays electronically through systems like Wide Area Workflow (WAWF) and the Invoice Processing Platform (IPP). You will need a business bank account, proper invoicing procedures, and familiarity with how to submit invoices against contract line items. Some contracts also require performance and payment bonds.',
    timeEstimate: '1–2 weeks to set up accounts and test invoicing workflows',
    commonMistake:
      'Waiting until you win a contract to set up WAWF/IPP invoicing accounts. Payment systems take time to configure and test — set them up during registration so you can invoice immediately after award.',
    govLink: {
      label: 'Wide Area Workflow (WAWF)',
      url: 'https://wawf.eb.mil/',
    },
    whyItMatters:
      'Even after winning a contract, payment delays or rejections can hurt your cash flow. Setting up invoicing systems before you win ensures you get paid on time and maintain the financial health needed to deliver on contracts.',
    section: 'core',
    structureNotes: {
      'sole-proprietor':
        'Use a dedicated business bank account even as a sole proprietor. Commingling personal and business funds creates accounting problems when invoicing the government.',
      llc: 'Ensure your bank account is opened in the exact legal name of your LLC as registered with the IRS.',
    },
  },
  {
    id: 'capability-statement',
    title: 'Write a one-page capability statement',
    explanation:
      'A capability statement is a one-page document that serves as your business resume for federal contracting. Contracting officers and prime contractors review capability statements to decide who to invite to bid or subcontract. You will be asked for one before almost any formal opportunity.',
    timeEstimate: '2–4 hours to draft; refine over time as you gain experience',
    commonMistake:
      'Creating a generic marketing brochure instead of a targeted capability statement. Each version should be tailored to the agency or prime contractor you are approaching, highlighting relevant past performance and NAICS codes.',
    govLink: {
      label: 'SBA Capability Statement Template',
      url: 'https://www.sba.gov/document/support--one-page-capability-statement-template',
    },
    whyItMatters:
      'Contracting officers and prime contractors review dozens of vendors. A clear capability statement helps you stand out, gets you on vendor lists, and is often requested before you are invited to bid or subcontract on a project.',
    section: 'capability',
    industryNotes: {
      'transportation-logistics':
        'Highlight fleet capacity, safety record (FMCSA data if applicable), geographic coverage, and any GSA Fleet or freight contract experience.',
      'facilities-maintenance':
        'Highlight facilities cleared personnel (if any), geographic coverage, staffing capacity, and experience with federal building maintenance or janitorial contracts.',
      'education-training':
        'List instructor qualifications, curriculum areas, past federal or agency training contracts, and applicable NAICS codes for the training you deliver.',
      defense:
        'Highlight security clearances (facility and personnel), CMMC level, ITAR/EAR compliance, past DoD contract performance, and quality certifications such as ISO 9001 or AS9100.',
    },
  },
  {
    id: 'submit-bid',
    title: 'Send your first bid before the deadline',
    explanation:
      'When you find an opportunity that fits, read the entire solicitation carefully. Note the deadline, required forms, evaluation criteria, and submission method. Prepare your pricing, technical approach, and any required representations and certifications. Submit before the deadline — late bids are never accepted.',
    timeEstimate: '1–4 weeks per solicitation depending on complexity',
    commonMistake:
      'Submitting a bid without verifying your SAM.gov registration is active and your UEI is correct in the solicitation system. A technically perfect proposal is automatically rejected if your SAM registration has lapsed or your entity profile doesn\'t match.',
    govLink: {
      label: 'SBA Guide to Responding to Solicitations',
      url: 'https://www.sba.gov/federal-contracting/bidding/understanding-solicitation',
    },
    whyItMatters:
      'This is where preparation becomes action. Your first bid teaches you more than any guide — you will learn what agencies expect, how to price competitively, and how to improve for the next opportunity. Every successful contractor started with a first submission.',
    section: 'bid',
    industryNotes: {
      'transportation-logistics':
        'Transportation solicitations often require proof of insurance, DOT registration, and past performance on similar routes or schedules — gather these before the deadline.',
      'facilities-maintenance':
        'Facilities bids frequently require staffing plans, wage determination compliance (Service Contract Act), and transition plans — review labor clauses early.',
      'education-training':
        'Training proposals typically require detailed curricula, instructor resumes, and per-seat or per-hour pricing — match the evaluation criteria in the solicitation.',
      defense:
        'Defense solicitations often include DFARS clauses, export control requirements (ITAR/EAR), cybersecurity (CMMC/DFARS 252.204-7012), and may require cleared personnel or facilities — confirm compliance before the deadline.',
    },
    designationNotes: {
      veteran:
        'Set-aside solicitations for SDVOSB or VOSB will require representation in SAM and may require VA VetBiz verification for VA contracts.',
      'woman-owned':
        'WOSB set-aside solicitations require active WOSB certification (or approved self-certification) for the solicitation NAICS code.',
      'economically-disadvantaged-woman':
        'EDWOSB set-aside solicitations require meeting EDWOSB eligibility and certification requirements for the listed NAICS code.',
      'minority-owned':
        '8(a) sole-source and set-aside opportunities require active 8(a) certification through certify.sba.gov.',
      'native-american-owned':
        '8(a) opportunities require active 8(a) certification; tribally-owned entities must meet SBA ownership and control requirements.',
      hubzone:
        'HUBZone set-aside solicitations require active HUBZone certification and HUBZone representation in SAM.gov.',
    },
  },
]

export const capabilityStatementMustInclude = [
  'Core competencies — what you do best, stated clearly in 2–3 sentences',
  'Past performance — 2–3 examples of relevant work (commercial or government)',
  'Differentiators — what sets you apart from competitors (certifications, expertise, location)',
  'NAICS codes — primary and secondary codes for the work you want',
  'CAGE code and UEI — your government identifiers',
  'Contact information — name, title, phone, and email of a reachable decision-maker',
  'Company data — legal name, DBA (if any), year established, and number of employees',
]
