# 🚀 Greeto Chat Widget

Deployment test

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
- ✅ **Contrast-Aware Text Colors** - Text color automatically adjusts to ensure visibility on any background color
- ✅ **Multi-Position Support** - Place widget at any corner (bottom-right, bottom-left, top-right, top-left)
- ✅ **Conversation Persistence** - Saves chat history using localStorage
- ✅ **Visitor ID Tracking** - UUID v4 based visitor identification with persistent storage
- ✅ **Lead Capture Form** - User-invoked form to collect visitor details (name, email, phone, company)
- ✅ **Lead Management** - Create, read, and update lead information with API integration
- ✅ **Smart Form UI** - Toggle between chat input and lead form, auto-detect returning visitors
- ✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS and scroll support
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
  --color-text-on-primary: #ffffff;      /* Auto-calculated based on luminance */
  --color-text-on-secondary: #1f2937;    /* Auto-calculated based on luminance */
}
```

#### Contrast-Aware Text Colors

The widget automatically calculates appropriate text colors based on background luminance:
- **Light backgrounds** → Dark text (#1f2937)
- **Dark backgrounds** → White text (#ffffff)

This ensures text remains readable regardless of the primary or secondary color choices. The calculation uses the WCAG luminance formula for optimal contrast.

### Supported Positions

- `bottom-right` - Default position
- `bottom-left` - Lower left corner
- `top-right` - Upper right corner
- `top-left` - Upper left corner

---

## 🔌 API Integration

### Backend Endpoints Required

The widget expects these API endpoints:

#### 1. **Get Widget Config** (Enhanced with Starter Suggestions)
```
GET /widget/config
Headers: x-api-key: {API_KEY}

Response:
{
  "success": true,
  "client_name": "Company Name",
  "widget_config": {
    "primaryColor": "#2563EB",
    "secondaryColor": "#1d4ed8",
    "position": "bottom-right",
    "welcomeMessage": "Hi! How can I help you today?"
  },
  "starter_suggestions": [
    "What are your pricing plans?",
    "How do I get started?",
    "Tell me about features"
  ]
}
```

#### 2. **Client/Subscription Status Check** (New)
```
GET /chat/client-status
Headers: x-api-key: {API_KEY}

Response:
{
  "client_status": "active",      // 'active' or 'inactive'
  "subscription_status": "active"  // 'active', 'expired', or 'inactive'
}

Purpose:
- Controls widget visibility based on client/subscription status
- Widget hides if: client_status = 'inactive' AND subscription_status = 'expired' or 'inactive'
- Useful for disabling widget when subscription expires

Error Response (404):
{
  "error": "Client not found"
}
```

#### 3. **Chat Window Design**

The chat window header features:
- **Solid Primary Color** - Uses a single primary color background (no gradient)
- **Contrast Text** - Text color automatically adjusts for readability
- **Online Status** - Green pulse indicator showing agent availability
- **Minimize Control** - Button to collapse/restore the chat window

#### 4. **Send Message**
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

#### 4. **Get Conversation History**
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

#### 5. **Submit/Create Lead**
```
POST /api/leads
Headers: x-api-key: {API_KEY}
Body: {
  "visitorId": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "conversationId": 1
}

Response (201):
{
  "success": true,
  "leadId": "123",
  "isNew": true,
  "lead": {
    "id": "123",
    "visitor_id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Tech Corp",
    "conversation_id": 1,
    "created_at": "2026-02-09T10:00:00Z",
    "updated_at": "2026-02-09T10:00:00Z"
  }
}
```

#### 6. **Get Lead Details**
```
GET /api/leads/{visitorId}
Headers: x-api-key: {API_KEY}

Response (200):
{
  "success": true,
  "lead": {
    "id": "123",
    "visitor_id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Tech Corp",
    "conversation_id": 1,
    "created_at": "2026-02-09T10:00:00Z",
    "updated_at": "2026-02-09T10:00:00Z"
  }
}
```

Error Response (404):
```json
{
  "success": false,
  "error": "Lead not found"
}
```

#### 7. **Update Lead Details**
```
PUT /api/leads/{visitorId}
Headers: x-api-key: {API_KEY}
Body: {
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": null,
  "company": null
}

