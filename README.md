# 🚀 Greeto Chat Widget

A **standalone, embeddable React chat widget** built with modern technologies. Deploy once, embed anywhere with a simple script tag. Perfect for integrating AI-powered chatbot capabilities into any website.

![React](https://img.shields.io/badge/React-19.2-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.4-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-blue.svg)

---

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Embedding the Widget](#embedding-the-widget)
- [Configuration](#configuration)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- ✅ **Lightweight & Embeddable** - Single JS bundle (~50KB gzipped) with no external dependencies
- ✅ **Fully Typed** - TypeScript for type-safe development
- ✅ **Dynamic Theming** - Customize colors via CSS variables (primary, secondary, hover states)
- ✅ **Multi-Position Support** - Place widget at any corner (bottom-right, bottom-left, top-right, top-left)
- ✅ **Conversation Persistence** - Saves chat history using sessionStorage
- ✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- ✅ **Fast Development** - Vite's Hot Module Replacement for instant updates
- ✅ **Production Ready** - IIFE bundle format for universal compatibility
- ✅ **API Integration** - Axios client with request/response interceptors
- ✅ **Error Handling** - User-friendly error messages and recovery

---

## 🎯 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/react-chatbot-ai-app.git
cd react-chatbot-ai-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API configuration
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_DEV_API_KEY=your-test-api-key-here
```

---

## 💻 Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will open at `http://localhost:3000` with:
- Live reload on file changes
- TypeScript error checking
- ESLint code quality checks

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build widget for production |
| `npm run build:widget` | Build in production mode |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run serve:demo` | Serve demo page locally |
| `npm run typecheck` | Check TypeScript types |
| `npm run clean` | Remove dist/ folder |

---

## 🏗️ Building

### Production Build

```bash
npm run build
```

This generates:
- **`dist/widget.js`** - Embeddable widget bundle (IIFE format)
- **`dist/widget.css`** - Compiled styles
- **`dist/demo.html`** - Demo page for testing

### Build Output Characteristics

- **Format**: IIFE (Immediately Invoked Function Expression)
- **Module Name**: `GreetoChatWidget`
- **CSS**: Embedded and auto-injected
- **Minification**: esbuild with production optimizations
- **Size**: ~50KB gzipped

---

## 📦 Embedding the Widget

### Method 1: Auto-Init with Data Attributes (Recommended)

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Site</h1>
    <p>Chat widget will appear in the bottom-right corner</p>

    <!-- Embed the widget -->
    <script 
        src="https://your-cdn.com/widget.js"
        data-api-key="your-api-key-123">
    </script>
</body>
</html>
```

### Method 2: Manual Initialization

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Site</h1>

    <script src="https://your-cdn.com/widget.js"></script>
    <script>
        // Initialize widget with API key
        const chat = new GreetoChatWidget('your-api-key-123');
        chat.init();

        // Optional: Listen for widget events
        window.addEventListener('greeto-chat-open', () => {
            console.log('Chat opened');
        });

        window.addEventListener('greeto-chat-close', () => {
            console.log('Chat closed');
        });
    </script>
</body>
</html>
```

### Method 3: Programmatic Control

```javascript
// Initialize
const chat = new GreetoChatWidget('your-api-key-123');
await chat.init();

// Open/Close programmatically
chat.open();
chat.close();

// Destroy when done
chat.destroy();
```

---

## ⚙️ Configuration

### Widget Config (from Backend)

The widget fetches configuration from your backend API endpoint `/config`:

```json
{
  "success": true,
  "client_name": "Your Company",
  "widget_config": {
    "primaryColor": "#2563EB",
    "secondaryColor": "#1d4ed8",
    "position": "bottom-right",
    "welcomeMessage": "Hello! How can I help?"
  }
}
```

### CSS Customization

Override default colors via CSS variables:

```css
#greeto-chat-widget-container {
  --color-theme-primary: #2563EB;
  --color-theme-primary-hover: #1d4ed8;
  --color-theme-secondary: #1d4ed8;
  --color-theme-primary-light: #dbeafe;
}
```

### Supported Positions

- `bottom-right` - Default position
- `bottom-left` - Lower left corner
- `top-right` - Upper right corner
- `top-left` - Upper left corner

---

## 🔌 API Integration

### Backend Endpoints Required

The widget expects these API endpoints:

#### 1. **Get Widget Config**
```
GET /config
Headers: x-api-key: {API_KEY}

Response:
{
  "success": true,
  "client_name": "Company Name",
  "widget_config": { ... }
}
```

#### 2. **Send Message**
```
POST /chat
Headers: x-api-key: {API_KEY}
Body: {
  "message": "User message",
  "visitorId": "visitor_123",
  "conversationId": 1
}

Response:
{
  "response": "AI response",
  "conversationId": 1,
  "clientName": "Company Name",
  "sources": [ ... ],
  "contextsUsed": 3
}
```

#### 3. **Get Conversation History**
```
GET /chat/history/{conversationId}
Headers: x-api-key: {API_KEY}

Response:
{
  "conversationId": 1,
  "messages": [
    {
      "id": 1,
      "role": "user",
      "content": "Hello",
      "created_at": "2024-01-18T10:00:00Z"
    },
    {
      "id": 2,
      "role": "assistant",
      "content": "Hi there!",
      "created_at": "2024-01-18T10:00:05Z"
    }
  ]
}
```

### API Configuration

Edit `src/config/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const DEFAULT_API_KEY = import.meta.env.VITE_DEV_API_KEY || 'kula-key-test-123';
```

---

## 📁 Project Structure

```
react-chatbot-ai-app/
├── src/
│   ├── components/
│   │   ├── ChatWidget.tsx      # Main widget button & manager
│   │   ├── ChatWindow.tsx      # Chat window container
│   │   ├── ChatInput.tsx       # Message input form
│   │   ├── MessageBubble.tsx   # User/assistant messages
│   │   └── OnlineButton.tsx    # Online status indicator
│   ├── config/
│   │   └── api.ts             # Axios client configuration
│   ├── types/
│   │   ├── chat.ts            # Chat data types
│   │   └── window.d.ts        # Global window interface
│   ├── assets/
│   │   ├── chat-icon.svg      # Chat button icon
│   │   ├── close-icon.svg     # Close button icon
│   │   └── minimize-icon.svg  # Minimize icon
│   ├── App.tsx                # Main demo app
│   ├── widget.tsx             # Widget root component
│   ├── embed.ts               # Production widget loader
│   ├── index.css              # Global styles
│   └── main.tsx               # React entry point
├── public/
│   ├── index.html             # Main HTML
│   ├── demo.html              # Widget demo page
│   └── loader.js              # Dynamic script loader
├── vite.config.ts             # Vite configuration
├── tailwind.config.cjs        # Tailwind theme
├── postcss.config.cjs         # PostCSS setup
├── eslint.config.js           # ESLint rules
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
└── README.md                  # This file
```

---

## 🛠️ Technologies

### Core
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 6.4** - Build tool & dev server
- **Tailwind CSS 3.4** - Utility-first styling

### Tools & Libraries
- **Axios 1.13** - HTTP client
- **ESLint 9.39** - Code quality
- **PostCSS 8.4** - CSS processing
- **Autoprefixer 10.4** - CSS vendor prefixes

### Configuration Files
- `vite.config.ts` - Build configuration (IIFE output)
- `tailwind.config.cjs` - Custom theme & colors
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.js` - Linting rules

---

## 📖 Usage Example

### Simple Integration

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
</head>
<body>
    <div id="content">
        <h1>Welcome!</h1>
        <p>Our support team is available 24/7 via the chat widget.</p>
    </div>

    <!-- Add this single line to your HTML -->
    <script src="https://cdn.example.com/widget.js" data-api-key="your-key"></script>
</body>
</html>
```

That's it! The widget will:
1. Load the script
2. Create a chat button in the bottom-right corner
3. Fetch configuration from your backend
4. Be ready for user interactions

---

## 🚀 Deployment

### Build for Production

```bash
# Clean previous builds
npm run clean

# Build the widget
npm run build

# Output will be in dist/
# - dist/widget.js
# - dist/widget.css
# - dist/demo.html
```

### Serve Locally for Testing

```bash
npm run serve:demo
```

### Deploy to CDN

1. Upload `dist/widget.js` to your CDN
2. Update the script URL in your HTML pages
3. Test on staging environment first

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🌿 Branching Strategy

- The `main` branch is designated for production-ready code.
- The `dev` branch is used for ongoing development.
- Developers should create new branches with the naming convention `feature/...` for new features.
- All commits related to features should be made to the `dev` branch.
- A Pull Request (PR) should be raised to merge changes from the `dev` branch into the `main` branch during deployment.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Support & Troubleshooting

### Widget Not Showing?
- Check that `data-api-key` attribute is present
- Verify API endpoint is accessible
- Check browser console for errors
- Ensure z-index CSS doesn't conflict with your site

### API Key Not Working?
- Verify the API key in environment variables
- Check backend API is running
- Ensure CORS is properly configured

### Styling Issues?
- Clear browser cache
- Check CSS variable overrides
- Verify Tailwind CSS is not conflicting

---

## 📞 Contact

For questions, issues, or feature requests, please open an issue on GitHub.

---

**Happy coding! 🎉**
