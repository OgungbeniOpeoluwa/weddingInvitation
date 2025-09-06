import React, { useState } from "react"
import { Share2, Copy } from "lucide-react"

const WeddingInvite: React.FC = () => {
  const pageUrl = window.location.href
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      alert("Link copied!")
    } catch (err) {
      console.error("Copy failed:", err)
      alert("Couldn't copy. Please copy manually.")
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Wedding Invite", url: pageUrl })
      } else {
        await handleCopy()
      }
    } catch (err) {
      console.error("Share failed:", err)
      await handleCopy()
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-peach-100 via-white to-olive-50 flex flex-col items-center justify-center p-4 text-gray-800">
      
      {/* Background flowers */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Top-left flower */}
        <svg className="absolute top-0 left-0 w-40 h-40 opacity-30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" fill="#ffe5d9" />
          <circle cx="50" cy="50" r="30" fill="#ffbfa3" />
        </svg>
        {/* Bottom-right flower */}
        <svg className="absolute bottom-0 right-0 w-56 h-56 opacity-25" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" fill="#ffd6b3" />
          <circle cx="50" cy="50" r="25" fill="#ff9470" />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-cursive text-peach-500 drop-shadow-lg mb-8">
        You're Invited!
      </h1>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 transition transform hover:scale-105 text-white font-semibold"
        >
          <Share2 className="w-5 h-5" /> Share Invite
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 transition transform hover:scale-105 text-white font-semibold"
        >
          <Copy className="w-5 h-5" /> {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  )
}

export default WeddingInvite
