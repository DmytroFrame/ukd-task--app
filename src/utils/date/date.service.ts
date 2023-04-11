// import { Date } from 'firebase/firestore';

export const getDateByDefaultFormat = (date: string | Date): string => {
    if (!date) {
        return 'Unknown date';
    }
    date = new Date(date);

    var dateStr =
        ('00' + (date.getMonth() + 1)).slice(-2) +
        '.' +
        ('00' + date.getDate()).slice(-2) +
        '.' +
        date.getFullYear() +
        ' ' +
        ('00' + date.getHours()).slice(-2) +
        ':' +
        ('00' + date.getMinutes()).slice(-2) 

    return dateStr;
};

export const convertDateToDate = (date: string): Date => {
    return new Date(date);
};

export const getAge = (date: string): string => {
    if (!date) {
        return 'Unknown';
    }

    return date.toString();
};
