import { Component, Input } from "@angular/core";

@Component({
    selector: "app-spinner",
    templateUrl: "./spinner.component.html",
    styleUrls: ["./spinner.component.scss"]
})
export class SpinnerComponent {
    @Input() size: string = "1rem";
}
