const STORAGE_KEY = 'gemini_api_key'

export function getGeminiApiKey() {
  try {
    return localStorage.getItem(STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

export function setGeminiApiKey(key) {
  try {
    localStorage.setItem(STORAGE_KEY, key)
  } catch {
    // ignore quota errors
  }
}
