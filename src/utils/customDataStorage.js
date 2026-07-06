const KEYS = {
  customSubjects: 'game-nckh-custom-subjects',
  questionsBySubject: 'game-nckh-questions-by-subject',
  selectedSubjectId: 'game-nckh-selected-subject-id',
  selectedGrade: 'game-nckh-selected-grade'
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota errors
  }
}

export function loadCustomSubjects() {
  const data = readJson(KEYS.customSubjects, [])
  return Array.isArray(data) ? data : []
}

export function saveCustomSubjects(subjects) {
  writeJson(KEYS.customSubjects, subjects)
}

export function loadQuestionsBySubject(subjectId) {
  const map = readJson(KEYS.questionsBySubject, {})
  if (!subjectId || !(subjectId in map)) return null
  const questions = map[subjectId]
  return Array.isArray(questions) ? questions : null
}

export function saveQuestionsBySubject(subjectId, questions) {
  if (!subjectId) return
  const map = readJson(KEYS.questionsBySubject, {})
  map[subjectId] = questions
  writeJson(KEYS.questionsBySubject, map)
}

export function loadSelectedSubjectId() {
  try {
    return localStorage.getItem(KEYS.selectedSubjectId) || null
  } catch {
    return null
  }
}

export function saveSelectedSubjectId(subjectId) {
  try {
    if (subjectId) {
      localStorage.setItem(KEYS.selectedSubjectId, subjectId)
    } else {
      localStorage.removeItem(KEYS.selectedSubjectId)
    }
  } catch {
    // ignore
  }
}

export function loadSelectedGrade() {
  try {
    return localStorage.getItem(KEYS.selectedGrade) || 'Tất cả'
  } catch {
    return 'Tất cả'
  }
}

export function saveSelectedGrade(grade) {
  try {
    localStorage.setItem(KEYS.selectedGrade, grade)
  } catch {
    // ignore
  }
}
