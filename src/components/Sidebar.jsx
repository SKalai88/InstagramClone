import React, { useState } from "react";
import { Drawer, Box, useMediaQuery,ListItemButton,List,ListItem,ListItemIcon,ListItemText, Button, } from "@mui/material";
import {
  Home, Search, Explore, Movie, Message,
  Notifications, AddBox, AccountCircle,Widgets,
  Send,Menu
} from "@mui/icons-material";
import Profile from "../pages/Profile";
import { data, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


export default function Sidebar() {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isTablet = useMediaQuery("(max-width:1023px)");

  const userId = localStorage.getItem("userId");
   const [user, setUser] = useState(null);

  
  const drawerWidth = isMobile ? "100%" : isTablet ? 70 : 250;
  const drawerHeight = isMobile ? 60 : "100vh";

  const logoSrc = isTablet
    ? "data:image/webp;base64,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"
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png";

    const navigate = useNavigate();


    useEffect(() => {
    if (!userId) return;

    const loadUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        const usersArray = res.data[0]?.users;
        if (!usersArray) return;

        const foundUser = usersArray.find(u => String(u.id) === userId);
        setUser(foundUser || null);
      } catch (err) {
        console.error("Error fetching user in sidebar:", err);
      }
    };

    loadUser();
  }, [userId]);

  return (
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
          <Button onClick={()=>navigate("/Home")}>
          <img
            src={logoSrc}
            alt="logo"
            style={{
              width: isTablet ? 40 : 120,
              transition: "0.3s",
            }}
          />
          </Button>
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
                <ListItemButton onClick={()=>navigate("/Home")}>
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
                <ListItemButton onClick={()=>navigate(`/profile/${user?.id}`)}>
                  <ListItemIcon>
                    <img
        src={user?.profile_picture_url}
        alt="profile"
        width={150}
        style={{ borderRadius: "50%",width:"30px"}}
      />
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
                <ListItemButton onClick={()=>navigate("/Home")}>
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
                <ListItemButton onClick={()=>navigate("/profile")}>
                  <ListItemIcon>
                    <img
        src={user?.profile_picture_url}
        alt="profile"
        width={150}
        style={{ borderRadius: "50%",width:"30px",marginLeft:"20px"}}
      />
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
            <ListItemButton onClick={()=>navigate("/Home")}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <Search/>
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <Movie />
              </ListItemIcon>
            </ListItemButton>
            
            <ListItemButton>
              <ListItemIcon>
                <Send/>
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton onClick={()=>navigate("/profile")}>
              <ListItemIcon>
                <img
        src={user?.profile_picture_url}
        alt="profile"
        width={150}
        style={{ borderRadius: "50%",width:"30px"}}
      />
              </ListItemIcon>
            </ListItemButton>
          </Box>
        )}
      </Drawer>

  );
}
