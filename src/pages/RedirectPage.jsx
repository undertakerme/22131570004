import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { urlDB, clickLogs, saveToStorage } from "../data";
import { logEvent } from "../utils/logger";

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const entry = urlDB.find((e) => e.shortcode === shortcode);

    if (!entry) {
      alert("Shortcode not found!");
      navigate("/");
      return;
    }

    const now = new Date();
    if (now > new Date(entry.expiry)) {
      alert("Link expired!");
      navigate("/");
      return;
    }

    const clickData = {
      shortcode,
      timestamp: now.toISOString(),
      referrer: document.referrer || "unknown",
      location: "simulated-geo",
    };

    logEvent("CLICK", "URL accessed", clickData);
    clickLogs.push(clickData);
    saveToStorage(); // Save updates to localStorage

    window.location.href = entry.longUrl;
  }, [shortcode, navigate]);

  return null;
}
