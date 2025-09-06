
// Instead of `import QRCode from "qrcode.react";`
import { motion } from "framer-motion"
import { GuestRegistration } from "./Guest"
import {
  CalendarDays,
  Clock,
  MapPin,
  Shirt,
  Gift,
  Phone,
  Link as LinkIcon,
  Copy,
  Share2,
  Users,
  Home,
} from "lucide-react"
import { useState, useMemo } from "react"

// -----------------------------
// Types
// -----------------------------
interface Couple {
  first: string
  second: string
  HashTag:string
}

interface RSVP {
    name: string
    contact: string
    side: "bride" | "groom"
  }

interface Event {
  title: string
  address: string
  mapsLink: string
  time: string
  EventCenter:string
}

interface Outfit {
  brideSide: string
  groomSide: string
}

interface Asoebi {
  group: string
  color: string
  clothImg: string
  orderLink: string
}

interface Gifts {
  note: string
  registryLink: string
  bank: {
    name: string
    accountName: string
    number: string
  }
}

interface WeddingData {
  couple: Couple
  dateISO: string
  ceremony: Event
  reception: Event
  dressCode: string
  outfits: Outfit
  asoebi: Asoebi[]
  rsvp: { link: string }
  rsvpList: RSVP[]
  gifts: Gifts
}

// -----------------------------
// Example Data
// -----------------------------
const example: WeddingData = {
  couple: { first: "Opeoluwa", second: "Adedamola" ,HashTag:"#OD2025",},
  dateISO: "2025-11-20T12:00:00+01:00",
  ceremony: {
    title: "Engagement Ceremony",
    address:
      "Abuleoko road off cele bus stop beside top crown Magboro Ogun State",
    mapsLink:
      "https://www.google.com/maps/place/TOP+Crown+Hotel+and+Suites/@6.7158551,3.3938726,17z/data=!3m1!4b1!4m9!3m8!1s0x103b95ab00036f61:0x6d99131459ae67bf!5m2!4m1!1i2!8m2!3d6.7158551!4d3.3964475!16s%2Fg%2F11s1pnz65_?hl=en&entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D",
    time: "10:00 AM",
    EventCenter: "Strong Tower",
  },
  reception: {
    title: "Reception",
    address:
      "Abuleoko road off cele bus stop beside top crown Magboro Ogun State",
    mapsLink: "https://www.google.com/maps/place/TOP+Crown+Hotel+and+Suites/@6.7158551,3.3938726,17z/data=!3m1!4b1!4m9!3m8!1s0x103b95ab00036f61:0x6d99131459ae67bf!5m2!4m1!1i2!8m2!3d6.7158551!4d3.3964475!16s%2Fg%2F11s1pnz65_?hl=en&entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D",
    time: "12:00 PM",
    EventCenter:"Strong Tower",
  },
  dressCode: "Dress to show your side with pride",
  outfits: {
    brideSide: "White & Burn orange",
    groomSide: "White & Gold",
  },
  asoebi: [
    {
      group: "Friends of the Bride",
      color: "bg-peach-100",
      clothImg: "",
      orderLink:
        "https://wa.me/2347057781992?text=I%20want%20to%20order%20Bride's%20Friends%20cloth",
    },
    {
      group: "Friends of the Groom",
      color: "bg-burnt-orange-100",
      clothImg: "",
      orderLink:
        "https://wa.me/2348165810242?text=I%20want%20to%20order%20Groom's%20Friends%20cloth",
    },
    {
      group: "Family of the Bride",
      color: "bg-burnt-orange-100",
      clothImg: "",
      orderLink:
        "https://wa.me/2348055109185?text=I%20want%20to%20order%20Bride's%20Family%20gele",
    },
  ],
  rsvpList: [
    { name: "Nafisat Lawal", contact: "07057781992", side: "bride", },
    { name: "Tolu Adefiranye",contact: "08165810242", side: "groom", },
    { name: "Kenneth Chukwu",contact: "08028455571", side: "groom", }
  ],
  rsvp: { link: "" },
  gifts: {
    note: "Your presence is the greatest gift. If you wish to honour us with a gift:",
    registryLink: "https://example.com/registry",
    bank: {
      name: "MoniePoint",
      accountName: "Adefiranye Damola",
      number: "8102819005",
    },
  },
}

