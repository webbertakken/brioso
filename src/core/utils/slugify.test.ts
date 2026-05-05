import { describe, expect, it } from 'vitest'
import { slugify } from './slugify'

describe('slugify', () => {
  it('lowercases the input', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('replaces spaces with hyphens', () => {
    expect(slugify('a b c')).toBe('a-b-c')
  })

  it('replaces underscores with hyphens', () => {
    expect(slugify('a_b_c')).toBe('a-b-c')
  })

  it('collapses runs of whitespace and underscores', () => {
    expect(slugify('a  b__c')).toBe('a-b-c')
  })

  it('url-encodes non-ASCII characters', () => {
    expect(slugify('café')).toBe('caf%C3%A9')
  })
})
