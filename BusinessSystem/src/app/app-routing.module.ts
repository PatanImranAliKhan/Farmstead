import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AgrisigninComponent } from './components/agrisignin/agrisignin.component';
import { AquasigninComponent } from './components/aquasignin/aquasignin.component';
import { CitizensigninComponent } from './components/citizensignin/citizensignin.component';
import { AgricultureComponent } from './components/agriculture/agriculture.component';
import { AquacultureComponent } from './components/aquaculture/aquaculture.component';
import { CitizenComponent } from './components/citizen/citizen.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SellagrigoodsComponent } from './components/sellagrigoods/sellagrigoods.component';
import { BuyagrigoodsComponent } from './components/buyagrigoods/buyagrigoods.component';
import { SellaquaproductsComponent } from './components/sellaquaproducts/sellaquaproducts.component';
import { BuyaquaproductsComponent } from './components/buyaquaproducts/buyaquaproducts.component';
import { AgricommerceComponent } from './components/agricommerce/agricommerce.component';
import { AquacommerceComponent } from './components/aquacommerce/aquacommerce.component';
import { AgritransportComponent } from './components/agritransport/agritransport.component';
import { AquatransportComponent } from './components/aquatransport/aquatransport.component';
import { WatersupplyComponent } from './components/watersupply/watersupply.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';


import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path:'about', component:  AboutComponent},
  {path: 'contact', component:  ContactComponent},
  {path: 'login/:type', component: LoginComponent},
  {path: 'signin/agriculture', component: AgrisigninComponent},
  {path: 'signin/aquaculture', component: AquasigninComponent},
  {path: 'signin/citizen', component: CitizensigninComponent},
  {path: 'agriculture', component: AgricultureComponent, canActivate: [AuthGuard]},
  {path: 'aquaculture', component: AquacultureComponent, canActivate: [AuthGuard]},
  {path: 'citizen', component: CitizenComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'sellagriproduct', component: SellagrigoodsComponent, canActivate: [AuthGuard]},
  {path: 'buyagriproduct', component: BuyagrigoodsComponent, canActivate: [AuthGuard]},
  {path: 'sellaquaproduct', component: SellaquaproductsComponent, canActivate: [AuthGuard]},
  {path: 'buyaquaproduct', component: BuyaquaproductsComponent, canActivate: [AuthGuard]},
  {path: 'agricommerce', component: AgricommerceComponent, canActivate: [AuthGuard]},
  {path: 'aquacommerce', component: AquacommerceComponent, canActivate: [AuthGuard]},
  {path: 'agritransport', component: AgritransportComponent, canActivate: [AuthGuard]},
  {path: 'aquatransport', component: AquatransportComponent, canActivate: [AuthGuard]},
  {path: 'watersupply', component: WatersupplyComponent, canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponent=[HomeComponent, AboutComponent, ContactComponent, LoginComponent,
                                AgrisigninComponent, AquasigninComponent, CitizensigninComponent, WatersupplyComponent,
                                AgricultureComponent, AquacultureComponent, CitizenComponent, ProfileComponent,
                                SellagrigoodsComponent, BuyagrigoodsComponent, SellaquaproductsComponent, BuyaquaproductsComponent,
                                AgricommerceComponent, AquacommerceComponent, AgritransportComponent, AquatransportComponent,
                                CartComponent, OrderComponent, AdminComponent];
