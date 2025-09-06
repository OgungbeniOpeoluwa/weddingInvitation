import React, { useState, useRef } from "react";
import { Send, Download, Users } from "lucide-react";

type RSVP = {
  name: string;
  contact: string;
  side: "bride" | "groom";
  guests: number;
};

export const GuestRegistration: React.FC = () => {
  const [submittedRSVP, setSubmittedRSVP] = useState<RSVP | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    side: "" as "bride" | "groom" | "",
    guests: 1,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.contact || !formData.side) {
      alert("Please fill in all fields");
      return;
    }

    const rsvp: RSVP = {
      name: formData.name,
      contact: formData.contact,
      side: formData.side as "bride" | "groom",
      guests: formData.guests,
    };

    setSubmittedRSVP(rsvp);
    alert("Thank you for registering!");

    // Reset form
    setFormData({
      name: "",
      contact: "",
      side: "",
      guests: 1,
    });
  };

  const handleDownload = async () => {
    if (!submittedRSVP) return;
  
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      canvas.width = 800;
      canvas.height = 600;
  
      // Olive + Emerald green gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#556B2F");
      gradient.addColorStop(0.5, "#228B22");
      gradient.addColorStop(1, "#2E8B57");
  
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Decorative circles (background glow)
      ctx.fillStyle = "rgba(34,139,34,0.4)";
      ctx.beginPath();
      ctx.arc(100, 100, 60, 0, Math.PI * 2);
      ctx.fill();
  
      ctx.fillStyle = "rgba(0,100,0,0.3)";
      ctx.beginPath();
      ctx.arc(canvas.width - 120, canvas.height - 120, 80, 0, Math.PI * 2);
      ctx.fill();
  
      // Title
      ctx.fillStyle = "#f0fdf4";
      ctx.font = "bold 40px cursive";
      ctx.textAlign = "center";
      ctx.fillText("✨ Wedding Access Card ✨", canvas.width / 2, 100);
  
      // --- RSVP Name only ---
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 36px cursive"; // stylish cursive for name
      ctx.textAlign = "center";
      ctx.fillText(submittedRSVP.name, canvas.width / 2, 220);
  
      // Side info (Bride/Groom)
      ctx.font = "24px italic serif";
      ctx.fillStyle = "#e6ffe6";
      ctx.fillText(
        submittedRSVP.side === "bride" ? "Bride's Side" : "Groom's Side",
        canvas.width / 2,
        270
      );
  
      // Thank you message
      ctx.font = "italic 22px serif";
      ctx.fillStyle = "#bbf7d0";
      ctx.fillText(
        "Thank you for blessing us with your presence 💚",
        canvas.width / 2,
        340
      );
  
      // Footer (guests + hashtag)
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "left";
      ctx.fillStyle = "#e0f2e9";
      ctx.fillText(
        `Valid for ${submittedRSVP.guests} guest(s)`,
        100,
        500
      );
  
      ctx.textAlign = "right";
      ctx.fillText("#BD2025 🎉", canvas.width - 60, 500);
  
      // Rounded Border
      function drawRoundedRect(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number
      ) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.stroke();
      }
  
      const borderMargin = 40;
      const borderRadius = 30;
  
      ctx.strokeStyle = "#FFD700"; // gold border
      ctx.lineWidth = 5;
      drawRoundedRect(
        ctx,
        borderMargin,
        borderMargin,
        canvas.width - 2 * borderMargin,
        canvas.height - 2 * borderMargin,
        borderRadius
      );
  
      // --- Download ---
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `RSVP_Card_${submittedRSVP.name.replace(/\s+/g, "_")}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error("Error generating card:", error);
    }
  };
  
  

  return (
    <div className="p-6 rounded-xl border bg-white shadow space-y-4 max-w-2xl mx-auto">
      {/* Section Header */}
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Users className="w-5 h-5" /> Guest Registration
      </h2>

      {/* Form */}
      <div className="mt-4 grid gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none text-black"
        />
        <input
          type="text"
          placeholder="Email or Phone"
          value={formData.contact}
          onChange={(e) => handleInputChange("contact", e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none text-black"
        />
        <select
          value={formData.side}
          onChange={(e) => handleInputChange("side", e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none text-black"
        >
          <option value="" disabled>
            Select Side
          </option>
          <option value="Bride">Bride's</option>
          <option value="Groom">Groom's</option>
        </select>
        <input
          type="number"
          min={1}
          max={5}
          value={formData.guests}
          onChange={(e) =>
            handleInputChange("guests", parseInt(e.target.value) || 1)
          }
          className="border border-gray-300 rounded-lg p-2 focus:outline-none text-black"
          placeholder="Number of Guests"
        />
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors"
        >
          <Send className="w-4 h-4" /> Get Access Card
        </button>
      </div>

      {/* Access Card Preview */}
      {submittedRSVP && (
        <div className="mt-6 text-center">
          <div
            ref={cardRef}
            className="relative inline-block w-96 rounded-2xl shadow-2xl overflow-hidden text-white mx-auto p-8"
            style={{
              background: "linear-gradient(135deg, #556B2F, #228B22, #2E8B57)",
              fontFamily: "'cursive', serif",
            }}
          >
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-green-800 rounded-full opacity-30 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-600 rounded-full opacity-40 -z-10"></div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold text-center mb-6 text-green-100">
              ✨ Wedding Access Card ✨
            </h1>

            {/* RSVP Details */}
            <div className="space-y-3 text-left text-lg">
              <p>
                <span className="font-semibold">Name:</span> {submittedRSVP.name}
              </p>
              <p>
                <span className="font-semibold">Contact:</span>{" "}
                {submittedRSVP.contact}
              </p>
              <p>
                <span className="font-semibold">Side:</span>{" "}
                {submittedRSVP.side === "bride"
                  ? "Bride's Side"
                  : "Groom's Side"}
              </p>
              <p>
                <span className="font-semibold">Guests:</span>{" "}
                {submittedRSVP.guests}
              </p>
            </div>

            {/* Thank you message */}
            <p className="mt-6 text-center italic text-lime-200 text-xl">
              Thank you for blessing us with your presence 💚
            </p>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center text-sm">
              <span className="text-green-100">This access card is valid for submittedRSVP.guests guest(s)</span>
              <span className="font-bold text-green-100">#OD2025 🎉</span>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 mx-auto transition-colors"
          >
            <Download className="w-4 h-4" /> Save this card for entry
          </button>
        </div>
      )}
    </div>
  );
  
};
