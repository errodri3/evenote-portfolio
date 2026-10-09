// The secret note, like getting a new note in Swapnote.
//
// Once someone has looked at the About page and at least PROJECTS_NEEDED projects,
// a pop-up says they got a new note. After that (Open it or Later), the next time
// they're on the home screen the note flies in and lands on the wave as a sealed
// envelope. Before that, it isn't on the wave at all.
//
// Progress is saved in the visitor's browser, so it remembers between visits.

import { useSyncExternalStore } from 'react'

export const PROJECTS_NEEDED = 2
const PROJECTS = ['c2l', 'ai4all', 'nudge']
const KEY = 'evenote-mail'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
}
let state = { visited: [], delivered: false, arrived: false, opened: false, ...load() }
const listeners = new Set()

function save(next) {
  state = { ...state, ...next }
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* private window: just don't remember */ }
  listeners.forEach((fn) => fn())
}

// call this when a page is viewed
export function markVisit(pathname) {
  const key = pathname.startsWith('/about') ? 'about'
    : PROJECTS.find((p) => pathname === `/work/${p}`)
  if (key && !state.visited.includes(key)) save({ visited: [...state.visited, key] })
}

export const markDelivered = () => save({ delivered: true })
export const markArrived = () => save({ arrived: true })     // the arrival animation has played on the home screen
export const markOpened = () => save({ delivered: true, arrived: true, opened: true })
// for testing: run  localStorage.removeItem('evenote-mail')  in the browser console, then reload

// is the note ready to be delivered?
export function isUnlocked(s = state) {
  const projects = s.visited.filter((k) => PROJECTS.includes(k)).length
  return s.opened || (s.visited.includes('about') && projects >= PROJECTS_NEEDED)
}

const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn) }
const snapshot = () => state

// use in a component:  const mail = useMail()  →  mail.unlocked, mail.delivered, mail.opened
export function useMail() {
  const s = useSyncExternalStore(subscribe, snapshot)
  return { ...s, unlocked: isUnlocked(s) }
}
