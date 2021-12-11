import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'kanban-board-angular12-firebase';

    constructor(private bo: BreakpointObserver) {

        this.bo.observe(Breakpoints.Handset).subscribe(console.log);

    }

}
