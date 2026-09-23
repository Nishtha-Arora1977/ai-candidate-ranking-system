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

const MOCK_CANDIDATES: Candidate[] = [
  { id: '1', name: 'Aisha Khan', skills: 'Python, FastAPI, AI', experience: 5, location: 'Delhi' },
  { id: '2', name: 'Rohan Mehta', skills: 'Python, LangChain, Machine Learning', experience: 4, location: 'Mumbai' },
  { id: '3', name: 'Priya Singh', skills: 'React, Node.js, TypeScript', experience: 3, location: 'Bangalore' },
]

const MOCK_MATCH: MatchResponse = {
  top_matches: [
    { name: 'Aisha Khan', skills: 'Python, FastAPI, AI', experience: 5, location: 'Delhi', score: 92.4, semantic_similarity: 78.1, reason: 'Matched relevant skills with 5 years experience and semantic similarity score of 78.1' },
    { name: 'Rohan Mehta', skills: 'Python, LangChain, Machine Learning', experience: 4, location: 'Mumbai', score: 85.2, semantic_similarity: 71.3, reason: 'Matched relevant skills with 4 years experience and semantic similarity score of 71.3' },
  ]
}

export async function fetchCandidates(): Promise<Candidate[]> {
  try {
    const response = await fetch(buildUrl('/candidates'))
    if (!response.ok) throw new Error('Failed')
    return response.json()
  } catch {
    // Fallback to mock data when backend is unavailable
    return MOCK_CANDIDATES
  }
}

export async function matchCandidates(jobDescription: string): Promise<MatchResponse> {
  try {
    const response = await fetch(buildUrl('/api/mike/match'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_description: jobDescription }),
    })
    if (!response.ok) throw new Error('Failed')
    return response.json()
  } catch {
    // Fallback mock match when backend is unavailable
    return MOCK_MATCH
  }
}

export async function generateEmbeddings(): Promise<{ message: string }> {
  try {
    const response = await fetch(buildUrl('/generate-embeddings'), {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed')
    return response.json()
  } catch {
    return { message: 'Mock embeddings generated' }
  }
}
