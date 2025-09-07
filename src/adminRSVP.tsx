import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type RSVPRow = {
  id: string;
  name: string;
  contact: string;
  side: string;
  guests: number;
  code: string;
  valid_until: string | null;
  used: boolean;
};

export const AdminRSVP = () => {
  const [rsvps, setRsvps] = useState<RSVPRow[]>([]);

  useEffect(() => {
    const fetchRSVPs = async () => {
      const { data, error } = await supabase
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching RSVPs:", error);
      } else {
        setRsvps(data || []);
      }
    };
    fetchRSVPs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin RSVP List</h2>
      <table className="w-full border text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Guests</th>
            <th className="p-2">Side</th>
            <th className="p-2">Code</th>
            <th className="p-2">Valid</th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.guests}</td>
              <td className="p-2">{r.side}</td>
              <td className="p-2">{r.code}</td>
              <td className="p-2">{r.guests > 0 ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
