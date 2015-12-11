import { Component } from 'angular2/angular2';
import { SampleComponent } from '../components/sample_component';

@Component({
    directives: [ SampleComponent ],
    styles: [`

    `],
    template: `
        <div>product page</div>
        <sample></sample>
    `
})
export class ProductPage {

}
