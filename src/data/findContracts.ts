import type { FindContractTool } from './types'

export const findContractTools: FindContractTool[] = [
  {
    id: 'sam-opportunities',
    title: 'SAM.gov Contract Opportunities',
    description:
      'The official portal where federal agencies post solicitations, RFQs, and RFPs. Search by NAICS code, keyword, set-aside type, or agency. Under the Small Business Act, contracts under $250,000 are automatically set aside for small businesses when at least two qualified small businesses can perform the work — so many opportunities you see here are reserved specifically for companies like yours.',
    url: 'https://sam.gov/search/?index=opp',
    urlLabel: 'Search SAM.gov Opportunities',
  },
  {
    id: 'usaspending',
    title: 'USASpending.gov',
    description:
      'The public face of federal spending data (formerly FPDS). Use it to research which agencies buy what you sell, how much they spend, and who their current vendors are. Search by NAICS code, agency, or contractor name to identify target agencies and build a pipeline strategy before you ever submit a bid.',
    url: 'https://www.usaspending.gov/',
    urlLabel: 'Explore USASpending.gov',
  },
  {
    id: 'sub-net',
    title: 'SBA SUB-Net (Subcontracting Network)',
    description:
      'The SBA Subcontracting Network connects small businesses with prime contractors looking for subcontractors. Prime contractors on large federal contracts must meet small business subcontracting goals — they actively post opportunities here. This is often the fastest path to your first federal revenue without competing for a prime contract directly.',
    url: 'https://subnet.sba.gov/client/dsp_Landing.cfm',
    urlLabel: 'Browse SBA SUB-Net',
  },
]
