import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { isValidURL, isValidShortcode } from "../utils/validators";
import { logEvent } from "../utils/logger";
import { urlDB, saveToStorage } from "../data"; 

const generateShortcode = () =>
  Math.random().toString(36).substring(2, 7).toLowerCase();

export default function URLShortenerForm() {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [snack, setSnack] = useState({ open: false, message: "" });

  const handleAddInput = () => {
    if (urls.length < 5)
      setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleSubmit = () => {
    const results = [];

    for (const { longUrl, validity, shortcode } of urls) {
      if (!isValidURL(longUrl)) {
        setSnack({ open: true, message: "Invalid URL" });
        return;
      }

      if (shortcode && !isValidShortcode(shortcode)) {
        setSnack({ open: true, message: "Invalid shortcode format" });
        return;
      }

      let finalShort = shortcode || generateShortcode();
      while (urlDB.find((e) => e.shortcode === finalShort)) {
        finalShort = generateShortcode();
      }

      const validTime = parseInt(validity) || 30;
      const expiry = new Date(Date.now() + validTime * 60000).toISOString();

      const newEntry = {
        longUrl,
        shortcode: finalShort,
        expiry,
        created: new Date().toISOString(),
      };

      urlDB.push(newEntry);
      logEvent("SHORTEN", "New short URL created", newEntry);
      results.push(newEntry);
    }

    saveToStorage(); // ✅ persist all new data
    setSnack({ open: true, message: "URLs shortened!" });
    setUrls([{ longUrl: "", validity: "", shortcode: "" }]);
  };

  return (
    <>
      <Grid container spacing={2}>
        {urls.map((url, i) => (
          <Grid item xs={12} key={i}>
            <Card>
              <CardContent>
                <TextField
                  fullWidth
                  label="Original URL"
                  value={url.longUrl}
                  onChange={(e) => handleChange(i, "longUrl", e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Validity (min)"
                  value={url.validity}
                  onChange={(e) => handleChange(i, "validity", e.target.value)}
                  sx={{ mr: 2 }}
                />
                <TextField
                  label="Custom Shortcode"
                  value={url.shortcode}
                  onChange={(e) => handleChange(i, "shortcode", e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button onClick={handleAddInput} variant="outlined" sx={{ mr: 2 }}>
            Add URL
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Shorten
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {urlDB.map((item, idx) => (
          <Grid item xs={12} key={idx}>
            <Card>
              <CardContent>
                <Typography>Original: {item.longUrl}</Typography>
                <Typography>
                  Short URL:{" "}
                  <a href={`/${item.shortcode}`}>
                    http://localhost:3000/{item.shortcode}
                  </a>
                </Typography>
                <Typography>Expires at: {new Date(item.expiry).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        message={snack.message}
      />
    </>
  );
}
