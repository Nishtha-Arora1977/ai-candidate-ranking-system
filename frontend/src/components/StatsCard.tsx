'use client'

import AnimatedCounter from './AnimatedCounter'

interface StatsCardProps {
  title: string
  value: number
  suffix?: string
  decimals?: number
  subtitle?: string
  icon?: React.ReactNode
  accent?: 'green' | 'blue' | 'purple'
}

export default function StatsCard({
  title,
  value,
  suffix = '',
  decimals = 0,
  subtitle,
  icon,
  accent = 'green',
}: StatsCardProps) {
  const accentMap = {
    green: {
      glow: 'hover:shadow-neon-green',
      text: 'text-neon-green',
      bg: 'from-neon-green/20 to-emerald-500/5',
      ring: 'group-hover:ring-neon-green/20',
      border: 'hover:border-neon-green/40',
    },
    blue: {
      glow: 'hover:shadow-neon-blue',
      text: 'text-neon-blue',
      bg: 'from-neon-blue/20 to-cyan-500/5',
      ring: 'group-hover:ring-neon-blue/20',
      border: 'hover:border-neon-blue/40',
    },
    purple: {
      glow: 'hover:shadow-neon-purple',
      text: 'text-neon-purple',
      bg: 'from-neon-purple/20 to-purple-500/5',
      ring: 'group-hover:ring-neon-purple/20',
      border: 'hover:border-neon-purple/40',
    },
  }

  const colors = accentMap[accent]

  return (
    <div className={`group relative glass-card rounded-2xl p-6 ${colors.border} transition-all duration-300 ${colors.glow}`}>
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-dark-400 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-display font-bold text-white mt-2">
            <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />
          </p>
          {subtitle && (
            <p className="text-xs text-dark-500 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={`p-3.5 bg-gradient-to-br ${colors.bg} rounded-2xl ring-1 ring-white/5 ${colors.ring} transition-all duration-300`}>
            {icon}
          </div>
        )}
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${accent === 'green' ? 'via-neon-green/40' : accent === 'blue' ? 'via-neon-blue/40' : 'via-neon-purple/40'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </div>
  )
}
