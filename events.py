import json
import os

class Event:
    id_key = 'id'
    month_key = 'month'
    month_name_ar_key = 'month_name_ar'
    month_name_en_key = 'month_name_en'
    day_key = 'day'
    year_of_occurrence_key = 'year_of_occurrence'
    name_key = 'name'
    name_en_key = 'name_en'
    description_key = 'description'
    importance_key = 'importance'
    type_ar_key = 'type_ar'
    type_en_key = 'type_en'

    def __init__(self, data):
        self.id = data.get(self.id_key)
        self.month = data.get(self.month_key)
        self.month_name_ar = data.get(self.month_name_ar_key)
        self.month_name_en = data.get(self.month_name_en_key)
        self.day = data.get(self.day_key)
        self.year_of_occurrence = data.get(self.year_of_occurrence_key)
        self.name = data.get(self.name_key)
        self.name_en = data.get(self.name_en_key)
        self.description = data.get(self.description_key)
        self.importance = data.get(self.importance_key)
        self.type_ar = data.get(self.type_ar_key)
        self.type_en = data.get(self.type_en_key)

class Events:
    def __init__(self):
        self.events = []

    def init_events(self):
        try:
            with open('events.json', 'r', encoding='utf-8') as f:
                content = f.read()
                data = json.loads(content)
                event_list = data['islamic_events']
                self.events = [Event(e) for e in event_list]
        except Exception as e:
            print(f"Error reading or parsing events.json: {e}")

if __name__ == "__main__":
    events = Events()
    events.init_events()
    for e in events.events:
        print(f"يوم {e.day} {e.month_name_ar} - {e.name}")
