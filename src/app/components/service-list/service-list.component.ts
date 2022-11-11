import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  services!: Service[];
  serviceAddForm!: FormGroup;
  isUpdating: boolean = false;
  error: string = '';
  searchText: string = '';
  serviceId: number = 0;
  private findService?: Service;
  constructor(
    private formBuilder: FormBuilder,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.getServices();
    this.createServiceAddForm();
  }

  createServiceAddForm() {
    this.serviceAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getServices(): void {
    this.servicesService.getAllServices().subscribe((response) => {
      this.services = response;
    });
  }
  changeServiceIdToDelete(event: any) {
    this.serviceId = event.target.value;
  }

  foundedService(id: number) {
    this.findService = this.services.find((service) => service.id === id);
    this.serviceAddForm.patchValue({
      name: this.findService?.name,
    });
    this.serviceId = id;
    this.isUpdating = true;
  }
  update(): void {
    if (this.serviceAddForm.invalid) {
      this.error = 'Form is invalid';
      return;
    }
    if (this.error) this.error = '';
    const service: Service = {
      ...this.serviceAddForm.value,
    };
    this.servicesService.update(service, this.serviceId).subscribe({
      next: (response) => {
        console.info(`Service(${response.id})has update`);
      },
      error: (err) => {
        console.log(err);

        this.error = err.statusText;
      },
      complete: () => {
        if (this.error) this.error = '';
        this.serviceAddForm.reset();
        this.isUpdating = false;
        this.getServices();
      },
    });
  }
  add(): void {
    if (this.serviceAddForm.invalid) {
      this.error = 'Form is invalid';
      return;
    }
    if (this.error) this.error = '';
    const service: Service = {
      ...this.serviceAddForm.value,
    };
    if (this.isUpdating) {
      this.update();
    } else {
      this.servicesService.add(service).subscribe({
        next: (response) => {
          console.info(`Service(${response.id})has added`);
        },
        error: (err) => {
          console.log(err);

          this.error = err.statusText;
        },
        complete: () => {
          if (this.error) this.error = '';
          this.serviceAddForm.reset();
          this.getServices();
        },
      });
    }
  }

  delete() {
    this.servicesService.delete(this.serviceId).subscribe(() => {
      this.serviceId = 0;
      this.serviceAddForm.patchValue({
        name: '',
      });
      this.isUpdating = false;
      this.getServices();
    });
  }
}
