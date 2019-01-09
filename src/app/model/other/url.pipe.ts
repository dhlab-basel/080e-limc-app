import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "url"
})
export class UrlPipe implements PipeTransform {
    transform(url: string, args?: any): string {
        return url.startsWith("http") === false ? "http://" + url : url;
    }
}
