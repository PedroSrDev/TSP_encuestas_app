import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { SurveysService } from '../../services/surveys.service';
import { AlertService } from '../../services/alert.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-create-survey',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './create-survey.component.html'
})
export class CreateSurveyComponent {
    surveyTitle = '';
    surveyDescription = '';

    constructor(
        private surveysService: SurveysService,
        private alertService: AlertService,
        private router: Router
    ) { }

    saveSurvey(status: 'draft' | 'active') {
        if (!this.surveyTitle) {
            this.alertService.error('Error', 'El título de la encuesta es obligatorio.');
            return;
        }

        const surveyData = {
            title: this.surveyTitle,
            description: this.surveyDescription,
            status: status,
            questions: [] // Collect questions from UI if implemented
        };

        this.surveysService.createSurvey(surveyData).subscribe({
            next: (res) => {
                this.alertService.success('Éxito', `Encuesta ${status === 'draft' ? 'guardada como borrador' : 'publicada'} correctamente.`);
                this.router.navigate(['/surveys']);
            },
            error: (err) => {
                console.error('Error creating survey', err);
            }
        });
    }
}
