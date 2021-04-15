import { NewDiaryEntry, Visibility, Weather } from "./types";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */


const toNewDiaryEntry = (obj: any): NewDiaryEntry => {
    return {
        comment: parseComment(obj.comment),
        date: parseDate(obj.date),
        visibility: parseVisibility(obj.visibility),
        weather: parseWeather(obj.weather)
    };
};

const parseComment = (comment: any): string => {
    if (!comment || !isString(comment)) {
        throw new Error("Comment is invalid.");
    }
    return comment;
};

const isDate = (date: string): boolean =>  {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Date is invalid.");
    }
    return date;
};

const isString = (param: any): param is  string => {
    return typeof param === 'string' || param instanceof String;
} ;

const parseWeather = (weather: any): Weather =>  {
    if (!weather || !isWeather(weather)) {
        throw new Error("Weather is invalid.");
    }
    return weather;
};

const isWeather = (param: any): param is Weather => {
    return Object.values(Weather).includes(param);
};

const parseVisibility = (visibility: any): Visibility => {
    if (!visibility || !isVisibility(visibility)) {
        throw new Error("Visibility is invalid.");
    }
    return visibility;
};

const isVisibility = (param: any): param is Visibility => {
    return Object.values(Visibility).includes(param);
};

export default toNewDiaryEntry;