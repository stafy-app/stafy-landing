import { describe, expect, it } from 'vitest'
import { APP_URL, CONTACT_EMAIL } from '../src/config'
import { vars } from '../src/components/util'

describe('config', () => {
  it('APP_URL is an absolute http(s) URL', () => {
    expect(APP_URL).toMatch(/^https?:\/\//)
  })

  it('CONTACT_EMAIL looks like an email', () => {
    expect(CONTACT_EMAIL).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })
})

describe('vars', () => {
  it('passes the object through unchanged', () => {
    const o = { '--i': 1, '--r': '2px' }
    expect(vars(o)).toBe(o)
  })
})
