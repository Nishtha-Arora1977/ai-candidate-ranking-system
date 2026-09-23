'use client'

import { useState, useEffect, useMemo } from 'react'
import { fetchCandidates, matchCandidates, Candidate, MatchResult } from '@/lib/api'
import CandidateCard from '@/components/CandidateCard'
import JobDescriptionForm from '@/components/JobDescriptionForm'
import SearchBar from '@/components/SearchBar'
import StatsCard from '@/components/StatsCard'

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [matchResults, setMatchResults] = useState<MatchResult[]>([])
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(true)
  const [isLoadingMatch, setIsLoadingMatch] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('all')

  useEffect(() => {
    loadCandidates()
  }, [])

  const loadCandidates = async () => {
    setIsLoadingCandidates(true)
    setError(null)
    try {
      const data = await fetchCandidates()
      setCandidates(data)
      setIsConnected(true)
    } catch (err) {
      setError('Failed to load candidates. Make sure the backend is running.')
      setIsConnected(false)
    } finally {
      setIsLoadingCandidates(false)
    }
  }

  const handleMatch = async (jobDescription: string) => {
    setIsLoadingMatch(true)
    setError(null)
    try {
      const response = await matchCandidates(jobDescription)
      setMatchResults(response.top_matches)
      setIsConnected(true)
    } catch (err) {
      setError('Failed to match candidates. Please try again.')
      setIsConnected(false)
    } finally {
      setIsLoadingMatch(false)
    }
  }

  const filteredCandidates = useMemo(() => {
    if (!matchResults.length) return []

    return matchResults.filter(candidate => {
      const matchesSearch = searchQuery === '' ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLocation = locationFilter === 'all' ||
        candidate.location === locationFilter

      return matchesSearch && matchesLocation
    })
  }, [matchResults, searchQuery, locationFilter])

  const stats = useMemo(() => {
    if (!candidates.length) return { total: 0, avgExperience: 0, locations: 0 }

    const locations = new Set(candidates.map(c => c.location))
    const avgExperience = candidates.reduce((sum, c) => sum + c.experience, 0) / candidates.length

    return {
      total: candidates.length,
      avgExperience: parseFloat(avgExperience.toFixed(1)),
      locations: locations.size
    }
  }, [candidates])

  return (
    <div className="relative min-h-screen bg-dark-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="aurora w-[600px] h-[600px] bg-neon-green/20 top-[-200px] left-[-100px] animate-float" />
      <div className="aurora w-[500px] h-[500px] bg-neon-blue/15 top-[20%] right-[-150px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="aurora w-[450px] h-[450px] bg-neon-purple/15 bottom-[-100px] left-[30%] animate-float" style={{ animationDelay: '4s' }} />

      <div className="relative z-10">
        <header className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-green via-neon-blue to-neon-purple flex items-center justify-center shadow-neon-green animate-pulse-slow">
                    <svg className="w-8 h-8 text-dark-950" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-neon-green to-neon-purple opacity-20 blur-lg -z-10" />
                </div>

                <div>
                  <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                    AI <span className="text-gradient-animated">Candidate</span> Ranking
                  </h1>
                  <p className="text-dark-400 text-sm mt-0.5 flex items-center gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-neon-green animate-pulse" />
                    Intelligent matching powered by semantic analysis
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="glass-dark rounded-xl px-4 py-2.5">
                  <p className="text-[10px] text-dark-500 uppercase tracking-wider mb-1">Backend Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`relative w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-neon-green' : 'bg-red-500'}`}>
                      {isConnected && <div className="absolute inset-0 rounded-full bg-neon-green animate-ping-slow" />}
                    </div>
                    <span className={`text-sm font-medium ${isConnected ? 'text-neon-green' : 'text-red-400'}`}>
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {error && (
            <div className="mb-6 glass-dark rounded-2xl p-4 border border-red-500/20 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-red-400">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm">{error}</span>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-dark-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <StatsCard
              title="Total Candidates"
              value={stats.total}
              subtitle="In database"
              accent="green"
              icon={
                <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <StatsCard
              title="Avg Experience"
              value={stats.avgExperience}
              decimals={1}
              suffix=" yrs"
              subtitle="Per candidate"
              accent="blue"
              icon={
                <svg className="w-6 h-6 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            <StatsCard
              title="Locations"
              value={stats.locations}
              subtitle="Cities covered"
              accent="purple"
              icon={
                <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <JobDescriptionForm onSubmit={handleMatch} isLoading={isLoadingMatch} />

              {matchResults.length > 0 && (
                <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
                  <h3 className="text-base font-display font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-green/20 to-emerald-500/10 flex items-center justify-center border border-neon-green/20">
                      <svg className="w-4 h-4 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    Match Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                      <span className="text-dark-400 text-sm">Candidates analyzed</span>
                      <span className="text-white font-display font-bold">{candidates.length}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                      <span className="text-dark-400 text-sm">Top matches found</span>
                      <span className="text-white font-display font-bold">{matchResults.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-dark-400 text-sm">Highest score</span>
                      <span className="text-neon-green font-display font-bold text-xl">
                        {matchResults[0]?.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              {matchResults.length > 0 && !isLoadingMatch && (
                <SearchBar onSearch={setSearchQuery} onFilterChange={setLocationFilter} />
              )}

              {isLoadingCandidates ? (
                <div className="text-center py-24">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 border-4 border-dark-800 border-t-neon-green rounded-full animate-spin" />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-neon-blue rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                    </div>
                  </div>
                  <p className="mt-6 text-dark-400 text-sm animate-pulse">Loading candidates...</p>
                </div>
              ) : isLoadingMatch ? (
                <div className="text-center py-24 glass-card rounded-2xl border border-white/5">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 border-4 border-dark-800 border-t-neon-purple rounded-full animate-spin" />
                    <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-neon-green rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-8 h-8 text-neon-purple animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">Analyzing Candidates</h3>
                  <p className="text-dark-400 max-w-md mx-auto text-sm">
                    Using AI semantic matching to find the best candidates for your job description...
                  </p>
                  <div className="mt-6 flex justify-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-neon-purple animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </div>
                </div>
              ) : matchResults.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                      Ranked Candidates
                      <span className="text-sm font-normal text-dark-500 bg-dark-800/60 px-3 py-1 rounded-lg border border-white/5">
                        {filteredCandidates.length} {filteredCandidates.length === 1 ? 'result' : 'results'}
                      </span>
                    </h2>
                  </div>
                  {filteredCandidates.length > 0 ? (
                    <div className="space-y-4">
                      {filteredCandidates.map((candidate, index) => (
                        <CandidateCard
                          key={index}
                          candidate={candidate}
                          rank={index + 1}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 glass-card rounded-2xl">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-dark-800/60 flex items-center justify-center border border-white/5">
                        <svg className="w-8 h-8 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-display font-bold text-white mb-2">No matching candidates</h3>
                      <p className="text-dark-400 text-sm">Try adjusting your search or filter criteria.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-24 glass-card rounded-2xl border border-white/5">
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-green to-neon-blue rounded-3xl rotate-12 opacity-20 blur-md animate-pulse-slow" />
                    <div className="relative w-full h-full bg-dark-900/80 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                      <svg className="w-14 h-14 text-neon-green animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">Ready to Find Matches</h3>
                  <p className="text-dark-400 max-w-md mx-auto text-sm">
                    Enter a job description to discover the best candidates using AI-powered semantic matching.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-dark-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                      AI Engine Ready
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="relative border-t border-white/5 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-dark-600 text-xs">
              <span className="font-display font-medium text-dark-500">AI Candidate Ranking System</span>
              <span className="hidden sm:inline text-dark-700">|</span>
              <span>Powered by FastAPI, Next.js & Sentence Transformers</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
