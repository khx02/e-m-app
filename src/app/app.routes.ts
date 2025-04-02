import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StatsComponent } from './stats/stats.component';
import { TranslateComponent } from './translate/translate.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';
import { GenerativeAiComponent } from './generative-ai/generative-ai.component';


export const routes: Routes =[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'invalid-data', component: InvalidDataComponent },
    { path: 'drivers', component: ListDriversComponent, canActivate: [authGuard] },
    { path: 'drivers/delete-driver', component: DeleteDriverComponent, canActivate: [authGuard] },
    { path: 'drivers/add-driver', component: AddDriverComponent, canActivate: [authGuard] },
    { path: 'drivers/update-driver', component: UpdateDriverComponent, canActivate: [authGuard] },
    { path: 'packages', component: ListPackagesComponent, canActivate: [authGuard] },
    { path: 'packages/delete-package', component: DeletePackageComponent, canActivate: [authGuard] },
    { path: 'packages/add-package', component: AddPackageComponent, canActivate: [authGuard] },
    { path: 'packages/update-package', component: UpdatePackageComponent, canActivate: [authGuard] },

    { path: 'stats', component: StatsComponent, canActivate: [authGuard] },
    { path: 'translate', component: TranslateComponent, canActivate: [authGuard] },
    { path: 'text-to-speech', component: TextToSpeechComponent, canActivate: [authGuard] },
    { path: 'generative-ai', component: GenerativeAiComponent, canActivate: [authGuard] },

    { path: 'login', component: LoginComponent},
    { path: 'sign-up', component: SignUpComponent},
    { path: '**', component: PageNotFoundComponent },
];
