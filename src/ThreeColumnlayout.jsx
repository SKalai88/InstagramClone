import React from "react";
import { Drawer, Box, useMediaQuery } from "@mui/material";
import {
  AccountCircle,
  AddBox,
  Explore,
  Home,
  Menu,
  Message,
  Movie,
  Notifications,
  Search,
  Widgets,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";


export default function Layout() {
  const [openStory, setOpenStory] = useState(false);
const [currentStory, setCurrentStory] = useState(null);

const handleOpenStory = (story) => {
  setCurrentStory(story);
  setOpenStory(true);
};

const handleCloseStory = () => {
  setOpenStory(false);
  setCurrentStory(null);
};

  const isMobile = useMediaQuery("(max-width:767px)");
  const isTablet = useMediaQuery("(max-width:1023px)");

  const drawerWidth = isMobile ? "100%" : isTablet ? 70 : 250;
  const drawerHeight = isMobile ? 60 : "100vh";

  const logoSrc = isTablet
    ? "data:image/png;base64,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"
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png";

  const [users, setUsers] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();

        // Shuffle users and pick 25
        const shuffledUsers = [...data.users];
        for (let i = shuffledUsers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
        }
        setUsers(shuffledUsers.slice(0, 25));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const getRandomPostImage = (posts) => {
    if (!posts || posts.length === 0) return "https://via.placeholder.com/100";
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex].image_url;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Drawer code unchanged */}
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height: drawerHeight,
            overflow: "hidden",
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            justifyContent: isMobile ? "space-around" : "flex-start",
            alignItems: "center",
            position: "fixed",
            bottom: isMobile ? 0 : "auto",
            top: isMobile ? "auto" : 0,
          },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            p: 3,
            pl: isTablet ? 3 : 0,
            pb: 0,
            display: isMobile ? "none" : "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={logoSrc}
            alt="logo"
            style={{
              width: isTablet ? 40 : 120,
              transition: "0.3s",
            }}
          />
        </Box>

        {/* Menu (hidden in tablet mode) */}
        {!isTablet && !isMobile && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              py: 2,
              pt: 0,
            }}
          >
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Search />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Explore />
                  </ListItemIcon>
                  <ListItemText primary="Explore" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Movie />
                  </ListItemIcon>
                  <ListItemText primary="Reels" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Message />
                  </ListItemIcon>
                  <ListItemText primary="Messages" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AddBox />
                  </ListItemIcon>
                  <ListItemText primary="Create" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
            </List>
            <Box sx={{ display: "flex", bottom: 0 }}>
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <Menu />
                    </ListItemIcon>
                    <ListItemText primary="More" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <Widgets />
                    </ListItemIcon>
                    <ListItemText primary="Also from Meta" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        )}
        {isTablet && !isMobile && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              pt: 0,
            }}
          >
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Home sx={{ width: 70 }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Search sx={{ width: 70 }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Explore sx={{ width: 70 }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Movie sx={{ width: 70 }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Message sx={{ width: 70 }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Notifications sx={{ width: 70 }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AddBox sx={{ width: 70 }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircle sx={{ width: 70 }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
            <Box sx={{ display: "flex", bottom: 0 }}>
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <Menu sx={{ width: 70 }} />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <Widgets sx={{ width: 70 }} />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        )}
        {isMobile && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              height: "100%",
              borderTop: 1,
              borderColor: "grey.500",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Explore />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Movie />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <AddBox />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Message />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
            </ListItemButton>
          </Box>
        )}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          ml: isMobile ? 0 : isTablet ? "65px" : "240px",
          p: 2,
          bgcolor: "#f8f8f8",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "65%" },
            p: 2,
            bgcolor: "white",
          }}
        >
          {/* STORIES CAROUSEL */}
          <Box sx={{ display: "flex", alignItems: "center",}}>
            <IconButton onClick={() => scroll("left")}>
              <ArrowBackIos />
            </IconButton>

            <Box
              ref={scrollRef}
              sx={{
                display: "flex",
                overflowX: "auto",
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": { display: "none" },
                gap: 2,
                p: 1,
                flex: 1,
              }}
            >
              {users.map((user) => (
                <Box sx={{cursor:"pointer"}}onClick={() => handleOpenStory(user)}>
                  <Box
                  key={user.id}
                    sx={{
                      borderRadius: "50%",
                      border: 1,
                      width: 80,
                      height: 80,
                      overflow: "hidden",
                      mb: 1,
                      
                    }}
                  >
                    <img
                      src={getRandomPostImage(user.posts)}
                      alt={user.username}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: 12 }}>{user.username}</Typography>
                </Box>
              ))}
            </Box>

            <IconButton onClick={() => scroll("right")}>
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
        

        {/* RIGHT SIDE (unchanged) */}
        <Box
          sx={{
            width: { xs: 0, sm: 0, md: "35%" },
            display: { xs: "none", sm: "none", md: "block" },
            p: 2,
            bgcolor: "#b95b5bff",
            borderLeft: "1px solid #ddd",
          }}
        ></Box>
      </Box>
      
    </>
  );
}
