import { useCallback, useEffect, useState } from 'react'
import type { UserProfile } from '../data/types'

const PROFILE_KEY = 'federal-procurement-user-profile'
const INTAKE_COMPLETE_KEY = 'federal-procurement-intake-complete'

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(PROFILE_KEY)
      if (stored) return JSON.parse(stored) as UserProfile
    } catch {
      /* ignore */
    }
    return null
  })

  const [intakeComplete, setIntakeComplete] = useState<boolean>(() => {
    return localStorage.getItem(INTAKE_COMPLETE_KEY) === 'true'
  })

  useEffect(() => {
    if (profile) localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    localStorage.setItem(INTAKE_COMPLETE_KEY, String(intakeComplete))
  }, [intakeComplete])

  const saveProfile = useCallback((p: UserProfile) => {
    setProfile(p)
    setIntakeComplete(true)
  }, [])

  const resetProfile = useCallback(() => {
    setProfile(null)
    setIntakeComplete(false)
    localStorage.removeItem(PROFILE_KEY)
    localStorage.removeItem(INTAKE_COMPLETE_KEY)
  }, [])

  return { profile, intakeComplete, saveProfile, resetProfile }
}
