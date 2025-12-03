import { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CenterPanePage() {
  const navigate = useNavigate();

  // detect screen size
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1024px)");

  const users = JSON.parse(localStorage.getItem("storyUsers")) || [];
  const initialIndex = Number(localStorage.getItem("storyIndex")) || 0;

  const [index, setIndex] = useState(initialIndex);
  const [entryAnim, setEntryAnim] = useState("");

  const current = users[index];
  const prevv = users[index - 2];
  const prev = users[index - 1];
  const next = users[index + 1];
  const nextt = users[index + 2];

  const goPrev = () => {
    if (index > 0) {
      setEntryAnim("enter-from-left");
      setIndex((i) => i - 1);
      setTimeout(() => setEntryAnim(""), 400);
    }
  };

  const goNext = () => {
    if (index < users.length - 1) {
      setEntryAnim("enter-from-right");
      setIndex((i) => i + 1);
      setTimeout(() => setEntryAnim(""), 400);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index === users.length - 1) navigate("/");
      else goNext();
    }, 10000);

    return () => clearTimeout(timer);
  }, [index]);

const goToProfile = (id) => {
  navigate(`/profile`);
};

  if (!current) return <p>No story found</p>;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        position: "relative",
        
      }}
    >
      {/* TOP BAR */}
      <Box
        sx={{
          position: "fixed",
          top: 15,
          left: 15,
          right: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
        }}
      >
        {/* Remove Back Arrow in Mobile */}
        {!isMobile && (
          <IconButton onClick={() => navigate("/Home")}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" color="black" width="150"/>
          </IconButton>
        )}

        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* LEFT CARDS */}
      {!isMobile && (
        <>
          {isTablet ? renderSmallCard(prev) : renderSmallCard(prevv)}
          {!isTablet && renderSmallCard(prev)}
        </>
      )}

      {/* LEFT ARROW */}
      {!isMobile && (
        <IconButton onClick={goPrev} sx={arrowStyle}>
          <ArrowBackIos />
        </IconButton>
      )}

      {/* CENTER STORY */}
      <Box className={`centerStory ${entryAnim}`} style={centerStoryStyle}>
        <Box style={storyUserInfo} onClick={() => navigate(`/profile/${current.id}`)}>
          <img src={current.profile_picture_url} style={profilePic} />
          <span style={{ color: "white", fontWeight: 600 }}>
            {current.username}
          </span>
        </Box>

        <img
          src={current.fullStoryImage}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* RIGHT ARROW */}
      {!isMobile && (
        <IconButton onClick={goNext} sx={arrowStyle}>
          <ArrowForwardIos />
        </IconButton>
      )}

      {/* RIGHT CARDS */}
      {!isMobile && (
        <>
          {isTablet ? renderSmallCard(next) : renderSmallCard(next)}
          {!isTablet && renderSmallCard(nextt)}
        </>
      )}
    </Box>
  );
}

/* ---------------- SMALL CARD COMPONENT ---------------- */
function renderSmallCard(user) {
  const navigate = useNavigate();
  if (!user) {
    return (
      <Box style={smallBox} >
        <Box style={{ width: "100%", height: "100%" }} />
      </Box>
    );
  }

  return (
    <Box style={{ ...smallBox, position: "relative" }}>
      <img src={user.fullStoryImage} style={imgStyle} />

      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          textAlign: "center",
        }}
        onClick={() => navigate(`/profile/${user.id}`)}
        
      >
        <img
          src={user.profile_picture_url}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "3px solid white",
            objectFit: "cover",
          }}
          
        />
        <div
          style={{
            color: "white",
            fontSize: 14,
            marginTop: 5,
            textShadow: "0px 0px 5px black",
          }}
        >
          {user.username}
        </div>
      </Box>
    </Box>
  );
}

/* ---------------- STYLES ---------------- */

const smallBox = {
  width: 160,
  height: 280,
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
};

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const profilePic = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "2px solid white",
  objectFit: "cover",
};

const arrowStyle = {
  color: "white",
  zIndex: 20,
};

const centerStoryStyle = {
  width: "380px",
  height: "600px",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
  boxShadow: "0 0 20px rgba(255,255,255,0.2)",
};

const storyUserInfo = {
  position: "absolute",
  top: 10,
  left: 10,
  display: "flex",
  alignItems: "center",
  gap: 10,
  zIndex: 20,
};

/* ---------------- ANIMATION CSS ---------------- */
const style = document.createElement("style");
style.innerHTML = `
.centerStory { transform: scale(1); opacity: 1; }

.enter-from-left { animation: enterLeft 0.4s ease forwards; }
@keyframes enterLeft {
  0% { transform: translateX(-150px) scale(0.7); opacity: 0; }
  100% { transform: translateX(0) scale(1); opacity: 1; }
}

.enter-from-right { animation: enterRight 0.4s ease forwards; }
@keyframes enterRight {
  0% { transform: translateX(150px) scale(0.7); opacity: 0; }
  100% { transform: translateX(0) scale(1); opacity: 1; }
}
`;
document.head.appendChild(style);
