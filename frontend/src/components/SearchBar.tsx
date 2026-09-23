'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilterChange: (filter: string) => void
}

export default function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }

  const handleClear = () => {
    setSearchValue('')
    onSearch('')
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value)
  }

  return (
    <div className="glass-card rounded-2xl p-4 mb-6 animate-slide-in-right">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative group">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-500 group-focus-within:text-neon-green transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search by name, skills, or location..."
            className="w-full pl-11 pr-10 py-3 bg-dark-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green/30 text-white placeholder-dark-500 text-sm transition-all duration-200"
          />
          {searchValue && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-md text-dark-500 hover:text-white hover:bg-dark-800 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        <div className="md:w-52 relative group">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-500 group-focus-within:text-neon-blue transition-colors duration-200 pointer-events-none z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <select
            defaultValue="all"
            onChange={handleFilterChange}
            className="w-full pl-11 pr-9 py-3 bg-dark-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue/30 text-white text-sm transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="all">All Locations</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
