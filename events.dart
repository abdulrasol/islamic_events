import 'dart:convert';
import 'dart:io';

class Event {
  late final int id;
  late final int month;
  late final String monthNameAr;
  late final String monthNameEn;
  late final int day;
  late final int? yearOfOccurrence;
  late final String name;
  late final String nameEn;
  late final String description;
  late final String importance;
  late final String typeAr;
  late final String typeEn;

  Event(Map json) {
    id = json[idKey];
    month = json[monthKey];
    monthNameAr = json[monthNameArKey];
    monthNameEn = json[monthNameEnKey];
    day = json[dayKey];
    yearOfOccurrence = json[yearOfOccurrenceKey];
    name = json[nameKey];
    nameEn = json[nameEnKey];
    description = json[descriptionKey];
    importance = json[importanceKey];
    typeAr = json[typeArKey];
    typeEn = json[typeEnKey];
  }

  static const String idKey = 'id';
  static const String monthKey = 'month';
  static const String monthNameArKey = 'month_name_ar';
  static const String monthNameEnKey = 'month_name_en';
  static const String dayKey = 'day';
  static const String yearOfOccurrenceKey = 'year_of_occurrence';
  static const String nameKey = 'name';
  static const String nameEnKey = 'name_en';
  static const String descriptionKey = 'description';
  static const String importanceKey = 'importance';
  static const String typeArKey = 'type_ar';
  static const String typeEnKey = 'type_en';
}

class Events {
  late final List<Event> events;

  Events() {
    //    events = _readEvents();
  }

  Future<void> initEvents() async {
    final File file = File('events.json');
    final content = await file.readAsString();
    final json = jsonDecode(content);
    final List list = json['islamic_events'];
    events = list.map((e) => Event(e)).toList();
  }
}

void main(List<String> args) async {
  // final File file = File('events.json');
  // final content = await file.readAsString();
  // final json = jsonDecode(content);
  // final List list = json['islamic_events'];
  // final events = list.map((e) => Event(e)).toList();
  // events.forEach((e) => print(e.name));
  final events = Events();
  await events.initEvents();
  events.events.forEach((e) => print('يوم ${e.day} ${e.monthNameAr} - ${e.name}'));
}
