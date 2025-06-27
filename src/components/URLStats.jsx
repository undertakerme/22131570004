import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { urlDB, clickLogs } from "../data";

export default function URLStats() {
  return (
    <Grid container spacing={2}>
      {urlDB.map((entry, i) => {
        const clicks = clickLogs.filter((c) => c.shortcode === entry.shortcode);
        return (
          <Grid item xs={12} key={i}>
            <Card>
              <CardContent>
                <Typography>Short URL: http://localhost:3000/{entry.shortcode}</Typography>
                <Typography>Created: {new Date(entry.created).toLocaleString()}</Typography>
                <Typography>Expires: {new Date(entry.expiry).toLocaleString()}</Typography>
                <Typography>Total Clicks: {clicks.length}</Typography>
                {clicks.map((click, j) => (
                  <Typography key={j} variant="body2">
                    - {click.timestamp} | {click.referrer} | {click.location}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
