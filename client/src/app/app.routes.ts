import { Routes } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { SurveyResultsComponent } from './pages/survey-results/survey-results.component';
import { UsersComponent } from './pages/users/users.component';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'register-company', component: RegisterCompanyComponent },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'users', component: UsersComponent },
            { path: 'surveys', component: SurveysComponent },
            { path: 'surveys/create', component: CreateSurveyComponent },
            { path: 'analytics', component: SurveyResultsComponent }
        ]
    }
];
