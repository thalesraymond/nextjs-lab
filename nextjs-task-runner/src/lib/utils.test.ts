import { cn } from './utils'
import { describe, it, expect } from 'vitest'

describe('cn', () => {
  it('combines classes', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('merges tailwind classes', () => {
    expect(cn('px-2 py-2', 'p-4')).toBe('p-4')
  })
})
