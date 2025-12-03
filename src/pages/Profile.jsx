import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams(); // clicked user's ID
  const userId = id || localStorage.getItem("userId"); // fallback to your profile

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/users");
        const usersArray = res.data[0]?.users;
        const foundUser = usersArray.find(u => String(u.id) === String(userId));

        setUser(foundUser || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);


  if (!userId) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>No user logged in</h2>;
  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</h2>;
  if (!user) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>User not found</h2>;

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
      <Sidebar />
      </Box>
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Profile Picture */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 2 }}>
          <img
            src={user.profile_picture_url}
            alt="profile"
            width={150}
            style={{ borderRadius: "50%" }}
          />
        </Box>

        {/* User Info */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">{user.full_name}</Typography>
          <Typography>@{user.username}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>ID: {user.id}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              localStorage.removeItem("userId");
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

