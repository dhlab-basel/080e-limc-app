import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "date"
})
export class DatePipe implements PipeTransform {

    transform(dates: string[], args?: any): string {

        if (dates === null) return "";

        switch (dates.length) {

            case 2:
                if (dates[0] === "" && dates[1] === "") return "";
                return dates[0] + " – " + dates[1];
            case 1:
                return dates[0];
            default:
                return dates.join("");

        }

    }

}
