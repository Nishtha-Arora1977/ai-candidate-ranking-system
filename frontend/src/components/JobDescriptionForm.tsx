'use client'

import { useState } from 'react'

interface JobDescriptionFormProps {
  onSubmit: (jobDescription: string) => void
  isLoading: boolean
}

const sampleDescriptions = [
  { text: 'Looking for Python FastAPI AI engineer with LangChain experience', label: 'AI Engineer', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { text: 'Senior React developer with TypeScript and Node.js experience', label: 'Frontend Dev', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { text: 'Data scientist with machine learning and NLP expertise', label: 'Data Scientist', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { text: 'Full stack developer with AWS and Docker experience', label: 'Full Stack', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
]

export default function JobDescriptionForm({ onSubmit, isLoading }: JobDescriptionFormProps) {
  const [jobDescription, setJobDescription] = useState('')
  const maxChars = 500

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (jobDescription.trim()) {
      onSubmit(jobDescription)
    }
  }

  const handleClear = () => {
    setJobDescription('')
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 bg-gradient-to-br from-neon-green to-emerald-500 rounded-xl flex items-center justify-center shadow-neon-green">
          <svg className="w-6 h-6 text-dark-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-white">Job Description</h2>
          <p className="text-dark-400 text-xs">Enter requirements to find matching candidates</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value.slice(0, maxChars))}
            placeholder="e.g. Looking for a Python FastAPI AI engineer with LangChain experience and 5+ years in production systems..."
            className="w-full h-36 p-4 bg-dark-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green/30 resize-none text-white placeholder-dark-500 text-sm transition-all duration-200"
            disabled={isLoading}
          />
          {jobDescription && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-md bg-dark-800/80 text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-dark-500 uppercase tracking-wider">Quick fill examples</span>
          <span className={`text-[10px] font-mono transition-colors ${jobDescription.length > maxChars * 0.8 ? 'text-neon-orange' : 'text-dark-500'}`}>
            {jobDescription.length}/{maxChars}
          </span>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          {sampleDescriptions.map((desc, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setJobDescription(desc.text)}
              className="flex items-center gap-2 text-xs text-dark-300 hover:text-white bg-dark-950/40 hover:bg-dark-800/60 border border-white/5 hover:border-neon-green/30 px-3 py-2.5 rounded-lg transition-all duration-200 group/chip"
              disabled={isLoading}
            >
              <svg className="w-4 h-4 text-dark-500 group-hover/chip:text-neon-green transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={desc.icon} />
              </svg>
              <span className="truncate font-medium">{desc.label}</span>
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || !jobDescription.trim()}
          className="mt-5 w-full relative overflow-hidden rounded-xl font-semibold py-3.5 px-6 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:cursor-not-allowed group"
        >
          <span className={`absolute inset-0 ${isLoading || !jobDescription.trim() ? 'bg-dark-800' : 'bg-gradient-to-r from-neon-green via-emerald-500 to-neon-green bg-[length:200%_auto] group-hover:bg-[position:right_center]'}`} />
          <span className={`relative flex items-center justify-center gap-2 ${isLoading || !jobDescription.trim() ? 'text-dark-500' : 'text-dark-950'}`}>
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing candidates...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Find Matching Candidates
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  )
}
