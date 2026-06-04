export type BusinessStructure = 'sole-proprietor' | 'llc' | 's-corp' | 'c-corp'

export type IndustryCategory =
  | 'construction'
  | 'it-tech'
  | 'professional-services'
  | 'manufacturing'
  | 'healthcare'
  | 'other'

export type BusinessDesignation =
  | 'none'
  | 'veteran'
  | 'woman-owned'
  | 'minority-owned'
  | 'hubzone'
  | 'multiple'

export type CertificationId = '8a' | 'hubzone' | 'wosb' | 'sdvosb' | 'vosb'

export interface UserProfile {
  businessStructure: BusinessStructure
  industry: IndustryCategory
  designation: BusinessDesignation
  multipleDesignations: CertificationId[]
}

export interface OnboardingStep {
  id: string
  title: string
  explanation: string
  timeEstimate: string
  commonMistake: string
  govLink: { label: string; url: string }
  whyItMatters: string
  section: 'core' | 'capability' | 'find-contracts' | 'bid'
  industryNote?: string
  structureNote?: string
  industryNotes?: Partial<Record<IndustryCategory, string>>
  structureNotes?: Partial<Record<BusinessStructure, string>>
}

export interface CertificationTrack {
  id: CertificationId
  title: string
  eligibility: string[]
  timeline: string
  setAsideValue: string
  applyUrl: string
  applyLabel: string
  designations: BusinessDesignation[]
}

export interface FindContractTool {
  id: string
  title: string
  description: string
  url: string
  urlLabel: string
}

export interface GlossaryTerm {
  term: string
  definition: string
}
