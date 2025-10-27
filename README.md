<br />
<div align="center">
  <h1 align="center">✋ Gesture Recognition</h1>

[![GitHub Stars](https://img.shields.io/github/stars/Roy-Jin/Gesture-Recognition?style=for-the-badge)](https://github.com/Roy-Jin/Gesture-Recognition/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/Roy-Jin/Gesture-Recognition?style=for-the-badge)](https://github.com/Roy-Jin/Gesture-Recognition/issues)
[![MIT License](https://img.shields.io/github/license/Roy-Jin/Gesture-Recognition?style=for-the-badge)](LICENSE)

  <p align="center">
    A real-time gesture recognition demo built with TensorFlowJs + Mediapipe Hands
    <br />
    <a href="./README.md">English</a>
    |
    <a href="./README_CN.md">中文</a>
  </p>
</div>

<details>
  <summary>📑 Table of Contents</summary>
  <ol>
    <li><a href="#-about-the-project">About The Project</a></li>
    <li><a href="#-features">Features</a></li>
    <li><a href="#-getting-started">Getting Started</a></li>
    <li><a href="#-usage">Usage</a></li>
    <li><a href="#-project-structure">Project Structure</a></li>
    <li><a href="#-technologies-used">Technologies Used</a></li>
    <li><a href="#-contributing">Contributing</a></li>
    <li><a href="#-license">License</a></li>
    <li><a href="#-contact">Contact</a></li>
  </ol>
</details>

## 🧐 About The Project

<div align="center">
  <img src="./demo.webp" alt="Gesture Recognition Demo" width="600"/>
</div>

A real-time gesture recognition system that:
- Detects hand gestures using Mediapipe Hands
- Provides object interaction capabilities
- Offers voice feedback via Web Speech API

## ✨ Features

| Feature | Description | Tech Used |
|---------|-------------|-----------|
| **Gesture Recognition** | Precise hand detection and gesture classification | Mediapipe Hands |
| **Object Interaction** | Virtual object manipulation with gestures | TensorFlow.js |
| **Voice Feedback** | Real-time voice responses to user actions | Web Speech API |

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14.x
- npm >= 6.x
- Modern browser with WebGL support

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/Roy-Jin/Gesture-Recognition.git
   ```
2. Install NPM packages
   ```sh
   cd Gesture-Recognition
   npm install
   ```
3. Start the development server
   ```sh
   npm run dev
   ```

## 🖥️ Usage

1. **Start the application**
   ```sh
   npm run dev
   ```
2. **Open your browser** to `http://localhost:5173`
3. **Allow camera access** when prompted
4. **Interact** with the virtual objects using hand gestures

> **Note:** For best results, use in a well-lit environment and ensure your hands are clearly visible to the camera.

## 🗂 Project Structure

```
Gesture-Recognition/
├── src/
│   ├── js/
│   │   ├── camera.js       # Camera handling logic
│   │   ├── detector.js     # Gesture detection
│   │   ├── interaction.js  # Object interaction
│   │   ├── renderer.js     # Rendering logic
│   │   ├── utils.js        # Utility functions
│   │   └── voice.js        # Voice feedback
│   ├── index.css
│   └── main.js
├── index.html
├── package.json
└── README.md
```

## 🛠 Technologies Used

- [TensorFlow.js](https://www.tensorflow.org/js) - Machine learning library
- [Mediapipe Hands](https://google.github.io/mediapipe/solutions/hands) - Hand tracking
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) - Voice synthesis
- Vanilla JavaScript - Core functionality

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Roy-Jin - [jinroy@outlook.com](mailto:jinroy@outlook.com)