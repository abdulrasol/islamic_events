const fs = require('fs');

class Event {
    constructor(json) {
        this.id = json[Event.idKey];
        this.month = json[Event.monthKey];
        this.monthNameAr = json[Event.monthNameArKey];
        this.monthNameEn = json[Event.monthNameEnKey];
        this.day = json[Event.dayKey];
        this.yearOfOccurrence = json[Event.yearOfOccurrenceKey];
        this.name = json[Event.nameKey];
        this.nameEn = json[Event.nameEnKey];
        this.description = json[Event.descriptionKey];
        this.importance = json[Event.importanceKey];
        this.typeAr = json[Event.typeArKey];
        this.typeEn = json[Event.typeEnKey];
    }

    static idKey = 'id';
    static monthKey = 'month';
    static monthNameArKey = 'month_name_ar';
    static monthNameEnKey = 'month_name_en';
    static dayKey = 'day';
    static yearOfOccurrenceKey = 'year_of_occurrence';
    static nameKey = 'name';
    static nameEnKey = 'name_en';
    static descriptionKey = 'description';
    static importanceKey = 'importance';
    static typeArKey = 'type_ar';
    static typeEnKey = 'type_en';
}

class Events {
    constructor() {
        this.events = [];
    }

    async initEvents() {
        try {
            const data = await fs.promises.readFile('events.json', 'utf8');
            const json = JSON.parse(data);
            const list = json['islamic_events'];
            this.events = list.map(e => new Event(e));
        } catch (err) {
            console.error('Error reading or parsing events.json:', err);
        }
    }
}

async function main() {
    const events = new Events();
    await events.initEvents();
    events.events.forEach(e => {
        console.log(`يوم ${e.day} ${e.monthNameAr} - ${e.name}`);
    });
}

main();
