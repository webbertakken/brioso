import { describe, expect, it } from 'vitest'
import { replaceAll } from './replaceAll'

describe('replaceAll', () => {
  it('replaces every occurrence of a string', () => {
    expect(replaceAll('a-b-c', '-', '/')).toBe('a/b/c')
  })

  it('replaces every match of a regex', () => {
    expect(replaceAll('abc123def', /\d+/, '_')).toBe('abc_def')
  })

  it('respects the limit when provided', () => {
    expect(replaceAll('a-b-c-d', '-', '/', 2)).toBe('a/b')
  })

  it('returns the original string when no match exists', () => {
    expect(replaceAll('hello', 'x', 'y')).toBe('hello')
  })
})
