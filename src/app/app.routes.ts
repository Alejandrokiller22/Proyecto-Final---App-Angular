import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { PortfolioComponent } from './pages/portfolio/portfolio';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/home' }
];
