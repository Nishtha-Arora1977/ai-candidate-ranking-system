'use client'

import { useState } from 'react'
import { MatchResult } from '@/lib/api'
import ScoreRing from './ScoreRing'

interface CandidateCardProps {
  candidate: MatchResult
  rank: number
}

const skillColors: Record<string, string> = {
  'Python': 'from-neon-green/20 to-emerald-500/10 text-neon-green border-neon-green/30',
  'FastAPI': 'from-neon-green/20 to-emerald-500/10 text-neon-green border-neon-green/30',
  'AI': 'from-neon-purple/20 to-purple-500/10 text-neon-purple border-neon-purple/30',
  'LangChain': 'from-neon-purple/20 to-purple-500/10 text-neon-purple border-neon-purple/30',
  'Machine Learning': 'from-neon-purple/20 to-purple-500/10 text-neon-purple border-neon-purple/30',
  'NLP': 'from-neon-purple/20 to-purple-500/10 text-neon-purple border-neon-purple/30',
  'TensorFlow': 'from-neon-purple/20 to-purple-500/10 text-neon-purple border-neon-purple/30',
  'PyTorch': 'from-neon-purple/20 to-purple-500/10 text-neon-purple border-neon-purple/30',
  'Data Science': 'from-neon-purple/20 to-purple-500/10 text-neon-purple border-neon-purple/30',
  'React': 'from-neon-blue/20 to-cyan-500/10 text-neon-blue border-neon-blue/30',
  'Node.js': 'from-neon-blue/20 to-cyan-500/10 text-neon-blue border-neon-blue/30',
  'JavaScript': 'from-neon-yellow/20 to-amber-500/10 text-neon-yellow border-neon-yellow/30',
  'TypeScript': 'from-neon-blue/20 to-cyan-500/10 text-neon-blue border-neon-blue/30',
  'Docker': 'from-neon-blue/20 to-cyan-500/10 text-neon-blue border-neon-blue/30',
  'AWS': 'from-neon-orange/20 to-orange-500/10 text-neon-orange border-neon-orange/30',
  'SQL': 'from-neon-pink/20 to-pink-500/10 text-neon-pink border-neon-pink/30',
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  const isTopMatch = rank <= 3
  const [expanded, setExpanded] = useState(false)
  const scorePercentage = Math.min(candidate.score, 100)

  const initials = candidate.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const avatarGradients = [
    'from-neon-green to-emerald-500',
    'from-neon-blue to-cyan-500',
    'from-neon-purple to-purple-500',
    'from-neon-pink to-pink-500',
    'from-neon-orange to-orange-500',
  ]
  const avatarGradient = avatarGradients[rank % avatarGradients.length]

  const getSkillColor = (skill: string) => {
    const trimmed = skill.trim()
    return skillColors[trimmed] || 'from-dark-700/50 to-dark-800/50 text-dark-300 border-dark-600'
  }

  return (
    <div
      className={`group relative glass-card rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01] animate-fade-in-up ${
        isTopMatch
          ? 'border-neon-green/30 hover:shadow-neon-green'
          : 'hover:border-white/20 hover:shadow-glass'
      }`}
      style={{ animationDelay: `${rank * 60}ms` }}
    >
      {isTopMatch && (
        <div className="absolute -top-2 -right-2 px-2.5 py-1 bg-gradient-to-r from-neon-green to-emerald-500 text-dark-950 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-neon-green z-10">
          Top {rank}
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center font-display font-bold text-dark-950 text-sm shadow-lg`}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
              isTopMatch
                ? 'bg-gradient-to-br from-neon-green/20 to-emerald-500/10 text-neon-green border border-neon-green/30'
                : 'bg-dark-800 text-dark-400 border border-dark-700'
            }`}>
              {rank}
            </span>
            <h3 className="text-lg font-display font-bold text-white truncate">{candidate.name}</h3>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-dark-400">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {candidate.location}
            </span>
            <span className="text-dark-600">|</span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {candidate.experience} yrs exp
            </span>
          </div>
        </div>

        <ScoreRing score={scorePercentage} size={68} strokeWidth={5} label="Match" />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-dark-400">Match Strength</span>
          <span className="text-white font-semibold">{scorePercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-dark-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple transition-all duration-1000 ease-out"
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {candidate.skills.split(',').map((skill, index) => (
          <span
            key={index}
            className={`inline-flex items-center bg-gradient-to-br border px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${getSkillColor(skill)}`}
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-dark-950/40 rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-1.5 mb-1">
            <svg className="w-3.5 h-3.5 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-dark-400 text-[10px] uppercase tracking-wider">Experience</span>
          </div>
          <span className="text-white font-display font-bold text-lg">{candidate.experience}<span className="text-dark-500 text-sm font-normal ml-1">years</span></span>
        </div>
        <div className="bg-dark-950/40 rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-1.5 mb-1">
            <svg className="w-3.5 h-3.5 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-dark-400 text-[10px] uppercase tracking-wider">Semantic</span>
          </div>
          <span className="text-neon-green font-display font-bold text-lg">{candidate.semantic_similarity.toFixed(1)}<span className="text-dark-500 text-sm font-normal ml-1">/100</span></span>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 w-full flex items-center justify-between bg-dark-950/40 rounded-xl p-3.5 border border-white/5 hover:border-neon-purple/30 transition-all duration-200 group/analysis"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-purple/20 to-purple-500/10 flex items-center justify-center border border-neon-purple/20">
            <svg className="w-4 h-4 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-dark-300 uppercase tracking-wider">AI Analysis</span>
        </div>
        <svg className={`w-4 h-4 text-dark-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''} group-hover/analysis:text-neon-purple`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-dark-300 leading-relaxed bg-dark-950/40 rounded-xl p-3.5 border border-white/5">
          {candidate.reason}
        </p>
      </div>
    </div>
  )
}
