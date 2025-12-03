import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Survey {
    id: number;
    title: string;
    description: string;
    status: 'active' | 'draft' | 'closed';
    date: string;
    responses: number;
    completionRate: number;
}

@Component({
    selector: 'app-surveys',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './surveys.component.html'
})
export class SurveysComponent {
    searchTerm: string = '';
    filterStatus: 'all' | 'active' | 'draft' | 'closed' = 'all';

    surveys: Survey[] = [
        {
            id: 1,
            title: 'Satisfacción del Cliente Q4',
            description: 'Creada el 15 Oct, 2023',
            status: 'active',
            date: '2023-10-15',
            responses: 1204,
            completionRate: 82
        },
        {
            id: 2,
            title: 'Compromiso Empleados 2024',
            description: 'Modificada el 01 Nov, 2023',
            status: 'draft',
            date: '2023-11-01',
            responses: 0,
            completionRate: 0
        },
        {
            id: 3,
            title: 'Feedback del Producto Beta',
            description: 'Cerrada el 20 Sep, 2023',
            status: 'closed',
            date: '2023-09-20',
            responses: 856,
            completionRate: 75
        }
    ];

    get filteredSurveys(): Survey[] {
        return this.surveys.filter(survey => {
            const matchesSearch = survey.title.toLowerCase().includes(this.searchTerm.toLowerCase());
            const matchesFilter = this.filterStatus === 'all' || survey.status === this.filterStatus;
            return matchesSearch && matchesFilter;
        });
    }

    setFilter(status: 'all' | 'active' | 'draft' | 'closed') {
        this.filterStatus = status;
    }

    getStatusLabel(status: string): string {
        switch (status) {
            case 'active': return 'Activa';
            case 'draft': return 'Borrador';
            case 'closed': return 'Cerrada';
            default: return status;
        }
    }

    getStatusColorClass(status: string): string {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 dark:bg-status-active/20 dark:text-status-active';
            case 'draft': return 'bg-orange-100 text-orange-800 dark:bg-status-draft/20 dark:text-status-draft';
            case 'closed': return 'bg-red-100 text-red-800 dark:bg-status-closed/20 dark:text-status-closed';
            default: return '';
        }
    }

    getStatusDotClass(status: string): string {
        switch (status) {
            case 'active': return 'bg-status-active';
            case 'draft': return 'bg-status-draft';
            case 'closed': return 'bg-status-closed';
            default: return '';
        }
    }
}
