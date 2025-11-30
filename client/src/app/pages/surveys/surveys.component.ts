import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-surveys',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './surveys.component.html'
})
export class SurveysComponent { }
