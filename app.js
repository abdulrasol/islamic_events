/**
 * Islamic Events Calendar - Main Application
 */

document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        // State
        currentLang: 'ar',
        darkMode: false,
        loading: true,
        translations: {},
        allEvents: [],
        filteredEvents: [],
        searchQuery: '',
        selectedMonth: 0,
        selectedType: '',
        selectedEvent: null,

        // Initialize
        async init() {
            // Load translations
            await this.loadTranslations();

            // Load events
            await this.loadEvents();

            // Check for saved preferences
            this.loadPreferences();

            // Apply initial filters
            this.applyFilters();

            this.loading = false;
        },

        // Load translations
        async loadTranslations() {
            try {
                const response = await fetch('./translations.json');
                this.translations = await response.json();
            } catch (error) {
                console.error('Error loading translations:', error);
                // Fallback translations
                this.translations = {
                    ar: { app_name: 'التقويم الإسلامي' },
                    fa: { app_name: 'تقویم اسلامی' }
                };
            }
        },

        // Load events from API
        async loadEvents() {
            try {
                this.allEvents = await islamicEventsAPI.getAllEvents();
                this.filteredEvents = [...this.allEvents];
            } catch (error) {
                console.error('Error loading events:', error);
                this.allEvents = [];
                this.filteredEvents = [];
            }
        },

        // Load user preferences
        loadPreferences() {
            const savedLang = localStorage.getItem('islamic_calendar_lang');
            const savedDarkMode = localStorage.getItem('islamic_calendar_dark_mode');

            if (savedLang) {
                this.currentLang = savedLang;
            }

            if (savedDarkMode !== null) {
                this.darkMode = savedDarkMode === 'true';
            } else {
                // Auto-detect dark mode preference
                this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
        },

        // Save preferences
        savePreferences() {
            localStorage.setItem('islamic_calendar_lang', this.currentLang);
            localStorage.setItem('islamic_calendar_dark_mode', this.darkMode);
        },

        // Get translation
        t(key) {
            const keys = key.split('.');
            let value = this.translations[this.currentLang];

            for (const k of keys) {
                if (value && typeof value === 'object') {
                    value = value[k];
                } else {
                    return key;
                }
            }

            return value || key;
        },

        // Toggle language
        toggleLanguage() {
            this.currentLang = this.currentLang === 'ar' ? 'fa' : 'ar';
            this.savePreferences();

            // Update document direction (both are RTL)
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', this.currentLang);
        },

        // Handle search
        async handleSearch() {
            this.loading = true;

            try {
                if (this.searchQuery.trim() === '') {
                    this.filteredEvents = [...this.allEvents];
                } else {
                    this.filteredEvents = await islamicEventsAPI.searchEvents(
                        this.searchQuery,
                        this.currentLang
                    );
                }

                // Apply existing filters
                this.applyFiltersToResults();
            } catch (error) {
                console.error('Error searching events:', error);
            }

            this.loading = false;
        },

        // Clear search
        clearSearch() {
            this.searchQuery = '';
            this.handleSearch();
        },

        // Apply filters
        async applyFilters() {
            this.loading = true;

            try {
                let results = [...this.allEvents];

                // Filter by month
                if (this.selectedMonth > 0) {
                    results = results.filter(event => event.month === parseInt(this.selectedMonth));
                }

                // Filter by type
                if (this.selectedType) {
                    results = results.filter(event => event.type_ar === this.selectedType);
                }

                // Apply search if active
                if (this.searchQuery.trim() !== '') {
                    const searchTerm = this.searchQuery.toLowerCase().trim();
                    results = results.filter(event => {
                        if (this.currentLang === 'ar') {
                            return event.name?.toLowerCase().includes(searchTerm) ||
                                event.description?.toLowerCase().includes(searchTerm);
                        } else {
                            return event.name_en?.toLowerCase().includes(searchTerm) ||
                                event.description?.toLowerCase().includes(searchTerm);
                        }
                    });
                }

                this.filteredEvents = results;
            } catch (error) {
                console.error('Error applying filters:', error);
            }

            this.loading = false;
        },

        // Apply filters to existing search results
        applyFiltersToResults() {
            let results = [...this.filteredEvents];

            // Filter by month
            if (this.selectedMonth > 0) {
                results = results.filter(event => event.month === parseInt(this.selectedMonth));
            }

            // Filter by type
            if (this.selectedType) {
                results = results.filter(event => event.type_ar === this.selectedType);
            }

            this.filteredEvents = results;
        },

        // Get event type CSS class
        getEventTypeClass(typeAr) {
            const typeMap = {
                'فرح': 'celebration',
                'حزن': 'mourning',
                'حدث': 'event'
            };
            return typeMap[typeAr] || 'event';
        },

        // Truncate text
        truncate(text, length = 100) {
            if (!text) return '';
            if (text.length <= length) return text;
            return text.substring(0, length) + '...';
        },

        // Open event modal
        openEventModal(event) {
            this.selectedEvent = event;
            document.body.style.overflow = 'hidden';
        },

        // Close event modal
        closeEventModal() {
            this.selectedEvent = null;
            document.body.style.overflow = 'auto';
        },

        // Watch for dark mode changes
        watchDarkMode() {
            this.$watch('darkMode', (value) => {
                this.savePreferences();
            });
        }
    }));
});

// Listen for system dark mode changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const darkModePreference = localStorage.getItem('islamic_calendar_dark_mode');
    if (darkModePreference === null) {
        // Only auto-update if user hasn't set a preference
        Alpine.store('darkMode', e.matches);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        const appData = Alpine.$data(document.body);
        if (appData && appData.selectedEvent) {
            appData.closeEventModal();
        }
    }

    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Service Worker Registration (for PWA support - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('./sw.js').then(
        //     registration => console.log('SW registered:', registration),
        //     err => console.log('SW registration failed:', err)
        // );
    });
}

// Analytics helper (optional - add your analytics code)
function trackEvent(category, action, label) {
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
    console.log('Event tracked:', { category, action, label });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { trackEvent };
}
