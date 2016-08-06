import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';

import { HomeService } from "../app/homes";
import { SHARED_PROVIDERS } from "../app/shared";

export const PROVIDERS = [
    ...HTTP_PROVIDERS,
    ...SHARED_PROVIDERS,
    HomeService,

    disableDeprecatedForms(),
    provideForms()
];
