// import { Date } from 'firebase/firestore';

export const getDateByDefaultFormat = (date: string): string => {
    if (!date) {
        return 'Unknown date';
    }


    

    return date?.toString();
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
