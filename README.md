# DeskDrop 💧

> **Peer-to-peer web chat & chunked file transfer built with macOS glassmorphism.**

DeskDrop is a peer-to-peer progressive web application that connects devices directly over WebRTC DataChannels. Stream 64KB chunked files and exchange instant messages directly between peers with zero intermediate cloud servers.

Created by [@anshi-zyonz](https://github.com/anshi-zyonz) • [Instagram](https://www.instagram.com/anshi_zyonz/)

---

## ✨ Features

- **⚡ Direct WebRTC P2P Mesh**: Instant local LAN & internet messaging with direct browser-to-browser data channels.
- **📁 Chunked File Drop**: Slices files into 64KB chunks streamed peer-to-peer with live transfer progress indicators.
- **🎨 SwiftUI & Glassmorphic Aesthetics**: Tailored dark glass styling, customizable UI lightness/darkness, and adjustable backdrop blur sliders.
- **🖼️ Universal Wallpaper System**: Set custom photo wallpapers or curated gradients across the chat and full window.
- **😃 Animated Microsoft Fluent Emojis & Tenor GIFs**: Rich interactive emoji picker with animated emojis and instant GIF search.
- **📲 Progressive Web App (PWA)**: Installable on macOS, Windows, iOS, and Android. Works offline over local Wi-Fi.
- **🔔 Desktop & Mobile Push Notifications**: Background message and file transfer alerts.

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser or serve it locally:

```bash
# Python
python3 -m http.server 8089

# Node / npx
npx serve .
```

Visit `http://localhost:8089` on your machine, or `http://<your-lan-ip>:8089` from other devices on the same Wi-Fi.

---

## 📄 License

MIT © [Anshi Zyonz](https://github.com/anshi-zyonz)
