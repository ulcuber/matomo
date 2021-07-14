import {piwikSiteselectorShim} from "./siteselector/siteselector.shim";

declare var angular: angular.IAngularStatic;

import {NgModule, StaticProvider} from '@angular/core';
import {downgradeComponent, downgradeModule, UpgradeModule} from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {BrowserModule} from "@angular/platform-browser";
import {SiteSelectorAllSitesLink, SiteSelectorComponent} from './siteselector/siteselector.component';
import {SitesService} from "./site-store/sites.service";
import {MatomoApiService} from "./matomo-api/matomo-api.service";
import {HttpClientModule} from "@angular/common/http";
import {FocusAnywhereButHereDirective} from "./common/focus-anywhere-but-here.directive";
import {TranslatePipe} from "./common/translate.pipe";
import {FormsModule} from "@angular/forms";

export * from './matomo-api/matomo-api.service';
export * from './common/focus-anywhere-but-here.directive';
export * from './common/translate.pipe';
export * from './site-store/sites.service';
export * from './site-store/site';
export * from './siteselector/siteselector.component';

@NgModule({
  declarations: [
    SiteSelectorComponent,
    FocusAnywhereButHereDirective,
    TranslatePipe,
    SiteSelectorAllSitesLink,
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [
    SiteSelectorComponent,
    FocusAnywhereButHereDirective,
    TranslatePipe,
  ],
  providers: [
    FocusAnywhereButHereDirective,
    TranslatePipe,
    MatomoApiService,
    SitesService,
  ],
  entryComponents: [
    SiteSelectorComponent,
  ],
})
export class CoreHomeModule {
  ngDoBootstrap() {
    // empty
  }
}

const ng2BootstrapFn = (extraProviders: StaticProvider[]) =>
    platformBrowserDynamic(extraProviders).bootstrapModule(CoreHomeModule);

export const angularModuleName = downgradeModule(ng2BootstrapFn);

angular.module(angularModuleName).directive('piwikSiteselectorDowngrade', downgradeComponent(
    { component: SiteSelectorComponent, downgradedModule: angularModuleName }));
angular.module(angularModuleName).directive('piwikSiteselector', piwikSiteselectorShim);