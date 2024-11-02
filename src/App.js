import React from "react"
import "./App.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import MaterialsContainer from "./components/MaterialsContainer"
import Technologies from "./components/Technologies"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff5252",
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Цивілізація
              </Typography>
              <Button color="inherit" component={Link} to="/materials">
                Матеріали
              </Button>
              <Button color="inherit" component={Link} to="/technologies">
                Технології
              </Button>
            </Toolbar>
          </AppBar>
          <header className="App-header">
            <Routes>
              <Route path="/materials" element={<MaterialsContainer />} />
              <Route path="/technologies" element={<Technologies />} />
              <Route
                path="/"
                element={<h2>Ласкаво просимо до Цивілізації</h2>}
              />
            </Routes>
          </header>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