Response (200):
{
  "success": true,
  "lead": {
    "id": "123",
    "visitor_id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": null,
    "company": null,
    "conversation_id": 1,
    "created_at": "2026-02-09T10:00:00Z",
    "updated_at": "2026-02-09T12:00:00Z"
  },
  "message": "Lead updated successfully"
}
```

**Features:**
- Partial updates supported - only send fields to change
- Optional fields can be set to `null` to clear them
- Email validation enforced
- All fields auto-trimmed

### API Configuration

Edit `src/config/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const DEFAULT_API_KEY = import.meta.env.VITE_DEV_API_KEY || 'kula-key-test-123';
```

### Available API Functions

The widget exports these API functions from `src/config/api.ts`:

```typescript
// Chat API
sendMessage(message, visitorId, conversationId) // POST /chat

// Lead API  
submitLead(leadData) // POST /api/leads
getLead(visitorId) // GET /api/leads/{visitorId}
updateLead(visitorId, updateData) // PUT /api/leads/{visitorId}

// Configuration
setApiKey(newApiKey) // Update API key dynamically
setBaseUrl(newBaseUrl) // Change API base URL
getCurrentApiKey() // Get current API key
```

---

## 📁 Project Structure

```
react-chatbot-ai-app/
├── src/
│   ├── components/
│   │   ├── ChatWidget.tsx      # Main widget button & manager
│   │   ├── ChatWindow.tsx      # Chat window container with lead form toggle
│   │   ├── ChatInput.tsx       # Message input form
│   │   ├── LeadForm.tsx        # Lead capture/edit form component
│   │   ├── MessageBubble.tsx   # User/assistant messages
│   │   └── OnlineButton.tsx    # Online status indicator
│   ├── config/
│   │   └── api.ts             # Axios client + lead API functions
│   ├── types/
│   │   ├── chat.ts            # Chat data types
│   │   ├── lead.ts            # Lead form types & interfaces
│   │   └── window.d.ts        # Global window interface
│   ├── utils/
│   │   └── uuid.ts            # UUID v4 generation & visitor ID management
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

## 📝 Recent Updates

### v1.3.0 - Starter Suggestions & Client Status Management
- ✨ **Starter Suggestions** - Display contextual starter prompts to users on initial chat load
- 🎯 **Client/Subscription Status Checking** - Widget visibility controlled by client and subscription status
- 🔐 **Status-Based Widget Control** - Widget auto-hides if client is inactive AND subscription is expired/inactive
- 🚀 **Improved Initialization Flow** - Status checks occur before config fetch, with graceful fallbacks
- 📦 **New API Functions**:
  - `getWidgetConfig()` - Fetch widget configuration including starter suggestions
  - `fetchClientAndSubscriptionStatus()` - Check client and subscription status for visibility control
- 🎨 **Updated Icon** - Replaced inline chat icon SVG with `GreetoIconWhite.svg` asset for better performance
- ⚡ **Enhanced Scroll Behavior** - Improved initial scroll handling with instant positioning on first load
- 🔄 **Better Error Handling** - Comprehensive fallback to default config if fetch fails

#### New Features Explained

**Starter Suggestions**
- Displayed as clickable pills below the welcome message
- Fetched from widget configuration via `/widget/config` endpoint
- Only visible on initial load (hidden after first message)
- User can click to send suggestion as a message
- Example configuration:
  ```json
  {
    "starter_suggestions": [
      "What are your pricing plans?",
      "How do I get started?",
      "Tell me about features"
    ]
  }
  ```

**Client/Subscription Status Control**
- Automatically checks status on widget initialization
- Status check occurs in both production (`embed.ts`) and development (`main.tsx`) modes
- Widget visibility logic:
  ```
  HIDE widget if:  client_status = 'inactive' AND 
                   (subscription_status = 'expired' OR subscription_status = 'inactive')
  SHOW widget if:  status check fails (safe default)
  ```
- Useful for:
  - Disabling widget for inactive clients
  - Preventing widget display when subscription expires
  - Graceful degradation with fallback behavior

#### API Endpoints Updated

**1. Widget Config (Enhanced)**
```
GET /widget/config
Headers: x-api-key: {API_KEY}

Response:
{
  "success": true,
  "client_name": "Company Name",
  "widget_config": {
    "primaryColor": "#2563EB",
    "secondaryColor": "#1d4ed8",
    "position": "bottom-right",
    "welcomeMessage": "Hi! How can I help you today?"
  },
  "starter_suggestions": [
    "Send a message",
    "View pricing",
    "Get started now"
  ]
}
```

