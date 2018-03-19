import { Component } from "@angular/core";

import { Logger, LoggingService, LogLevel } from "ionic-logging-service";
import { LoggingViewerModalManager, LoggingViewerTranslation } from "ionic-logging-viewer";

@Component({
	selector: "page-home",
	templateUrl: "home.html",
})
export class HomePage {

	public testLoggerName: string;
	public testMethod: string;
	public testLogLevel: string;
	public logLevels: string[];
	public traceMessage: string;
	public debugMessage: string;
	public infoMessage: string;
	public warnMessage: string;
	public errorMessage: string;
	public fatalMessage: string;
	public entryMessage: string;
	public exitMessage: string;
	public languages: string[];
	public selectedLanguage: string;
	public translation: LoggingViewerTranslation;

	private logger: Logger;

	constructor(
		private loggingService: LoggingService,
		private loggingViewerModalManager: LoggingViewerModalManager) {

		this.logger = loggingService.getLogger("Ionic.Logging.Sample.HomePage");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.testLoggerName = "TestLogger";
		this.testMethod = "TestMethod";
		this.testLogLevel = "INFO";
		this.logLevels = [
			"ALL",
			"DEBUG",
			"INFO",
			"WARN",
			"ERROR",
			"OFF",
		];

		this.debugMessage = "debug message";
		this.infoMessage = "info message";
		this.warnMessage = "warn message";
		this.errorMessage = "error message";
		this.entryMessage = "entry message";
		this.exitMessage = "exit message";

		this.onLogLevelOrLoggerChanged();

		this.languages = ["en", "de", "custom"];
		this.selectedLanguage = "en";
		this.translation = {
			cancel: "myCancel",
			searchPlaceholder: "mySearch",
			title: "myTitle",
		};

		this.logger.exit(methodName);
	}

	public onLogLevelOrLoggerChanged(): void {
		const methodName = "onLogLevelOrLoggerChanged";
		this.logger.entry(methodName);

		const logger = this.loggingService.getLogger(this.testLoggerName);
		let logLevel: LogLevel;
		switch (this.testLogLevel) {
			case "ALL":
				logLevel = LogLevel.ALL;
				break;
			case "DEBUG":
				logLevel = LogLevel.DEBUG;
				break;
			case "INFO":
				logLevel = LogLevel.INFO;
				break;
			case "WARN":
				logLevel = LogLevel.WARN;
				break;
			case "ERROR":
				logLevel = LogLevel.ERROR;
				break;
			default:
				logLevel = LogLevel.OFF;
				break;
		}
		logger.setLogLevel(logLevel);

		this.logger.exit(methodName);
	}

	public logDebug(): void {

		const logger = this.loggingService.getLogger(this.testLoggerName);
		logger.debug(this.testMethod, this.debugMessage);
	}

	public logInfo(): void {

		const logger = this.loggingService.getLogger(this.testLoggerName);
		logger.info(this.testMethod, this.infoMessage);
	}

	public logWarn(): void {

		const logger = this.loggingService.getLogger(this.testLoggerName);
		logger.warn(this.testMethod, this.warnMessage);
	}

	public logError(): void {

		const logger = this.loggingService.getLogger(this.testLoggerName);
		logger.error(this.testMethod, this.errorMessage);
	}

	public logEntry(): void {

		const logger = this.loggingService.getLogger(this.testLoggerName);
		logger.entry(this.testMethod, this.entryMessage);
	}

	public logExit(): void {

		const logger = this.loggingService.getLogger(this.testLoggerName);
		logger.entry(this.testMethod, this.exitMessage);
	}

	public openModal() {
		if (this.selectedLanguage === "custom") {
			this.loggingViewerModalManager.openModal(undefined, this.translation);
		} else {
			this.loggingViewerModalManager.openModal(this.selectedLanguage);
		}
	}

	public changeLanguage(language: string): void {
		this.selectedLanguage = language;
	}
}
