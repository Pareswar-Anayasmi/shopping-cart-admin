import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faHamburger,
  faHeart,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  template: `
    <header
      class="w-full py-4 top-0 fixed bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 z-50 border-b border-b-base-300"
    >
      <div class="max-w-7xl px-6 mx-auto flex items-center justify-between">
        <div class="flex items-center gap-x-5">
          <a
            class="flex items-center gap-x-3 text-xl btn btn-ghost group"
            routerLink="/home"
          >
            <fa-icon
              class="group-hover:text-primary"
              [icon]="faShoppingBag"
            ></fa-icon>
            <span >Shopzo-Admin</span>
          </a>
          <div class="items-center gap-x-5 hidden lg:flex">
            <!-- <a
              routerLink="/home"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              class="hover:underline transition-all"
              >All</a
            > -->
            <!-- <a
              routerLink="/men-clothing"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              class="hover:underline transition-all"
              >Men</a
            > -->
            <!-- <a
              routerLink="/women-clothing"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              class="hover:underline transition-all"
              >Women</a
            > -->
            <!-- <a
              routerLink="/jewelry"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              class="hover:underline transition-all"
              >Jewelry</a
            > -->
            <!-- <a
              routerLink="/electronics"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              class="hover:underline transition-all"
              >Electronics</a
            > -->
          </div>
        </div>
        <div class="hidden lg:flex items-center gap-x-2">
          <!-- <a
            routerLink="/favorite-items"
            class="btn btn-ghost"
            routerLinkActive="bg-primary text-white"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <fa-icon [icon]="faHeart"></fa-icon>
          </a>
          <a
            routerLink="/shopping-cart"
            class="btn btn-ghost relative"
            routerLinkActive="bg-primary text-white"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <fa-icon [icon]="faCartShopping"></fa-icon>
            @if (cartItemQuantity() >= 1) {
            <div class="absolute -top-2 -right-2 badge badge-primary badge-sm">
              {{ cartItemQuantity() }}
            </div>
            }
          </a> -->

          <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost text-lg font-semibold"
          >
            Admin
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[1]"
          >
            <!-- <li><a routerLink="/profile">Profile</a></li> -->
            <li><a routerLink="/orders">Orders</a></li>
            <li><a (click)="logout()">Logout</a></li>
          </ul>
        </div>


            <label class="swap swap-rotate">
              <input type="checkbox" [checked]="isDarkTheme" (change)="toggleTheme()" />

              <!-- Sun icon -->
              <svg
                class="swap-on fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5.64,17.66L4.22,19.07L2.81,17.66L4.22,16.24M1,13H3V11H1M11,1H13V3H11M19.07,4.22L17.66,5.64L16.24,4.22L17.66,2.81M21,11V13H23V11M13,21H11V23H13M16.24,19.07L17.66,17.66L19.07,19.07L17.66,20.49M12,8A4,4 0 1,0 16,12A4,4 0 0,0 12,8Z"
                />
              </svg>

              <!-- Moon icon -->
              <svg
                class="swap-off fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12,2A10,10 0 0,1 22,12C22,16.42 19.14,20.17 15,21.45C12.81,21.92 10.48,21.44 8.6,20.11C4.93,17.47 3.5,12.44 5.56,8.44C7.24,5.15 10.87,2.95 14.5,3.09C14.33,2.71 14.17,2.35 14,2C13.38,1.9 12.7,1.83 12,1.83C11.31,1.83 10.63,1.9 10,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                />
              </svg>
            </label>

        </div>
        <div class="block lg:hidden dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">
            <fa-icon [icon]="faHamburger"></fa-icon>
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a
                routerLink="/home"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >All</a
              >
            </li>
            <li>
              <a
                routerLink="/men-clothing"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >Men</a
              >
            </li>
            <li>
              <a
                routerLink="/women-clothing"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >Women</a
              >
            </li>
            <li>
              <a
                routerLink="/jewelry"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >Jewelry</a
              >
            </li>
            <li>
              <a
                routerLink="/electronics"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >Electronics</a
              >
            </li>
            <li>
              <a
                routerLink="/favorite-items"
                routerLinkActive="bg-primary"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >Favorite</a
              >
            </li>
            <li>
              <a
                routerLink="/shopping-cart"
                routerLinkActive="bg-primary"
                [routerLinkActiveOptions]="{ exact: true }"
                class="relative hover:underline transition-all"
                >Shopping Cart @if (cartItemQuantity() >= 1) {
                <div
                  class="absolute -top-2 -right-2 badge badge-primary badge-sm"
                >
                  {{ cartItemQuantity() }}
                </div>
                }
              </a>
            </li>

            <li>
              <a routerLink="/orders"
                routerLinkActive="bg-primary"
                [routerLinkActiveOptions]="{ exact: true }"
                class="relative hover:underline transition-all"
                >Orders
              </a>
            </li>


            <li>
              <a
              (click)="logout()"
                routerLinkActive="bg-primary"
                [routerLinkActiveOptions]="{ exact: true }"
                class="relative hover:underline transition-all"
                >Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  `,
  styles: `
    .active-link {
    color: "#d1d5dc";
    text-decoration: underline;
  }
  `,
})

export class HeaderComponent {
  private readonly shoppingCartLocalStorageService = inject(
    ShoppingCartLocalStorageService
  );

   constructor( private router: Router) {
      
    }

  faCartShopping = faCartShopping;
  faShoppingBag = faShoppingBag;
  faHamburger = faHamburger;
  faHeart = faHeart;
  isDarkTheme = false;

ngOnInit() {
  const storedTheme = localStorage.getItem('theme') || 'dark';
  this.isDarkTheme = storedTheme === 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);
}

toggleTheme() {
  window.location.reload();
  this.isDarkTheme = !this.isDarkTheme;
  const newTheme = this.isDarkTheme ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

  cartItemQuantity = computed(() =>
    this.shoppingCartLocalStorageService.cartItemQuantity()
  );

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}


