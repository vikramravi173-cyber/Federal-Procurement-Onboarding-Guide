import type { GlossaryTerm } from './types'

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'UEI',
    definition:
      'Unique Entity Identifier — the official ID for any entity doing business with the federal government. Replaced the DUNS number in April 2022. Assigned automatically when you register on SAM.gov.',
  },
  {
    term: 'CAGE Code',
    definition:
      'Commercial and Government Entity code — a five-character ID assigned to businesses that register in SAM.gov. Used by the DoD and other agencies to identify your company in procurement systems.',
  },
  {
    term: 'NAICS Code',
    definition:
      'North American Industry Classification System code — a six-digit number describing what your business does. Contracting officers filter opportunities by NAICS, and SBA size standards are tied to specific codes.',
  },
  {
    term: 'SAM.gov',
    definition:
      'System for Award Management — the official U.S. government database where businesses register to bid on federal contracts. Registration is free, required for all federal contractors, and must be renewed every 12 months.',
  },
  {
    term: 'Set-Aside',
    definition:
      'A contract reserved exclusively for small businesses or specific small business categories (8(a), HUBZone, WOSB, SDVOSB). Under the Small Business Act, contracts under $250,000 are automatically set aside for small businesses when two or more qualified small businesses can perform the work.',
  },
  {
    term: 'Sole Source',
    definition:
      'A contract awarded without competitive bidding to a single vendor. Certified businesses in programs like 8(a) and SDVOSB can receive sole-source awards up to certain dollar thresholds without a full competition.',
  },
  {
    term: 'Prime Contractor',
    definition:
      'The company that holds the direct contract with the federal agency. Prime contractors are responsible for overall delivery and often hire subcontractors to perform portions of the work.',
  },
  {
    term: 'Subcontractor',
    definition:
      'A company hired by a prime contractor to perform part of a federal contract. Subcontracting is often the easiest entry point for new small businesses — prime contractors must meet small business subcontracting goals.',
  },
  {
    term: 'FAR',
    definition:
      'Federal Acquisition Regulation — the primary rulebook governing how federal agencies purchase goods and services. All solicitations reference FAR clauses you must comply with.',
  },
  {
    term: 'DFARS',
    definition:
      'Defense Federal Acquisition Regulation Supplement — additional procurement rules that apply specifically to Department of Defense contracts. If you pursue DoD work, DFARS clauses will appear in your solicitations.',
  },
  {
    term: 'FPDS',
    definition:
      'Federal Procurement Data System — the official repository of federal contract award data. Now accessible through USASpending.gov, it shows who bought what, from whom, and for how much.',
  },
  {
    term: 'Past Performance',
    definition:
      'Your track record delivering on previous contracts. Agencies evaluate past performance when scoring proposals. Even commercial work and subcontracting experience count when you have no direct federal contracts yet.',
  },
  {
    term: 'Capability Statement',
    definition:
      'A one-page marketing document that introduces your business to contracting officers and prime contractors. Must include core competencies, past performance, differentiators, NAICS codes, CAGE/UEI, and contact information.',
  },
]
