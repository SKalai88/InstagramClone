import { useState } from "react";
import { IconButton, Box } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";

export default function EmojiButton({ onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      {/* Emoji Button */}
      <IconButton onClick={() => setOpen(!open)}>
        <EmojiEmotionsIcon sx={{ color: open ? "gold" : "gray" }} />
      </IconButton>

      {/* Emoji Picker Popup */}
      {open && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 10,
            bottom: "50px",
            right: 0,
          }}
        >
          <EmojiPicker
            onEmojiClick={(emoji) => {
              if (onSelect) onSelect(emoji.emoji);
              setOpen(false);
            }}
          />
        </Box>
      )}
    </Box>
  );
}
