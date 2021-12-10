import fs from 'fs';
export const stringToNumbersArray = (text) => text.split('\n').map(el => parseInt(el, 10));
export const readInputFromPath = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data.toString();
    }
    catch (e) {
        console.error('Error:', { e });
    }
    return '';
};
