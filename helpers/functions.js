require('dotenv').config({ path: './variables.env' });


exports.generatePassword = async (length) => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

exports.generateNummericString = async (length) => {
    let nummeric = "";
    const possible = "123456789";
    for (var i = 0; i < length; i++) {
        nummeric += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return nummeric;
}

exports.generateOtp = async (length=6) => {
    let nummeric = "";
    const possible = "123456789";
    for (var i = 0; i < length; i++) {
        nummeric += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return nummeric;
}

exports.getTimeZonedDateString = async (time_zone_id, increment_if_needed) => {
    let inputDate = new Date().toLocaleString("en-US", { timeZone: time_zone_id })
    let DATE = new Date(inputDate),
        month = '' + (DATE.getMonth() + 1),
        day = '' + (DATE.getDate() + increment_if_needed),
        year = DATE.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

exports.getTimeZonedHourAndMinutesValue = async (time_zone_id) => {
    let inputDate = new Date().toLocaleString("en-US", { timeZone: time_zone_id })
    let DATE = new Date(inputDate),
        hour = (DATE.getHours()),
        minutes = (DATE.getMinutes());
    hour = hour.toString()
    minutes = minutes.toString()
    if (hour.length < 2)
        hour = `0${hour}`;
    if (minutes.length < 2)
        minutes = `0${minutes}`;
    let hourMinuteString = `${hour}${minutes}`;
    let hourMinuteValue = hourMinuteString * 1;
    return hourMinuteValue
}