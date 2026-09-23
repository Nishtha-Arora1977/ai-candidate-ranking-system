const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''
const getBaseUrl = () => {
  if (!API_BASE_URL) return ''
  // Use relative URL for production rewrites if API URL matches origin
  if (typeof window !== 'undefined' && API_BASE_URL === 'http://localhost:8000') {
    return ''
  }
  return API_BASE_URL
}

export interface Candidate {
  id?: string
  name: string
  skills: string
  experience: number
  location: string
  resume_text?: string
  embedding?: number[]
}

export interface MatchResult {
  name: string
  skills: string
  experience: number
  location: string
  score: number
  semantic_similarity: number
  reason: string
}

export interface MatchResponse {
  top_matches: MatchResult[]
}

const buildUrl = (path: string) => {
  const base = getBaseUrl()
  if (!base) {
    return path
  }
  return `${base}${path}`
}

export async function fetchCandidates(): Promise<Candidate[]> {
  const response = await fetch(buildUrl('/candidates'))
  if (!response.ok) {
    throw new Error('Failed to fetch candidates')
  }
  return response.json()
}

export async function matchCandidates(jobDescription: string): Promise<MatchResponse> {
  const response = await fetch(buildUrl('/api/mike/match'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ job_description: jobDescription }),
  })
  if (!response.ok) {
    throw new Error('Failed to match candidates')
  }
  return response.json()
}

export async function generateEmbeddings(): Promise<{ message: string }> {
  const response = await fetch(buildUrl('/generate-embeddings'), {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to generate embeddings')
  }
  return response.json()
}
