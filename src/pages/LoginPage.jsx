import { FacebookOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,Typography
} from "@mui/material";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";



function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await axios.get("http://localhost:5000/users");
    const data = res.data;

  

    // Extract the root key ("0")
    // const rootKey = Object.keys(data)[0];
    // const root = data[rootKey];

    // Get the users array
    const usersArray = data[0].users;
    console.log("UsersArray:", usersArray);

    const foundUser = usersArray.find(
      (u) =>
        (u.username === loginInput.trim() ||
          u.email === loginInput.trim() ||
          u.mobile_number === loginInput.trim()) &&
        u.password === password
    );

    if (foundUser) {
      localStorage.setItem("userId", foundUser.id);
      navigate("/Home");
    } else {
      alert("Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  return (
    <Box sx={{ display: "flex", p: { xs: 2, sm: 3, md: 5 }, mx: { xs: 2, sm: 3, md: 5 } }}>
  <Box
    sx={{
      width: { xs: "0%", sm: "0%", md: "55%" },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: { xs: 2, sm: 3, md: 0 },
    }}
  >
    <img
      src="landing-2x.png"
      alt="image"
      style={{ maxWidth: "100%", height: "auto" }}
    />
  </Box>

  <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" }, p: { xs: 2, sm: 3, md: 5 } }}>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
        alt=""
        style={{ maxWidth: 200, width: "100%", height: "auto" }}
      />
    </Box>

    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <TextField
          sx={{ width: "100%", maxWidth: 350 }}
          label="Phone number, username or email address"
          variant="outlined"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          InputProps={{
      sx: { height: 40, fontSize: 14, padding: '0 10px' } // adjust height & padding
    }}
    InputLabelProps={{ sx: { fontSize: 14, mt: -0.5 } }} // adjust label size
  
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <TextField
          sx={{ width: "100%", maxWidth: 350 }}
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            sx: { height: 35, fontSize: 14, padding: '0 10px' } ,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ sx: { fontSize: 14, mt: -0.5 } }} 
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button variant="contained" sx={{ width: "100%", maxWidth: 350 }} onClick={handleLogin}>
          Log in
        </Button>
      </Box>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
        <Divider sx={{ width: "100%", maxWidth: 350 }}>OR</Divider>
      </Box>

      <Box sx={{ color: "blue", display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
        <FacebookOutlined />
        <Typography sx={{ ml: 1 }}>Login with Facebook</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <Link href="https://mui.com/" underline="hover" sx={{ color: "black" }}>
          Forgotten your Password?
        </Link>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Typography>
          Don't have an account?{" "}
          <Link href="https://mui.com/" underline="hover" sx={{ color: "blue" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  </Box>
</Box>

  );
}

export default LoginPage;
