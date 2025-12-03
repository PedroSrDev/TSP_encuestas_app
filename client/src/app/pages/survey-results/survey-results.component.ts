import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as XLSX from 'xlsx';

@Component({
    selector: 'app-survey-results',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './survey-results.component.html'
})
export class SurveyResultsComponent {

    downloadExcel() {
        const data = [
            { "Nombre de la Encuesta": "Encuesta de Clima Laboral Q3", "Cantidad de Encuestas Hechas": "350 / 400", "Porcentaje de Finalización": "87.5%" },
            { "Nombre de la Encuesta": "Satisfacción del Cliente 2023", "Cantidad de Encuestas Hechas": "850 / 1000", "Porcentaje de Finalización": "85%" },
            { "Nombre de la Encuesta": "Feedback Onboarding Nuevos Empleados", "Cantidad de Encuestas Hechas": "84 / 90", "Porcentaje de Finalización": "93.3%" },
            { "Nombre de la Encuesta": "Revisión de Desempeño Semestral", "Cantidad de Encuestas Hechas": "400 / 400", "Porcentaje de Finalización": "100%" }
        ];

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
        XLSX.writeFile(wb, 'Resultados_Encuestas.xlsx');
    }
}
