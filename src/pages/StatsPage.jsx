import React from "react";
import URLStats from "../components/URLStats";
import { Container, Typography } from "@mui/material";

export default function StatsPage() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Shortened URL Statistics
      </Typography>
      <URLStats />
    </Container>
  );
}
