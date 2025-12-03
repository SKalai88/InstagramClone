import { Box, Typography,Link } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Suggestions() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId"); // get stored userId

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return;

      try {
        const res = await axios.get("http://localhost:5000/users");
        const usersArray = res.data[0]?.users;
        if (!usersArray) return;

        const foundUser = usersArray.find(u => String(u.id) === userId); // match id
        setUser(foundUser || null);
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    loadUser();
  }, [userId]);

  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 2,
        // borderRadius: 2,
        // boxShadow: 1,
        // textAlign: "center",
      }}
    >
      {user && (
        <Box>
        <Box sx={{
          display:"flex",
          alignItems:"center",
        }}>
          <img
            src={user.profile_picture_url}
            alt="profile"
            style={{ borderRadius: "50%", width: "50px", marginBottom: 8 }}
          />
          <Typography sx={{ fontSize: 14 ,ml:2}}>{user.full_name}</Typography>
          <Link href="https://mui.com/" underline="hover" sx={{ color: "blue",ml:10 }}>
          Switch
        </Link>
        </Box>
        <Box>
          <Typography>Suggesed for You</Typography>
          </Box>
          </Box>
      )}

      {!user && (
        <Box sx={{ mt: 2, opacity: 0.6 }}>
          <Typography sx={{ fontSize: 14 }}>No suggestions available</Typography>
        </Box>
      )}
    </Box>
  );
}