// -----------------------------
// Utils
// -----------------------------
function formatLongDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// -----------------------------
// Component
// -----------------------------
export default function WeddingInvite() {
  const [data] = useState<WeddingData>(example)
  const longDate = useMemo(() => formatLongDate(data.dateISO), [data.dateISO])

  const pageUrl =
    typeof window !== "undefined" ? window.location.href : "https://invite.com"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      alert("Link copied!")
    } catch {
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
    } catch {
      /* user canceled */
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-peach-100 via-white to-olive-50 text-gray-800">
      {/* Hero */}
      <section className="text-center py-16 sm:py-24 bg-gradient-to-r from-olive-600 to-wine-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 tracking-widest text-sm uppercase">
            We joyfully invite you to the wedding of
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold">
            {data.couple.first} & {data.couple.second}
          </h1>
          <p className="mt-4 text-lg flex items-center justify-center gap-2">
            <CalendarDays className="w-5 h-5" /> {longDate}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-burnt-orange-600 hover:bg-burnt-orange-700"
            >
              <Share2 className="w-4 h-4" /> Share Invite
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-wine-700 hover:bg-gray-100"
            >
              <Copy className="w-4 h-4" /> Copy Link
            </button>
          </div>
        </motion.div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-5xl px-4 py-12 space-y-8">
        {/* Ceremony & Reception */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[data.ceremony, data.reception].map((event) => (
            <div
              key={event.title}
              className="rounded-xl border bg-white shadow-lg p-6 space-y-3"
            >
              <h2 className="flex items-center gap-2 text-wine-700 font-bold">
                <MapPin className="w-5 h-5" /> {event.title}
              </h2>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1 text-burnt-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-olive-600" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{event.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 mt-1 text-olive-600" />
                <div>
    <p className="text-sm text-gray-500">Event Center</p>
    <p className="font-medium">{event.EventCenter}</p>
  </div>
</div>

              <a
                href={event.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-olive-600 text-white hover:bg-olive-700"
              >
                <LinkIcon className="w-4 h-4" /> Google Maps
              </a>
            </div>
          ))}
        </div>

        {/* Dress Code & Outfits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border bg-white shadow p-6">
            <h2 className="flex items-center gap-2 font-bold text-burnt-orange-600">
              <Shirt className="w-5 h-5" /> Dress Code
            </h2>
            <p className="mt-2">{data.dressCode}</p>
          </div>

          <div className="rounded-xl border bg-white shadow p-6 lg:col-span-2">
            <h2 className="flex items-center gap-2 font-bold text-olive-700">
              <Users className="w-5 h-5" /> Expected Outfits
            </h2>
            <ul className="mt-2 space-y-2">
              <li>
                <span className="font-medium">Bride’s Side:</span>{" "}
                {data.outfits.brideSide}
              </li>
              <li>
                <span className="font-medium">Groom’s Side:</span>{" "}
                {data.outfits.groomSide}
              </li>
            </ul>
          </div>
        </div>

        {/* Aso Ebi / Cloth Orders */}
        <div className="rounded-xl border bg-white shadow p-6">
  <h2 className="flex items-center gap-2 font-bold text-wine-600">
    <Users className="w-5 h-5" /> Order Aso Ebi / Gele
  </h2>
  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    {data.asoebi.map((item) => (
      <div
        key={item.group}
        className={`${item.color} rounded-xl p-4 text-center shadow`}
      >
        <h3 className="font-bold text-olive-700">{item.group}</h3>

        {item.clothImg ? (
          <img
            src={item.clothImg}
            alt={item.group}
            className="rounded-lg my-2 mx-auto h-40 w-full object-cover"
          />
        ) : (
          <div className="rounded-lg my-2 mx-auto h-40 w-full flex items-center justify-center bg-gray-100 text-gray-500 italic">
            Coming Soon
          </div>
        )}

        {item.clothImg && item.orderLink ? (
          <a
            href={item.orderLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2 px-4 py-2 rounded-lg bg-wine-600 text-white hover:bg-wine-700 transition focus:outline-none focus:ring-0"
          >
            Order Now
          </a>
        ) : (
          <p className="mt-2 text-sm text-gray-500">Check back soon</p>
        )}
      </div>
    ))}
  </div>
</div>

        {/* RSVP */}
        <div className="rounded-xl border bg-white shadow p-6">
        <GuestRegistration />
        </div>

        {/* Gifts */}
        {/* Gifts */}
{/* Gifts & RSVP side by side */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Gifts */}
  <div className="rounded-xl border bg-white shadow p-6">
    <h2 className="flex items-center gap-2 font-bold text-olive-700">
      <Gift className="w-5 h-5" /> Gifts / Registry
    </h2>
    <p className="mt-2">{data.gifts.note}</p>
    <div className="mt-3 grid gap-3">
      <div className="rounded-lg border p-3">
        <p className="text-sm text-gray-500">Bank Transfer</p>
        <p className="font-medium">{data.gifts.bank.name}</p>
        <p className="text-sm">{data.gifts.bank.accountName}</p>

        <div className="flex items-center justify-between mt-1">
          <p className="text-lg tracking-widest">{data.gifts.bank.number}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(data.gifts.bank.number)
              alert("Account number copied!")
            }}
            className="ml-2 p-1 rounded hover:bg-gray-100"
          >
            <Copy className="w-5 h-5 text-olive-600" />
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* RSVP List */}
  <div className="rounded-xl border bg-white shadow p-6">
    <h2 className="flex items-center gap-2 font-bold text-wine-600">
      <Phone className="w-5 h-5" /> RSVP List
    </h2>
    <ul className="mt-2 space-y-1">
      {data.rsvpList.map((rsvp, idx) => (
        <li key={idx}>
          {rsvp.name} ({rsvp.side}) - {rsvp.contact}
        </li>
      ))}
    </ul>
  </div>
</div>

      </section>

      {/* Footer */}
      <footer className="mt-10 py-6 bg-wine-700 text-white text-center">
        With love, {data.couple.first} & {data.couple.second} {data.couple.HashTag}
      </footer>
    </div>
  )
}