**2. Client/Subscription Status (New)**
```
GET /chat/client-status
Headers: x-api-key: {API_KEY}

Response:
{
  "client_status": "active",      // 'active' or 'inactive'
  "subscription_status": "active"  // 'active', 'expired', or 'inactive'
}

Alternative Response Format (backend-specific):
{
  "clients": [
    {
      "status": "active",
      "subscription": {
        "status": "active"
      }
    }
  ]
}
```

#### New Files/Changes

1. **`src/assets/GreetoIconWhite.svg`** (29 lines)
   - New white Greeto icon asset
   - Used in chat window header instead of inline SVG
   - Improved performance and maintainability

2. **Modified `src/config/api.ts`**
   - Added `getWidgetConfig()` - Fetch widget configuration with starter suggestions
   - Added `fetchClientAndSubscriptionStatus()` - Check client and subscription status
   - Proper error handling and defensive parsing for different response formats

3. **Modified `src/components/ChatWindow.tsx`**
   - Added state: `starterSuggestions` (stores fetched suggestions)
   - Added state: `suggestionsVisible` (toggle visibility)
   - Added ref: `isInitialLoad` (for improving scroll behavior)
   - New effect: Fetch starter suggestions on component mount
   - New function: `handleSuggestionClick()` - Send suggestion as message
   - Updated scroll behavior with instant positioning on initial render
   - Display starter suggestions below welcome message
   - Replaced inline SVG with `GreetoIconWhite` image

4. **Modified `src/embed.ts`** (Production Widget)
   - Added status check in `init()` method before any other initialization
   - Widget auto-hides based on client/subscription status
   - Graceful fallback to default config if fetch fails
   - Improved error handling with specific backend error messages

5. **Modified `src/main.tsx`** (Development Mode)
   - Added `checkClientStatus()` function for status verification
   - Status check occurs before config fetch
   - Widget skips rendering if status check fails visibility requirements
   - Better error logging and fallback behavior

#### Updated Widget Initialization Flow

**Production (embed.ts):**
```
1. Initialize GreetoChatWidget with API key
2. ✅ Check client/subscription status
3. ✅ If status allows → Load CSS stylesheet
4. ✅ If status allows → Fetch widget config
5. ✅ Create container & apply config
6. ✅ Render widget to DOM
   OR fallback to defaults if config fetch fails
```

**Development (main.tsx):**
```
1. Get API key from script tag or .env
2. Set API key globally
3. ✅ Check client/subscription status
4. ✅ If status allows → Fetch widget config
5. ✅ Create container & apply config
6. ✅ Render widget to React root
   OR use default config if fetch fails
```

#### Updated API Functions Available

```typescript
// Widget visibility control
fetchClientAndSubscriptionStatus() // Check if widget should be visible

// Configuration
getWidgetConfig() // Fetch widget config including starter_suggestions

// Other existing functions
setApiKey()
getLead()
submitLead()
updateLead()
```

### v1.2.0 - Lead Form Feature & Visitor ID Persistence
- ✨ **Lead Form Component** - User-invoked form to capture visitor details (name, email, phone, company)
- 🔄 **Lead Edit Functionality** - Ability to edit previously submitted lead details
- 💾 **localStorage Persistence** - Visitor ID now persists using RFC 4122 UUID v4 (instead of sessionStorage)
- 🆔 **Visitor ID Management** - Unique identifier per visitor for persistent conversation tracking
- 📱 **Scrollable Form UI** - Lead form with proper scroll support for mobile devices
- 🔌 **Lead API Integration** - Complete CRUD endpoints for lead management:
  - `POST /api/leads` - Create/upsert lead with visitor details
  - `GET /api/leads/:visitorId` - Retrieve existing lead data
  - `PUT /api/leads/:visitorId` - Update lead details with partial updates support
- ✅ **Form Validation** - Email validation, required fields, real-time error clearing
- 🎯 **Smart UI State** - Button text changes from "Leave my details" to "Edit my details" after submission
- 🚀 **Auto-Detection** - On widget mount, checks if lead exists and auto-loads edit mode
- 🧹 **Empty Field Handling** - Supports clearing optional fields (phone, company) by setting them to null

#### New Files Created

1. **`src/utils/uuid.ts`** (61 lines)
   - UUID v4 generation (RFC 4122 compliant)
   - `generateUUID()` - Create new UUID
   - `getVisitorId()` - Retrieve from localStorage or create new
   - `clearVisitorId()` - Remove stored visitor ID
   - Persistent storage using localStorage

