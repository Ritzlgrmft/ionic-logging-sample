import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { SplashScreen } from "@ionic-native/splash-screen";

import { ConfigurationService } from "ionic-configuration-service";
import { LoggingService } from "ionic-logging-service";
import { LoggingViewerModule } from "ionic-logging-viewer";

import { HomePage } from "../pages/home/home";
import { AppComponent } from "./app.component";

export function loadConfiguration(configurationService: ConfigurationService): () => Promise<void> {
	return () => configurationService.load("assets/settings.json");
}

@NgModule({
	bootstrap: [IonicApp],
	declarations: [
		AppComponent,
		HomePage,
	],
	entryComponents: [
		AppComponent,
		HomePage,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(AppComponent),
		LoggingViewerModule,
	],
	providers: [
		ConfigurationService,
		LoggingService,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{
			deps: [ConfigurationService],
			multi: true,
			provide: APP_INITIALIZER,
			useFactory: loadConfiguration,
		},
	],
})
export class AppModule { }
