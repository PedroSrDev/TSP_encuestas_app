import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SurveysService } from '../../services/surveys.service';
import { AlertService } from '../../services/alert.service';
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
export class SurveysComponent implements OnInit {
    searchTerm: string = '';
    filterStatus: 'all' | 'active' | 'draft' | 'closed' = 'all';
    surveys: any[] = [];
    isLoading = true;

    constructor(private surveysService: SurveysService, private alertService: AlertService) { }

    ngOnInit() {
        this.loadSurveys();
    }

    loadSurveys() {
        this.isLoading = true;
        this.surveysService.getSurveys().subscribe({
            next: (data) => {
                this.surveys = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading surveys', err);
                this.isLoading = false;
            }
        });
    }

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