2. **`src/types/lead.ts`** (43 lines)
   - `LeadSubmitRequest` - Lead submission payload
   - `Lead` - Complete lead data structure
   - `LeadSubmitResponse` - API response with lead info
   - `LeadFormData` - Form field values
   - `LeadFormErrors` - Validation error mapping

3. **`src/components/LeadForm.tsx`** (284 lines)
   - Reusable lead form component with create/edit modes
   - Props: `visitorId`, `conversationId`, `initialData`, `isEditMode`, `onSuccess`, `onCancel`
   - Features:
     - Name field (required, trimmed)
     - Email field (required, email regex validation)
     - Phone field (optional, nullable)
     - Company field (optional, nullable)
     - Real-time error clearing on input
     - Disabled submit button until valid
     - Error panel for API errors
     - Proper scroll support with sticky action buttons

#### Modified Files

1. **`src/config/api.ts`** (170 lines)
   - Added `submitLead()` - POST /leads with visitor tracking
   - Added `updateLead()` - PUT /leads/:visitorId with partial updates
   - Added `getLead()` - GET /leads/:visitorId to fetch existing lead
   - 404 handling for "lead not found" scenarios
   - Request/response logging for debugging

2. **`src/components/ChatWindow.tsx`** (288 lines)
   - Imported `getLead` for checking existing leads on mount
   - Added state: `leadSubmitted` (tracks submission status)
   - Added state: `leadData` (stores form data for editing)
   - New useEffect: Checks for existing lead on component mount
   - Updated `handleLeadSubmitSuccess()` to store lead data
   - Toggle between chat input and lead form based on state
   - Button text changes: "Leave my details" → "Edit my details"
   - Pre-fills form with existing lead data in edit mode

#### Lead Form Workflow

**First Time (Create):**
```
User → Clicks "Leave my details" → Form opens
     → Fills name, email, phone, company
     → Clicks "Submit" → API: POST /leads
     → Success message + Button changes to "Edit my details"
```

**Returning Visitor (Edit):**
```
Widget mounts → API: GET /leads/:visitorId
             → Lead found → Form pre-filled + "Edit my details" shown
             → User edits fields
             → Clicks "Update" → API: PUT /leads/:visitorId
             → Success message + Form closes
```

**Optional Field Clearing:**
```
Edit mode → Remove company name (empty string)
         → Click "Update"
         → API receives: { company: null }
         → Backend clears the company field
```

#### API Endpoints Summary

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/leads` | Create/upsert lead | X-API-Key |
| GET | `/api/leads/:visitorId` | Fetch lead | X-API-Key |
| PUT | `/api/leads/:visitorId` | Update lead details | X-API-Key |
| GET | `/chat/history/:conversationId` | Conversation history | X-API-Key |
| POST | `/chat` | Send message | X-API-Key |
| GET | `/config` | Widget config | X-API-Key |

#### Visitor ID & Lead Persistence

- **Visitor ID**: UUID v4 format, stored in localStorage, persists across sessions
- **Lead Data**: Stored on backend, retrieved on widget mount
- **Conversation ID**: Optional field, returned by API if provided
- **Storage Keys**: 
  - `greeto_visitor_id` - UUID for visitor tracking
  - `greeto_conversation_id` - Current conversation ID

### v1.1.0 - Enhanced Theming & Accessibility
- ✨ **Contrast-Aware Text Colors** - Automatic text color calculation based on background luminance (WCAG formula)
- 🎨 **Dynamic Text Color CSS Variables** - `--color-text-on-primary` and `--color-text-on-secondary` set automatically
- 🧹 **Simplified Chat Header** - Changed from gradient to solid primary color for cleaner design
- 📱 **Improved Accessibility** - All text now has guaranteed minimum contrast ratio for readability
- 🔧 **Updated Components**:
  - `MessageBubble.tsx` - Uses dynamic text colors for user and assistant messages
  - `ChatInput.tsx` - Button text color adjusts for optimal visibility
  - `ChatWindow.tsx` - Header now uses solid primary color with contrast-aware text

### Color Calculation Algorithm

The widget uses the luminance formula to determine text color:

```
luminance = (0.299 × R + 0.587 × G + 0.114 × B) / 255

If luminance > 0.5 → use dark text (#1f2937)
If luminance ≤ 0.5 → use white text (#ffffff)
```

This ensures text remains readable regardless of the chosen theme colors.

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
