import { Component } from "@angular/core";
import { Platform } from "ionic-angular";

import { SplashScreen } from "@ionic-native/splash-screen";

import { Logger, LoggingService } from "ionic-logging-service";

import { HomePage } from "../pages/home/home";

@Component({
	templateUrl: "app.html",
})
export class AppComponent {
	public rootPage: any = HomePage;

	private logger: Logger;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Logging.Sample");
		this.initialize();
	}

	private async initialize(): Promise<void> {

		const methodName = "initialize";
		this.logger.entry(methodName);

		const readySource = await this.platform.ready();
		if (readySource === "cordova") {
			this.splashScreen.hide();
		}

		this.logger.exit(methodName);
	}
}
