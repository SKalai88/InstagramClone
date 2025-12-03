import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import StoryCard from "../components/StoryCard";
import Suggestions from "../components/Suggestions";
import axios from "axios";
import Feeds from "../components/Feeds";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

//  useEffect(() => {
//   const load = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/users");
//       const data = res.data;  // axios gives the JSON directly
//         console.log("Full response:", data);
//     console.log("Keys:", Object.keys(data));
//     // Extract the root key ("0")
//     const rootKey = Object.keys(data)[0];
//     const root = data[rootKey];

//     // Get the users array
//     const user = root.users;  
//       let shuffled = [...data];
//       for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//       }

//       const finalUsers = shuffled.slice(0, 25).map((u) => ({
//         ...u,
//         previewImage: u.posts?.[0]?.image_url,
//         fullStoryImage: u.posts?.[0]?.image_url,
//       }));

//       setUsers(finalUsers);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   load();
// }, []);


  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      {/* FIXED SIDEBAR */}
      <Box  >
        <Sidebar  />
      </Box>
      

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: 0 }, // shift because of sidebar width
          maxWidth: "100vw",
          overflowX: "hidden",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            minWidth:0,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ flexGrow: 1, minWidth: 0, width: { xs: "100%", md: "auto" } }}>
  <StoryCard />
  <Feeds/>
</Box>

          {/* RIGHT SIDE (DESKTOP ONLY) */}
          <Box
            sx={{
              width: { xs: "0%", md: "35%" },
              display: { xs: "none", md: "block" },
              flexShrink: 0,
            }}
          >
            <Suggestions />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
