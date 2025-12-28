<?php

class Event {
    public $id;
    public $month;
    public $monthNameAr;
    public $monthNameEn;
    public $day;
    public $yearOfOccurrence;
    public $name;
    public $nameEn;
    public $description;
    public $importance;
    public $typeAr;
    public $typeEn;

    const ID_KEY = 'id';
    const MONTH_KEY = 'month';
    const MONTH_NAME_AR_KEY = 'month_name_ar';
    const MONTH_NAME_EN_KEY = 'month_name_en';
    const DAY_KEY = 'day';
    const YEAR_OF_OCCURRENCE_KEY = 'year_of_occurrence';
    const NAME_KEY = 'name';
    const NAME_EN_KEY = 'name_en';
    const DESCRIPTION_KEY = 'description';
    const IMPORTANCE_KEY = 'importance';
    const TYPE_AR_KEY = 'type_ar';
    const TYPE_EN_KEY = 'type_en';

    public function __construct($json) {
        $this->id = $json[self::ID_KEY] ?? null;
        $this->month = $json[self::MONTH_KEY] ?? null;
        $this->monthNameAr = $json[self::MONTH_NAME_AR_KEY] ?? null;
        $this->monthNameEn = $json[self::MONTH_NAME_EN_KEY] ?? null;
        $this->day = $json[self::DAY_KEY] ?? null;
        $this->yearOfOccurrence = $json[self::YEAR_OF_OCCURRENCE_KEY] ?? null;
        $this->name = $json[self::NAME_KEY] ?? null;
        $this->nameEn = $json[self::NAME_EN_KEY] ?? null;
        $this->description = $json[self::DESCRIPTION_KEY] ?? null;
        $this->importance = $json[self::IMPORTANCE_KEY] ?? null;
        $this->typeAr = $json[self::TYPE_AR_KEY] ?? null;
        $this->typeEn = $json[self::TYPE_EN_KEY] ?? null;
    }
}

class Events {
    public $events = [];

    public function initEvents() {
        try {
            $content = file_get_contents('events.json');
            if ($content === false) {
                throw new Exception("Unable to read file");
            }
            $json = json_decode($content, true);
            if ($json === null) {
                throw new Exception("Error parsing JSON");
            }
            $list = $json['islamic_events'];
            foreach ($list as $item) {
                $this->events[] = new Event($item);
            }
        } catch (Exception $e) {
            echo 'Error reading or parsing events.json: ',  $e->getMessage(), "\n";
        }
    }
}

if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    $events = new Events();
    $events->initEvents();
    foreach ($events->events as $e) {
        echo "يوم {$e->day} {$e->monthNameAr} - {$e->name}\n";
    }
}

?>
