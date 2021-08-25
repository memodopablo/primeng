import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { AppConfigService } from './service/appconfigservice';
import { VersionService } from './service/versionservice';
import { AppConfig } from './domain/appconfig';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  template: `
    <div class="layout-topbar">
      <a class="menu-button" (click)="onMenuButtonClick($event)">
        <i class="pi pi-bars"></i>
      </a>
      <div class="app-theme" [pTooltip]="config.theme" tooltipPosition="bottom">
        <img [src]="'assets/showcase/images/themes/' + logoMap[config.theme]" />
      </div>
      <ul #topbarMenu class="topbar-menu">
        <li><a [routerLink]="['/setup']">Get Started</a></li>
        <li class="topbar-submenu">
          <a tabindex="0" (click)="toggleMenu($event, 0)">Themes</a>
          <ul
            [@overlayMenuAnimation]="'visible'"
            *ngIf="activeMenuIndex === 0"
            (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)"
          >
            <li class="topbar-submenu-header">THEMING</li>
            <li>
              <a [routerLink]="['/theming']"><i class="pi pi-fw pi-file"></i><span>Guide</span></a>
            </li>
            <li>
              <a href="https://www.primefaces.org/designer/primeng"
                ><i class="pi pi-fw pi-palette"></i><span>Designer</span></a
              >
            </li>
            <li>
              <a href="https://www.primefaces.org/designer-ng"
                ><i class="pi pi-fw pi-desktop"></i><span>Visual Editor</span></a
              >
            </li>
            <li>
              <a [routerLink]="['/icons']"
                ><i class="pi pi-fw pi-info-circle"></i><span>Icons</span></a
              >
            </li>
            <li>
              <a href="https://www.figma.com/community/file/890589747170608208"
                ><i class="pi pi-fw pi-pencil"></i><span>Figma UI Kit</span></a
              >
            </li>

            <li class="topbar-submenu-header">Memodo</li>
            <li>
              <a (click)="changeTheme($event, 'memodo', false)"><span>Custom theme</span></a>
            </li>
          </ul>
        </li>
        <li class="topbar-submenu">
          <a tabindex="0" (click)="toggleMenu($event, 1)">Templates</a>
          <ul
            [@overlayMenuAnimation]="'visible'"
            *ngIf="activeMenuIndex === 1"
            (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)"
          >
            <li class="topbar-submenu-header">PREMIUM ADMIN TEMPLATES</li>
            <li>
              <a href="https://www.primefaces.org/layouts/atlantis-ng">
                <img alt="Atlantis" src="assets/showcase/images/layouts/atlantis-logo.svg" />
                <span>Atlantis</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/ultima-ng">
                <img alt="Ultima" src="assets/showcase/images/layouts/ultima-logo.png" />
                <span>Ultima</span><span class="theme-badge material">material</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/freya-ng">
                <img alt="Freya" src="assets/showcase/images/layouts/freya-logo.png" />
                <span>Freya</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/poseidon-ng">
                <img alt="Poseidon" src="assets/showcase/images/layouts/poseidon-logo.svg" />
                <span>Poseidon</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/diamond-ng">
                <img alt="Diamond" src="assets/showcase/images/layouts/diamond-logo.png" />
                <span>Diamond</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/mirage-ng">
                <img alt="Mirage" src="assets/showcase/images/layouts/mirage-logo.png" />
                <span>Mirage</span><span class="theme-badge bootstrap">bootstrap</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/prestige-ng">
                <img alt="Prestige" src="assets/showcase/images/layouts/prestige-logo.png" />
                <span>Prestige</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/sapphire-ng">
                <img alt="Sapphire" src="assets/showcase/images/layouts/sapphire-logo.png" />
                <span>Sapphire</span><span class="theme-badge material">material</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/roma-ng">
                <img alt="Roma" src="assets/showcase/images/layouts/roma-logo.png" />
                <span>Roma</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/babylon-ng">
                <img alt="Babylon" src="assets/showcase/images/layouts/babylon-logo.png" />
                <span>Babylon</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/olympia-ng">
                <img alt="Olympia" src="assets/showcase/images/layouts/olympia-logo.png" />
                <span>Olympia</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/california-ng">
                <img alt="California" src="assets/showcase/images/layouts/california-logo.png" />
                <span>California</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/ecuador-ng">
                <img alt="Ecuador" src="assets/showcase/images/layouts/ecuador-logo.png" />
                <span>Ecuador</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/harmony-ng">
                <img alt="Harmony" src="assets/showcase/images/layouts/harmony-logo.png" />
                <span>Harmony</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/apollo-ng">
                <img alt="Apollo" src="assets/showcase/images/layouts/apollo-logo.png" />
                <span>Apollo</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/serenity-ng">
                <img alt="Serenity" src="assets/showcase/images/layouts/serenity-logo.png" />
                <span>Serenity</span><span class="theme-badge material">material</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/avalon-ng">
                <img alt="Avalon" src="assets/showcase/images/layouts/avalon-logo.png" />
                <span>Avalon</span><span class="theme-badge bootstrap">bootstrap</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/verona-ng">
                <img alt="Verona" src="assets/showcase/images/layouts/verona-logo.png" />
                <span>Verona</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/manhattan-ng">
                <img alt="Manhattan" src="assets/showcase/images/layouts/manhattan-logo.png" />
                <span>Manhattan</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/paradise-ng">
                <img alt="Paradise" src="assets/showcase/images/layouts/paradise-logo.png" />
                <span>Paradise</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/barcelona-ng">
                <img alt="Barcelona" src="assets/showcase/images/layouts/barcelona-logo.png" />
                <span>Barcelona</span><span class="theme-badge material">material</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/morpheus-ng">
                <img alt="Morpheus" src="assets/showcase/images/layouts/morpheus-logo.png" />
                <span>Morpheus</span>
              </a>
            </li>
            <li>
              <a href="https://www.primefaces.org/layouts/omega-ng">
                <img alt="Omega" src="assets/showcase/images/layouts/omega-logo.png" />
                <span>Omega</span>
              </a>
            </li>
          </ul>
        </li>
        <li class="topbar-submenu">
          <a tabindex="0" (click)="toggleMenu($event, 2)">Resources</a>
          <ul
            [@overlayMenuAnimation]="'visible'"
            *ngIf="activeMenuIndex === 2"
            (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)"
          >
            <li>
              <a href="https://www.primetek.com.tr" target="_blank"><span>About PrimeTek</span></a>
            </li>
            <li>
              <a href="https://www.primefaces.org/store" target="_blank"><span>PrimeStore</span></a>
            </li>
            <li>
              <a href="https://www.primefaces.org/category/primeng/" target="_blank"
                ><span>Blog</span></a
              >
            </li>
            <li>
              <a href="https://forum.primefaces.org/viewforum.php?f=35"><span>Forum</span></a>
            </li>
            <li>
              <a href="https://discord.gg/gzKFYnpmCY"><span>Discord Chat</span></a>
            </li>
            <li>
              <a [routerLink]="['/lts']"><span>LTS</span></a>
            </li>
            <li>
              <a href="https://www.primefaces.org/newsletter" target="_blank"
                ><span>Newsletter</span></a
              >
            </li>
            <li>
              <a href="https://github.com/primefaces/primeng" target="_blank"
                ><span>Source Code</span></a
              >
            </li>
            <li>
              <a [routerLink]="['/support']"><span>Support</span></a>
            </li>
            <li>
              <a href="https://twitter.com/prime_ng?lang=en" target="_blank"
                ><span>Twitter</span></a
              >
            </li>
            <li>
              <a href="https://www.primefaces.org/whouses" target="_blank"><span>Who Uses</span></a>
            </li>
          </ul>
        </li>
        <li class="topbar-submenu">
          <a tabindex="0" (click)="toggleMenu($event, 3)">{{
            versions ? versions[0].version : 'Latest'
          }}</a>
          <ul
            [@overlayMenuAnimation]="'visible'"
            *ngIf="activeMenuIndex === 3"
            (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)"
            style="width:100%"
          >
            <li *ngFor="let v of versions">
              <a [href]="v.url">{{ v.version }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  animations: [
    trigger('overlayMenuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: '*' }))
      ]),
      transition(':leave', [animate('.1s linear', style({ opacity: 0 }))])
    ])
  ]
})
export class AppTopBarComponent implements OnInit, OnDestroy {
  @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('topbarMenu') topbarMenu: ElementRef;

  activeMenuIndex: number;

  outsideClickListener: any;

  config: AppConfig;

  subscription: Subscription;

  logoMap = {
    'bootstrap4-light-blue': 'bootstrap4-light-blue.svg',
    'bootstrap4-light-purple': 'bootstrap4-light-purple.svg',
    'bootstrap4-dark-blue': 'bootstrap4-dark-blue.svg',
    'bootstrap4-dark-purple': 'bootstrap4-dark-purple.svg',
    'md-light-indigo': 'md-light-indigo.svg',
    'md-light-deeppurple': 'md-light-deeppurple.svg',
    'md-dark-indigo': 'md-dark-indigo.svg',
    'md-dark-deeppurple': 'md-dark-deeppurple.svg',
    'mdc-light-indigo': 'md-light-indigo.svg',
    'mdc-light-deeppurple': 'md-light-deeppurple.svg',
    'mdc-dark-indigo': 'md-dark-indigo.svg',
    'mdc-dark-deeppurple': 'md-dark-deeppurple.svg',
    'saga-blue': 'saga-blue.png',
    'saga-green': 'saga-green.png',
    'saga-orange': 'saga-orange.png',
    'saga-purple': 'saga-purple.png',
    'vela-blue': 'vela-blue.png',
    'vela-green': 'vela-green.png',
    'vela-orange': 'vela-orange.png',
    'vela-purple': 'vela-purple.png',
    'arya-blue': 'arya-blue.png',
    'arya-green': 'arya-green.png',
    'arya-orange': 'arya-orange.png',
    'arya-purple': 'arya-purple.png',
    nova: 'nova.png',
    'nova-alt': 'nova-alt.png',
    'nova-accent': 'nova-accent.png',
    'nova-vue': 'nova-vue.png',
    'luna-blue': 'luna-blue.png',
    'luna-green': 'luna-green.png',
    'luna-pink': 'luna-pink.png',
    'luna-amber': 'luna-amber.png',
    rhea: 'rhea.png',
    'fluent-light': 'fluent-light.png',
    'soho-light': 'soho-light.png',
    'soho-dark': 'soho-dark.png',
    'viva-light': 'viva-light.svg',
    'viva-dark': 'viva-dark.svg',
    mira: 'mira.jpg',
    nano: 'nano.jpg'
  };

  versions: any[];

  constructor(
    private router: Router,
    private versionService: VersionService,
    private configService: AppConfigService
  ) {}

  ngOnInit() {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(
      (config) => (this.config = config)
    );
    this.versionService.getVersions().then((data) => (this.versions = data));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeMenuIndex = null;
      }
    });
  }

  onMenuButtonClick(event: Event) {
    this.menuButtonClick.emit();
    event.preventDefault();
  }

  changeTheme(event: Event, theme: string, dark: boolean) {
    let themeElement = document.getElementById('theme-link');
    themeElement.setAttribute(
      'href',
      themeElement.getAttribute('href').replace(this.config.theme, theme)
    );
    this.configService.updateConfig({ ...this.config, ...{ theme, dark } });
    this.activeMenuIndex = null;
    event.preventDefault();
  }

  bindOutsideClickListener() {
    if (!this.outsideClickListener) {
      this.outsideClickListener = (event) => {
        if (this.isOutsideTopbarMenuClicked(event)) {
          this.activeMenuIndex = null;
        }
      };

      document.addEventListener('click', this.outsideClickListener);
    }
  }

  unbindOutsideClickListener() {
    if (this.outsideClickListener) {
      document.removeEventListener('click', this.outsideClickListener);
      this.outsideClickListener = null;
    }
  }

  toggleMenu(event: Event, index: number) {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
    event.preventDefault();
  }

  isOutsideTopbarMenuClicked(event): boolean {
    return !(
      this.topbarMenu.nativeElement.isSameNode(event.target) ||
      this.topbarMenu.nativeElement.contains(event.target)
    );
  }

  onOverlayMenuEnter(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.bindOutsideClickListener();
        break;

      case 'void':
        this.unbindOutsideClickListener();
        break;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
