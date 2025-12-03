import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Typography, Box, IconButton, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StoryCard({ handleOpenStory, sx = {} }) {
  const [users, setUsers] = useState([]);
  const scrollRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:767px)");
  const isTablet = useMediaQuery("(max-width:1023px)");

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        const data = res.data;

        const rootKey = Object.keys(data)[0];
        const root = data[rootKey];

        const user = root.users;

        let shuffled = [...user];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        const finalUsers = shuffled.slice(0, 25).map((u) => ({
          ...u,
          previewImage: u.posts?.[0]?.image_url,
          fullStoryImage: u.posts?.[0]?.image_url,
        }));

        setUsers(finalUsers);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  // FIXED: return statement added
  const getRandomPostImage = (posts) => {
    if (!posts || posts.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex]?.image_url;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box component="main" sx={{ width: "100%", ...sx }}>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Left Arrow */}
          {/* <IconButton
            onClick={() => scroll("left")}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <ArrowBackIos />
          </IconButton> */}

          {/* Stories */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              // p: 1,
              flex: 1,
              minWidth: 0,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {users.map((user) => {
              const storyImage = getRandomPostImage(user.posts);

              return (
                <Box
                  key={user.id}
                  sx={{ cursor: "pointer", textAlign: "center" }}
                  onClick={() => {
  localStorage.setItem("storyUsers", JSON.stringify(users));   // all story users
  localStorage.setItem("storyIndex", users.indexOf(user));       // which one clicked
  navigate("/story");
}}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      border: 3,
                      borderColor: "#ff0066",
                      width: { xs: 60, sm: 70, md: 80 },
                      height: { xs: 60, sm: 70, md: 80 },
                      overflow: "hidden",
                      mx: "auto",
                    }}
                  >
                    <img
                      src={storyImage}
                      alt={user.username}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: { xs: 10, sm: 12 },
                      mt: 1,
                      maxWidth: 70,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.username}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Right Arrow */}
          {/* <IconButton
            onClick={() => scroll("right")}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <ArrowForwardIos />
          </IconButton> */}
        </Box>
      </Box>
    </Box>
  );
}
