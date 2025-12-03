import { ChatBubbleOutline, Favorite, FavoriteBorder, MoreHoriz, Send } from "@mui/icons-material";
import {Avatar,Box,Button,Card,CardContent,CardHeader,CardMedia,IconButton,Typography,} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import EmojiButton from "./EmojiButton";
import { useNavigate } from "react-router-dom";

export default function Feeds() {
  const navigate =useNavigate();
  const [users, setUsers] = useState([]);
  const [postsToRender, setPostsToRender] = useState([]);
  const [batchSize] = useState(10); // number of posts per batch
  const [err, setError] = useState(null);
  const observer = useRef();

  const [clicked, setClicked] = useState(false);

  const [message, setMessage] = useState("");


  // Fetch all users once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const usersArray = response.data[0]?.users || [];
        setUsers(usersArray);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);

  // Function to fetch the next batch of posts randomly
  const loadNextBatch = useCallback(() => {
    if (users.length === 0) return;

    const newPosts = [];
    const usedUsers = new Set();

    while (newPosts.length < batchSize && usedUsers.size < users.length) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      if (usedUsers.has(randomUserIndex)) continue;
      usedUsers.add(randomUserIndex);

      const user = users[randomUserIndex];
      if (user.posts?.length > 0) {
        const randomPostIndex = Math.floor(Math.random() * user.posts.length);
        const post = user.posts[randomPostIndex];
        newPosts.push({
          key: `${user._id}_${post.post_id}`, // unique key
          username: user.username,
          profile_picture_url: user.profile_picture_url,
          userId: user.id,
          ...post,
        });
      }
    }

    setPostsToRender((prev) => [...prev, ...newPosts]);
  }, [users, batchSize]);

  // Load initial batch
  useEffect(() => {
    if (users.length > 0 && postsToRender.length === 0) {
      loadNextBatch();
    }
  }, [users, postsToRender, loadNextBatch]);

  // Infinite scroll using Intersection Observer
  const lastPostRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadNextBatch();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadNextBatch]
  );

  if (err) return <div>Error: {err}</div>;

  return (
    <Box sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 4 }}>
      {postsToRender.map((post, index) => {
        const isLast = index === postsToRender.length - 1;
        
        return (
          
          <Card
  key={post.key}
  ref={isLast ? lastPostRef : null}
  sx={{
    maxWidth: 500,
    width: "100%",
    // borderRadius: 4,
    boxShadow: "none",
    border:"none",
    mx: "auto",
  }}
>
  {/* Header */}
  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mr:2}}>
  <CardHeader
    avatar={<Avatar src={post.profile_picture_url} />}
    title={post.username || "Username"}
    

    sx={{ ".MuiCardHeader-title": { fontWeight: 600 } }}
    
  onClick={() => navigate(`/profile/${post.userId || post.id}`)}

/>
  <Button sx={{color:"black",
    "&:hover": {
      backgroundColor: "inherit",
      boxShadow: "none",
      transform: "none",
      p:"0",
      m:"none"
    },
    
  }}>
  <MoreHoriz/>
  </Button>
  </Box>

  {/* Post Image (3/4 screen, no border) */}
  <Box sx={{
    display:"flex",
    justifyContent:"center",
      alignItems:"center",
      borderRadius: 2,
      boxShadow:3,
      border: 1,
      borderColor:"gray"}}>

  <CardMedia
    component="img"
    image={post.image_url}
    alt="post"
    sx={{
      height: "75vh",
      width: "80%",
      objectFit: "cover",
      
      
      display: "block",
    }}
  />
  </Box>

  {/* Icons */}
  <CardContent sx={{ display: "flex", gap: 2 }}>
    <IconButton
      onClick={() => setClicked(!clicked)}>
      {clicked ? (
        <Favorite sx={{ color: "red" }} />
      ) : (
        <FavoriteBorder sx={{ color: "gray" }} />
      )}
    </IconButton>
    <IconButton>
      <ChatBubbleOutline />
      {/* <EmojiButton onSelect={(emoji) => setMessage(message + emoji)} /> */}
    </IconButton>
    <IconButton>
      <Send />
    </IconButton>
  </CardContent>

  {/* Caption */}
  <CardContent>
    <Typography variant="body2">
      <strong>{post.username}</strong> {post.caption || "Your caption here..."}
    </Typography>
  </CardContent>
</Card>

        );
      })}
    </Box>
  );
}
