import { FORM_PROVIDERS } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';

export const PROVIDERS = [
    ...FORM_PROVIDERS,
    ...HTTP_PROVIDERS
];
