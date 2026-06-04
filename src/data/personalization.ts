import type {
  BusinessDesignation,
  CertificationId,
  CertificationTrack,
  IndustryCategory,
  OnboardingStep,
  UserProfile,
} from './types'
import { certificationTracks } from './certifications'
import { onboardingSteps } from './steps'

export function getCertificationTracks(profile: UserProfile): CertificationTrack[] {
  const { designation, multipleDesignations } = profile

  if (designation === 'none') return certificationTracks

  if (designation === 'multiple') {
    if (multipleDesignations.length === 0) return certificationTracks
    return certificationTracks.filter((t) => multipleDesignations.includes(t.id))
  }

  const designationMap: Record<Exclude<BusinessDesignation, 'none' | 'multiple'>, CertificationId[]> = {
    veteran: ['sdvosb', 'vosb'],
    'woman-owned': ['wosb'],
    'minority-owned': ['8a'],
    hubzone: ['hubzone'],
  }

  const relevantIds = designationMap[designation]
  const primary = certificationTracks.filter((t) => relevantIds.includes(t.id))
  const others = certificationTracks.filter((t) => !relevantIds.includes(t.id))

  return [...primary, ...others]
}

export function isRecommendedCert(
  track: CertificationTrack,
  profile: UserProfile,
): boolean {
  const { designation, multipleDesignations } = profile

  if (designation === 'none') return false

  if (designation === 'multiple') {
    return multipleDesignations.includes(track.id)
  }

  const map: Record<Exclude<BusinessDesignation, 'none' | 'multiple'>, CertificationId[]> = {
    veteran: ['sdvosb', 'vosb'],
    'woman-owned': ['wosb'],
    'minority-owned': ['8a'],
    hubzone: ['hubzone'],
  }

  return map[designation].includes(track.id)
}

export function getPersonalizedSteps(profile: UserProfile): OnboardingStep[] {
  return onboardingSteps.map((step) => ({
    ...step,
    industryNote: step.industryNotes?.[profile.industry],
    structureNote: step.structureNotes?.[profile.businessStructure],
  }))
}

export function getAllTrackableIds(profile: UserProfile): string[] {
  const steps = getPersonalizedSteps(profile)
  const certs = getCertificationTracks(profile)
  const findTools = ['find-contracts-section']
  return [
    ...steps.map((s) => s.id),
    ...certs.map((c) => `cert-${c.id}`),
    ...findTools,
  ]
}

export function getIndustryLabel(industry: IndustryCategory): string {
  const labels: Record<IndustryCategory, string> = {
    construction: 'Construction',
    'it-tech': 'IT / Tech',
    'professional-services': 'Professional Services',
    manufacturing: 'Manufacturing',
    healthcare: 'Healthcare',
    other: 'Other',
  }
  return labels[industry]
}

export function getStructureLabel(structure: UserProfile['businessStructure']): string {
  const labels = {
    'sole-proprietor': 'Sole Proprietor',
    llc: 'LLC',
    's-corp': 'S-Corp',
    'c-corp': 'C-Corp',
  }
  return labels[structure]
}

export function getDesignationLabel(designation: BusinessDesignation): string {
  const labels: Record<BusinessDesignation, string> = {
    none: 'None / Not sure yet',
    veteran: 'Veteran-Owned (SDVOSB/VOSB)',
    'woman-owned': 'Woman-Owned (WOSB)',
    'minority-owned': 'Minority-Owned (8(a) eligible)',
    hubzone: 'HUBZone Located',
    multiple: 'Multiple Designations',
  }
  return labels[designation]
}
