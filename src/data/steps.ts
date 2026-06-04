export interface OnboardingStep {
  id: string
  title: string
  explanation: string
  govLink: {
    label: string
    url: string
  }
  whyItMatters: string
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'size-standards',
    title: 'Confirm Your Business Qualifies as "Small"',
    explanation:
      'Before pursuing federal contracts, verify that your business meets the SBA size standards for your industry. These limits are based on either average annual revenue or number of employees, depending on your NAICS code. Use the SBA Size Standards Tool to look up your industry and confirm eligibility.',
    govLink: {
      label: 'SBA Size Standards Tool',
      url: 'https://www.sba.gov/federal-contracting/contracting-guide/size-standards',
    },
    whyItMatters:
      'Only businesses classified as "small" can compete for set-aside contracts and participate in programs like 8(a) and HUBZone. If you exceed size limits, you will be ineligible for the majority of opportunities designed to help small businesses break into federal contracting.',
  },
  {
    id: 'sam-registration',
    title: 'Register Your Business on SAM.gov',
    explanation:
      'SAM.gov (System for Award Management) is the official U.S. government database of vendors. Create an account, complete entity registration, and provide your business details, banking information for electronic payments, and points of contact. Registration is free but can take 2–4 weeks to process.',
    govLink: {
      label: 'SAM.gov Registration',
      url: 'https://sam.gov/content/entity-registration',
    },
    whyItMatters:
      'You cannot receive a federal contract or grant without an active SAM registration. Agencies use SAM to verify your business exists, check your certifications, and send payments. An expired or missing registration will disqualify your bids.',
  },
  {
    id: 'uei',
    title: 'Obtain Your Unique Entity Identifier (UEI)',
    explanation:
      'The UEI replaced the DUNS number as the official identifier for all entities doing business with the federal government. You receive your UEI automatically when you complete SAM.gov entity registration — no separate application is needed.',
    govLink: {
      label: 'Learn About UEIs',
      url: 'https://sam.gov/content/entity-registration',
    },
    whyItMatters:
      'Every solicitation, invoice, and contract references your UEI. It is how contracting officers find your business, verify your registration status, and process payments. Without it, you are invisible to the federal marketplace.',
  },
  {
    id: 'naics',
    title: 'Identify Your NAICS Codes',
    explanation:
      'NAICS (North American Industry Classification System) codes describe what your business does. You will select primary and secondary codes during SAM registration and when responding to solicitations. Choose codes that accurately reflect the products or services you want to sell to the government.',
    govLink: {
      label: 'NAICS Code Search',
      url: 'https://www.census.gov/naics/',
    },
    whyItMatters:
      'NAICS codes determine which contract opportunities appear in your searches, which size standards apply to you, and whether you qualify for industry-specific set-asides. Incorrect codes mean missed opportunities or rejected bids.',
  },
  {
    id: 'certifications',
    title: 'Explore Small Business Certifications',
    explanation:
      'The SBA offers certifications that unlock exclusive contracting programs: 8(a) Business Development, HUBZone, Women-Owned Small Business (WOSB), Service-Disabled Veteran-Owned (SDVOSB), and others. Each program has specific eligibility requirements and an application process through certify.sba.gov.',
    govLink: {
      label: 'SBA Certification Programs',
      url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs',
    },
    whyItMatters:
      'Certified businesses can access sole-source contracts (awarded without competition up to certain dollar amounts) and compete in set-aside pools with far less competition. Certification can be the fastest path to your first federal contract.',
  },
  {
    id: 'capability-statement',
    title: 'Create a Capability Statement',
    explanation:
      'A capability statement is a concise, one-page document that introduces your business to government buyers and prime contractors. It should include your UEI, NAICS codes, differentiators, past performance, and contact information. Think of it as your business resume for federal contracting.',
    govLink: {
      label: 'SBA Capability Statement Template',
      url: 'https://www.sba.gov/document/support--one-page-capability-statement-template',
    },
    whyItMatters:
      'Contracting officers and prime contractors review dozens of vendors. A clear capability statement helps you stand out, gets you on vendor lists, and is often requested before you are invited to bid or subcontract on a project.',
  },
  {
    id: 'find-opportunities',
    title: 'Search for Contract Opportunities',
    explanation:
      'Federal agencies post solicitations on SAM.gov Contract Opportunities. You can search by keyword, NAICS code, set-aside type, and location. Sign up for email alerts so you are notified when new opportunities matching your profile are posted.',
    govLink: {
      label: 'SAM.gov Contract Opportunities',
      url: 'https://sam.gov/search/?index=opp',
    },
    whyItMatters:
      'This is where the actual work is advertised. Regular searching — or setting up saved searches — ensures you find opportunities early enough to prepare a competitive response before deadlines close.',
  },
  {
    id: 'far-basics',
    title: 'Learn the Basics of Federal Acquisition Rules',
    explanation:
      'The Federal Acquisition Regulation (FAR) governs how agencies buy goods and services. Key concepts include contract types, small business subcontracting plans, labor standards, and compliance requirements. You do not need to memorize the FAR, but you should understand the rules that apply to any solicitation you pursue.',
    govLink: {
      label: 'Federal Acquisition Regulation (FAR)',
      url: 'https://www.acquisition.gov/browse/index/far',
    },
    whyItMatters:
      'Non-compliance with FAR clauses is one of the top reasons bids are rejected or contracts are terminated. Understanding the rules protects your business from costly mistakes and shows contracting officers you are a serious, prepared vendor.',
  },
  {
    id: 'financial-systems',
    title: 'Set Up Payment & Invoicing Systems',
    explanation:
      'The government pays electronically through systems like Wide Area Workflow (WAWF) and Invoice Processing Platform (IPP). You will need a business bank account, proper invoicing procedures, and familiarity with how to submit invoices against contract line items. Some contracts also require performance and payment bonds.',
    govLink: {
      label: 'Wide Area Workflow (WAWF)',
      url: 'https://wawf.eb.mil/',
    },
    whyItMatters:
      'Even after winning a contract, payment delays or rejections can hurt your cash flow. Setting up invoicing systems before you win ensures you get paid on time and maintain the financial health needed to deliver on contracts.',
  },
  {
    id: 'submit-bid',
    title: 'Submit Your First Bid or Proposal',
    explanation:
      'When you find an opportunity that fits, read the entire solicitation carefully. Note the deadline, required forms, evaluation criteria, and submission method. Prepare your pricing, technical approach, and any required representations and certifications. Submit before the deadline — late bids are never accepted.',
    govLink: {
      label: 'SBA Guide to Responding to Solicitations',
      url: 'https://www.sba.gov/federal-contracting/bidding/understanding-solicitation',
    },
    whyItMatters:
      'This is where preparation becomes action. Your first bid teaches you more than any guide — you will learn what agencies expect, how to price competitively, and how to improve for the next opportunity. Every successful contractor started with a first submission.',
  },
]
