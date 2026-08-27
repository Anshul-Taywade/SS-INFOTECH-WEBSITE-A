const fs = require('fs');
const path = require('path');

// Execute logo & gallery copy scripts automatically on Next.js build
try {
    const scriptPath = path.join(__dirname, 'copy_logo.js');
    if (fs.existsSync(scriptPath)) {
        delete require.cache[require.resolve(scriptPath)];
        require(scriptPath);
    }
    const galleryScriptPath = path.join(__dirname, 'copy_gallery_images.js');
    if (fs.existsSync(galleryScriptPath)) {
        delete require.cache[require.resolve(galleryScriptPath)];
        require(galleryScriptPath);
    }
} catch (err) {
    console.warn('[Next Config] Auto-sync hook skipped:', err.message);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Static export ke liye (Netlify deployment)
    output: 'export',

    // Images ke liye (optimization disable)
    images: {
        unoptimized: true,
    },

    // Trailing slash optional - clean URLs ke liye
    trailingSlash: false,
}

module.exports = nextConfig;