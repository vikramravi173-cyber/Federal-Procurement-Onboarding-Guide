import type { OnboardingStep } from './types'

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'size-standards',
    title: 'Confirm Your Business Qualifies as "Small"',
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
    },
  },
  {
    id: 'sam-registration',
    title: 'Register Your Business on SAM.gov',
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
  },
  {
    id: 'uei',
    title: 'Obtain Your Unique Entity Identifier (UEI)',
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
    title: 'Identify Your NAICS Codes',
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
    },
  },
  {
    id: 'far-basics',
    title: 'Learn the Basics of Federal Acquisition Rules',
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
  },
  {
    id: 'financial-systems',
    title: 'Set Up Payment & Invoicing Systems',
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
    title: 'Build Your Capability Statement',
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
  },
  {
    id: 'submit-bid',
    title: 'Submit Your First Bid or Proposal',
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
