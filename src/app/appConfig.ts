import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const AppConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ],
}
