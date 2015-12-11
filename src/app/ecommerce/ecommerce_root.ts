import { Component } from 'angular2/angular2';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { HomePage } from './pages/ecommerce_home_page';
import { ProfilePage } from './pages/profile_page';
import { ProductPage } from './pages/product_page';

@Component({
    selector: 'app',
    directives: [ ROUTER_DIRECTIVES ],
    styles: [`

    `],
    template: `
        <main>
            <router-outlet></router-outlet>
        </main>
    `
})
@RouteConfig([
    { path: '/', component: HomePage, as: 'Home' },
    { path: '/profile', component: ProfilePage, as: 'Profile' },
    { path: '/product', component: ProductPage, as: 'Product' }
])
export class EcommerceRoot {
  
}
