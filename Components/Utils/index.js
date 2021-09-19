import React from 'react'

const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const longMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
const shortMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
const february = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];

export const getDaysInMonth = (monthNumber) => {
    if (monthNumber === '1' | monthNumber === '3' | monthNumber === '5' | monthNumber === '7' | monthNumber === '8' | monthNumber === '10' | monthNumber === '12') {
        return longMonth;
    } else if ( monthNumber === '4'  | monthNumber === '6'  | monthNumber === '9'  | monthNumber === '11') {
        return shortMonth;
    } else return february;
}

export const getMonthName = (monthNumber) => {
    return monthName[monthNumber - 1];
}

export const getMonthArray = () => {
    return monthName;
}