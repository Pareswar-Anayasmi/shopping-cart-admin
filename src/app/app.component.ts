import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { themeChange } from 'theme-change';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule],
  template: `
  
    <main class="h-full">
      <router-outlet />
    </main>
  `,
})
export class AppComponent implements OnInit {
  title = 'Angular E-Commerce Template';

  ngOnInit(): void {
    themeChange(false);
  }
}
