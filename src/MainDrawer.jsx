import React from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function MiniDrawer() {
  const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);
  const scrollRef = React.useRef(null);

  // Scroll handler
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200; // pixels per click
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" ,border:1}}>
      {/* Left Scroll Button */}
      <IconButton onClick={() => scroll("left")}>
        <ArrowBackIosIcon />
      </IconButton>

      {/* Scrollable Container */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
          gap: 2,
          p: 1,
          flex: 1,
        }}
      >
        {items.map((item, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 150,
              flexShrink: 0,
              backgroundColor: "#f5f5f5",
            }}
          >
            <CardContent>
              <Typography variant="h6">{item}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Right Scroll Button */}
      <IconButton onClick={() => scroll("right")}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
