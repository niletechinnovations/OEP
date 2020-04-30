class commonFunction {

    getDateTime($utcTime, $format= 'YYYY-MM-DD H:i:s') {
        var convertedDate = "";
        if($utcTime !== undefined && $utcTime !== "") {
            let newDate = new Date($utcTime);
            let getDay = newDate.getDate();
            getDay = (getDay < 10) ? '0' + getDay : getDay;
            let getYear = newDate.getFullYear();            
            let getMonth = newDate.getMonth();
            getMonth = getMonth + 1;
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
    getDate($utcTime, $format= 'MM/DD/YYYY') {
        var convertedDate = "";
        if($utcTime !== undefined && $utcTime !== "") {
            let newDate = new Date($utcTime);
            let getDay = newDate.getDate();
            getDay = (getDay < 10) ? '0' + getDay : getDay;
            let getYear = newDate.getFullYear();            
            let getMonth = newDate.getMonth();
            getMonth = getMonth + 1;
            getMonth = (getMonth < 10) ? '0' + getMonth : getMonth;
           
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

    convertTime(callDuration) {
        if(callDuration === undefined || callDuration < 0)
            return `0 seconds`;
        let delta = Math.ceil(callDuration);

        // calculate (and subtract) whole hours
        let hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        let seconds = delta % 60;

        if(hours > 0 && minutes > 0 && seconds > 0 )
          return `${hours} hours ${minutes} minutes ${seconds} seconds`;
        else if(minutes > 0 && seconds > 0 )
          return `${minutes} minutes ${seconds} seconds`;
        else if(seconds > 0 )
          return `${seconds} seconds`;
        else 
          return `0 seconds`;
    }
}

export default new commonFunction();
