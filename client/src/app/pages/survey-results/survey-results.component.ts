import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysService } from '../../services/surveys.service';
import { AlertService } from '../../services/alert.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-survey-results',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './survey-results.component.html'
})
export class SurveyResultsComponent implements OnInit {
    results: any = null;
    isLoading = false;
    selectedSurveyId: number | null = null;
    surveys: any[] = [];

    constructor(
        private surveysService: SurveysService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadSurveys();
    }

    loadSurveys() {
        this.surveysService.getSurveys().subscribe({
            next: (data) => this.surveys = data,
            error: (err) => console.error(err)
        });
    }

    onSurveySelect(event: any) {
        const id = event.target.value;
        if (id && id !== 'Seleccione una encuesta...') {
            this.selectedSurveyId = id;
            this.loadResults(id);
        }
    }

    loadResults(id: number) {
        this.isLoading = true;
        this.surveysService.getSurveyResults(id).subscribe({
            next: (data) => {
                this.results = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading results', err);
                this.isLoading = false;
            }
        });
    }

    downloadExcel() {
        if (!this.results) return;

        const data = [
            {
                "Encuesta": this.results.titulo,
                "Total Respuestas": this.results.totalRespuestas
            }
        ];
        // Add more detailed data if available

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
        XLSX.writeFile(wb, `Resultados_${this.results.titulo}.xlsx`);
    }
}
