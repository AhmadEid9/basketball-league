import { parse, isValid } from 'date-fns';

const isValidDateTime = (dateTime) => {
    const parsedDate = parse(dateTime, "dd:MM:yyyy HH:mm:ss", new Date());
    return isValid(parsedDate);
}

export default isValidDateTime;