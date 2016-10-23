import moment from "moment"; 
export class DateFormatValueConverter {
    toView(value, format) {
        if(!value) {
            return "N/A";
        }
        if(!format) {
            format = "MM/DD/YYYY";
        }
        return moment(value).format(format);
    }
    fromView(value) {
        return moment(value).toDate();
    }
}