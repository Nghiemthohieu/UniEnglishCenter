import { Human } from "./getAllHuman";
import { Shift } from "./shift";

export interface GetCalendarEvent {
    title: string;
    start: Date;
    end: Date;
  };

export interface WordCalendar {
  ID: number; // từ gorm.Model
  human?: Human | null;
  date_word: string; // util.DateOnly có thể map thành chuỗi yyyy-mm-dd
  shift?: Shift | null;
}

export interface GetWordCalendar{
  data: WordCalendar[];
}

export interface CreateWordCalendar {
  ID: number;
  id_human: number;
  date_word: string;
  id_shift: number;
}