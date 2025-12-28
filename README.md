# Islamic Events Calendar 🌙

A beautiful, modern web application for browsing Islamic (Shia) events throughout the Islamic calendar year. Features bilingual support (Arabic & Farsi), dark mode, and a clean, responsive design.

## ✨ Features

- 📅 **Comprehensive Event Database**: 60+ Islamic events with detailed information
- 🌐 **Bilingual Interface**: Supports Arabic (default) and Farsi languages
- 🔍 **Smart Search**: Search events by name or description
- 🎯 **Advanced Filtering**: Filter by month, event type (Celebration/Mourning/Event)
- 🌙 **Dark Mode**: Beautiful dark theme with smooth transitions
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- ⚡ **Fast & Lightweight**: Pure JavaScript with Alpine.js (~15KB)
- 🎨 **Modern UI**: Islamic-themed colors with smooth animations
- ♿ **Accessible**: WCAG 2.1 compliant with keyboard navigation
- 🔄 **RTL Support**: Proper right-to-left layout for Arabic/Farsi

## 🚀 Live Demo

- **GitHub Pages**: `https://YOUR_USERNAME.github.io/islamic_events/`
- **Netlify**: `https://islamic-events.netlify.app`
- **Vercel**: `https://islamic-events.vercel.app`

## 📦 Quick Start

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/islamic_events.git
   cd islamic_events
   ```

2. **Start a local server**

   Using Python:

   ```bash
   python -m http.server 8000
   ```

   Or using Node.js:

   ```bash
   npx serve .
   ```

   Or using PHP:

   ```bash
   php -S localhost:8000
   ```

3. **Open your browser**

   ```
   http://localhost:8000
   ```

## 🌍 Deployment

This project can be deployed to any static hosting service for **FREE**. See [DEPLOYMENT_ROADMAP.md](./DEPLOYMENT_ROADMAP.md) for detailed instructions.

### Quick Deploy Options

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/islamic_events)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/islamic_events)

## 📖 API Usage

The project includes a simple client-side API for querying events:

```javascript
// Get all events
const allEvents = await islamicEventsAPI.getAllEvents();

// Get events by day
const events = await islamicEventsAPI.getEventsByDay(1, 10); // Muharram 10 (Ashura)

// Get events by month
const muharramEvents = await islamicEventsAPI.getEventsByMonth(1);

// Search events
const results = await islamicEventsAPI.searchEvents('حسین', 'ar');

// Get events by type
const celebrations = await islamicEventsAPI.getEventsByType('فرح');

// Get event by ID
const event = await islamicEventsAPI.getEventById(4);
```

## 🗂️ Project Structure

```
islamic_events/
├── index.html              # Main HTML file
├── styles.css              # Styling with CSS variables
├── app.js                  # Alpine.js application logic
├── api.js                  # Client-side API
├── events.json             # Events database
├── translations.json       # UI translations (AR/FA)
├── netlify.toml           # Netlify config
├── vercel.json            # Vercel config
├── README.md              # This file
└── DEPLOYMENT_ROADMAP.md  # Deployment guide
```

## 🎨 Event Types

The calendar includes three types of events:

- **🎉 Celebrations (فرح)**: Joyful occasions like births
- **😢 Mourning (حزن)**: Commemorations of martyrdoms
- **📌 Events (حدث)**: Historical milestones

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6+)**: Core functionality
- **Alpine.js**: Lightweight reactive framework
- **Google Fonts**: Noto Naskh Arabic & Amiri fonts

## 🌟 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

## 🙏 Acknowledgments

- Event data sourced from authentic Islamic sources
- Icons from Unicode Emoji
- Fonts from Google Fonts

---

Made with ❤️ by the Islamic Community
