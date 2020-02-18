class commonFunction {

    getDateTime($utcTime, $format= 'YYYY-MM-DD H:i:s') {
        var convertedDate = "";
        if($utcTime !== undefined && $utcTime !== "") {
            let newDate = new Date($utcTime);
            let getDay = newDate.getDate();
            getDay = (getDay < 10) ? '0' + getDay : getDay;
            let getYear = newDate.getFullYear();            
            let getMonth = newDate.getMonth();
            getMonth = (getMonth < 10) ? '0' + getMonth : getMonth;
            let getHour = newDate.getHours();
            getHour = (getHour < 10) ? '0' + getHour : getHour;
            let getMinutes = newDate.getMinutes();
            getMinutes = (getMinutes < 10) ? '0' + getMinutes : getMinutes;
            let getSeconds = newDate.getSeconds();
            getSeconds = (getSeconds < 10) ? '0' + getSeconds : getSeconds;
            if($format === 'YYYY-MM-DD H:i:s')
                convertedDate = getYear+'-'+getMonth+'-'+getDay+' '+getHour+':'+getMinutes+':'+getSeconds;
            else if($format === 'YYYY/MM/DD H:i:s')
                convertedDate = getYear+'/'+getMonth+'/'+getDay+' '+getHour+':'+getMinutes+':'+getSeconds;
            else if($format === 'MM/DD/YYYY H:i:s')
                convertedDate = getMonth+'/'+getDay+'/'+getYear+' '+getHour+':'+getMinutes+':'+getSeconds;
            else if($format === 'DD/MM/YYYY H:i:s')
                convertedDate = getDay+'/'+getMonth+'/'+getYear+' '+getHour+':'+getMinutes+':'+getSeconds;

        }
        return convertedDate;
    }
    getDate($utcTime, $format= 'YYYY-MM-DD') {
        var convertedDate = "";
        if($utcTime !== undefined && $utcTime !== "") {
            let newDate = new Date($utcTime);
            let getDay = newDate.getDate();
            getDay = (getDay < 10) ? '0' + getDay : getDay;
            let getYear = newDate.getFullYear();            
            let getMonth = newDate.getMonth();
            getMonth = (getMonth < 10) ? '0' + getMonth : getMonth;
            let getHour = newDate.getHours();
            getHour = (getHour < 10) ? '0' + getHour : getHour;
            let getMinutes = newDate.getMinutes();
            getMinutes = (getMinutes < 10) ? '0' + getMinutes : getMinutes;
            let getSeconds = newDate.getSeconds();
            getSeconds = (getSeconds < 10) ? '0' + getSeconds : getSeconds;
            if($format === 'YYYY-MM-DD')
                convertedDate = getYear+'-'+getMonth+'-'+getDay;
            else if($format === 'YYYY/MM/DD')
                convertedDate = getYear+'/'+getMonth+'/'+getDay;
            else if($format === 'MM/DD/YYYY')
                convertedDate = getMonth+'/'+getDay+'/'+getYear;
            else if($format === 'DD/MM/YYYY')
                convertedDate = getDay+'/'+getMonth+'/'+getYear;

        }
        return convertedDate;
    }
}

export default new commonFunction();
