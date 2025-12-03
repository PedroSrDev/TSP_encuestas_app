import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { AlertService } from '../../services/alert.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    users: any[] = [];
    userForm: FormGroup;
    isLoading = false;
    searchTerm = '';

    constructor(
        private usersService: UsersService,
        private alertService: AlertService,
        private fb: FormBuilder
    ) {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['Analista', Validators.required]
        });
    }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.usersService.getUsers(this.searchTerm).subscribe({
            next: (data) => this.users = data,
            error: (err) => console.error('Error loading users', err)
        });
    }

    onSearch() {
        this.loadUsers();
    }

    onSubmit() {
        if (this.userForm.valid) {
            this.isLoading = true;
            this.usersService.createUser(this.userForm.value).subscribe({
                next: (res) => {
                    this.alertService.success('Usuario Creado', 'El usuario ha sido añadido correctamente.');
                    this.userForm.reset({ role: 'Analista' });
                    this.loadUsers();
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error('Error creating user', err);
                    this.isLoading = false;
                }
            });
        }
    }

    deleteUser(id: number) {
        this.alertService.confirm('¿Estás seguro?', 'Esta acción no se puede deshacer.').then((result) => {
            if (result.isConfirmed) {
                this.usersService.deleteUser(id).subscribe({
                    next: () => {
                        this.alertService.success('Eliminado', 'El usuario ha sido eliminado.');
                        this.loadUsers();
                    },
                    error: (err) => console.error('Error deleting user', err)
                });
            }
        });
    }
}
