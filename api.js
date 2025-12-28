/**
 * Islamic Events API
 * A simple client-side API for querying Islamic events
 */

class IslamicEventsAPI {
    constructor() {
        this.events = [];
        this.loaded = false;
    }

    /**
     * Load events from JSON file
     */
    async loadEvents() {
        if (this.loaded) return this.events;

        try {
            const response = await fetch('./events.json');
            const data = await response.json();
            this.events = data.islamic_events || [];
            this.loaded = true;
            return this.events;
        } catch (error) {
            console.error('Error loading events:', error);
            throw new Error('Failed to load events data');
        }
    }

    /**
     * Get all events
     */
    async getAllEvents() {
        await this.loadEvents();
        return this.events;
    }

    /**
     * Get events by specific day
     * @param {number} month - Month number (1-12)
     * @param {number} day - Day number (1-30)
     */
    async getEventsByDay(month, day) {
        await this.loadEvents();
        return this.events.filter(event =>
            event.month === month && event.day === day
        );
    }

    /**
     * Get events by month
     * @param {number} month - Month number (1-12)
     */
    async getEventsByMonth(month) {
        await this.loadEvents();
        return this.events.filter(event => event.month === month);
    }

    /**
     * Search events by name or description
     * @param {string} query - Search query
     * @param {string} lang - Language ('ar' or 'en')
     */
    async searchEvents(query, lang = 'ar') {
        await this.loadEvents();

        if (!query || query.trim() === '') {
            return this.events;
        }

        const searchTerm = query.toLowerCase().trim();

        return this.events.filter(event => {
            if (lang === 'ar') {
                return event.name?.toLowerCase().includes(searchTerm) ||
                    event.description?.toLowerCase().includes(searchTerm) ||
                    event.month_name_ar?.toLowerCase().includes(searchTerm);
            } else {
                return event.name_en?.toLowerCase().includes(searchTerm) ||
                    event.description?.toLowerCase().includes(searchTerm) ||
                    event.month_name_en?.toLowerCase().includes(searchTerm);
            }
        });
    }

    /**
     * Get events by type
     * @param {string} type - Event type ('فرح', 'حزن', 'حدث') or ('Celebration', 'Mourning', 'Event')
     */
    async getEventsByType(type) {
        await this.loadEvents();
        return this.events.filter(event =>
            event.type_ar === type || event.type_en === type
        );
    }

    /**
     * Get events by importance
     * @param {string} importance - Importance level ('high', 'medium', 'low')
     */
    async getEventsByImportance(importance) {
        await this.loadEvents();
        return this.events.filter(event => event.importance === importance);
    }

    /**
     * Get event by ID
     * @param {number} id - Event ID
     */
    async getEventById(id) {
        await this.loadEvents();
        return this.events.find(event => event.id === id);
    }

    /**
     * Get upcoming events from today
     * @param {number} currentMonth - Current Islamic month
     * @param {number} currentDay - Current Islamic day
     * @param {number} limit - Maximum number of events to return
     */
    async getUpcomingEvents(currentMonth, currentDay, limit = 10) {
        await this.loadEvents();

        const upcoming = this.events.filter(event => {
            if (event.month > currentMonth) return true;
            if (event.month === currentMonth && event.day >= currentDay) return true;
            return false;
        });

        return upcoming.slice(0, limit);
    }

    /**
     * Get events grouped by month
     */
    async getEventsGroupedByMonth() {
        await this.loadEvents();

        const grouped = {};
        for (let i = 1; i <= 12; i++) {
            grouped[i] = this.events.filter(event => event.month === i);
        }

        return grouped;
    }

    /**
     * Get event statistics
     */
    async getStatistics() {
        await this.loadEvents();

        const stats = {
            total: this.events.length,
            byType: {},
            byImportance: {},
            byMonth: {}
        };

        this.events.forEach(event => {
            // Count by type
            const type = event.type_en;
            stats.byType[type] = (stats.byType[type] || 0) + 1;

            // Count by importance
            const importance = event.importance;
            stats.byImportance[importance] = (stats.byImportance[importance] || 0) + 1;

            // Count by month
            const month = event.month;
            stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
        });

        return stats;
    }
}

// Create singleton instance
const islamicEventsAPI = new IslamicEventsAPI();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = islamicEventsAPI;
}
