import logo from './logo.svg';
import './App.css';
import { Box, Button } from '@mui/material';
import { Link } from "react-router-dom";
function App() {
  return (
    // Login/landing here
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
    >
      <h1>Genshin Daily Reminder Tool!</h1>
      <Link to="/SetupForm">Login</Link>
      
    </Box>
    
    
  );
}

export default App;
