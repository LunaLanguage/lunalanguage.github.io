const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS, and downloads)
app.use(express.static(path.join(__dirname)));

// Route for the homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Download route (detects OS)
app.get("/download", (req, res) => {
    const userAgent = req.headers["user-agent"].toLowerCase();
    let downloadPath = "/download/LunaInstaller-Windows.msi"; // Default: Windows

    if (userAgent.includes("linux")) {
        downloadPath = "/download/LunaSetup.AppImage"; // Linux
    }

    // Redirect user to the correct download link
    res.redirect(downloadPath);
});

// Handle 404 errors (redirect to 404.html)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Luna server running on http://localhost:${PORT}`);
});