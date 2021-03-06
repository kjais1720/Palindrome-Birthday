
let reverseString = str =>{
    str = str.split('').reverse().join('')
    return str;
}

let getAllDateFormats = date =>{
    let ddmmyyyy= date.day+date.month+date.year;
    let mmddyyyy= date.month+date.day+date.year;
    let yyyymmdd= date.year+date.month+date.day;
    let ddmmyy= date.day+date.month+date.year.slice(2);
    let mmddyy= date.month+date.day+date.year.slice(2);
    let yyddmm= date.year.slice(2)+date.day+date.month;
    return {'ddmmyyyy':ddmmyyyy,'mmddyyyy':mmddyyyy,'yyyymmdd':yyyymmdd,'ddmmyy':ddmmyy,'mmddyy':mmddyy,'yyddmm':yyddmm};
}

let getStringDate = date =>{
    if(date.day<10 && date.day.length<2){
        date.day = '0'+date.day;
    } else{
        date.day = String(date.day);
    }
    if(date.month<10 && date.month.length<2){
        date.month = '0'+date.month;
    }else{
        date.month = String(date.month);
    }
    date.year = String(date.year);

    return date;

}

let checkPalindromeForAllDateFormats = date =>{
    date = getStringDate(date);
    const dateFormats = getAllDateFormats(date);
    let reversedDate;
    let result =[];
    for (const dateFormat in dateFormats) {
        reversedDate = reverseString(dateFormats[dateFormat]);
        if(reversedDate == dateFormats[dateFormat]){
            result.push([dateFormat,dateFormats[dateFormat]]);
        }
    }
    return result;
}

let isLeapYear = year =>{
    if(year % 400 === 0) return true;
    if(year % 4 === 0 && year % 100 != 0) return true;
    return false;
}

let getNextDate = date => {
    let day = Number(date.day)+1;
    let month = date.month;
    let year = date.year;
    const daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(day > daysInMonths[month-1]){
        if(month===2){
            if(isLeapYear(year)){
                if(day>29){
                    day = 1;
                    month = 3;
                }
            } else{
                day = 1;
                month = 3;
            }
        } else{
            day = 1;
            month++;
            if(month>12){
                month = 1;
                year++;
            }
        }
    }
    return {day:day,month:month,year:year};
}

let getPrevDate = date =>{
    let day = Number(date.day)-1;
    let month = date.month;
    let year = date.year;
    const daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(day < 1){
        if(month===3){
            if(isLeapYear(year)){
                day = 29;
                month = 2;
            } else{
                day = 28;
                month = 2;
            }
        } else{
            day = daysInMonths[month-2];
            month--;
            if(month<1){
                day=31;
                month = 12;
                year--;
            }
        }
    }
    return {day:day,month:month,year:year};
}

let findNextPalindrome = date =>{
    let counter = 1;
    let palindromeDates;
    let nextDate;
    nextDate = getNextDate(date);
    while(1){  
        palindromeDates = checkPalindromeForAllDateFormats(nextDate)
        if(palindromeDates.length>0){
            return [counter,nextDate,palindromeDates];
        }
        counter++;
        nextDate = getNextDate(nextDate);
    }
}

let findPrevPalindrome = date => {
    let counter = 1;
    let prevDate;
    prevDate = getPrevDate(date);
    let palindromeDates;
    while(1){
        palindromeDates = checkPalindromeForAllDateFormats(prevDate)
        if(palindromeDates.length>0){
            return [counter,prevDate,palindromeDates];
        }
        counter++;
        prevDate = getPrevDate(prevDate);
    }
}

let destructureInputDate = date =>{
    let result;
    const [year,month,day] = date.split('-')
    return {day:day, month:month, year:year}
}

let returnFormattedDate = date => {
    date = getStringDate(date)
    return date.day+'-'+date.month+'-'+date.year;
}

let clickHandler = () => {
    const bdateInput = document.querySelector('input');
    const output = document.querySelector('#result');
    const bdate = destructureInputDate(bdateInput.value);
    
    if(bdateInput.value !== ''){
           
        if(checkPalindromeForAllDateFormats(bdate).length>0){
            output.innerHTML = `Yay! Your birthday is a palindrome.`
        } else{
            const [counter1, prevPalindrome, dateAndFormat1] = findPrevPalindrome(bdate);
            const [counter2, nextPalindrome, dateAndFormat2] = findNextPalindrome(bdate);

            if(counter1<counter2){
                output.innerText = `The nearest palindrome date was ${returnFormattedDate(prevPalindrome)} ( ${dateAndFormat1[0][1]} in ${dateAndFormat1[0][0]} format ) . You missed it by ${counter1} days.`
            } else{
                output.innerText = `The nearest palindrome date is ${returnFormattedDate(nextPalindrome)} ( ${dateAndFormat2[0][1]} in ${dateAndFormat2[0][0]} format ). You missed it by ${counter2} days.`
            }
        }
    }
}