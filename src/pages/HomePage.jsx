import React from "react";
import URLShortenerForm from "../components/URLShortenerForm";
import { Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        URL Shortener
      </Typography>
      <URLShortenerForm />
    </Container>
  );
}
