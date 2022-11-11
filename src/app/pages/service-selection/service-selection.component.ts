import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.css'],
})
export class ServiceSelectionComponent implements OnInit {
  servicesForm!: FormGroup;
  services!: Service[];
  servicesControl!: any;

  constructor(
    private formBuilder: FormBuilder,
    private servicesService: ServicesService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.servicesForm = formBuilder.group({
      selectServices: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.servicesService.getAllServices().subscribe((res) => {
      this.services = res;
    });
  }

  controlService(event: any) {
    const selectServices = this.servicesForm.controls[
      'selectServices'
    ] as FormArray;

    if (event.target.checked) {
      selectServices.push(new FormControl(event.target.value));
    } else {
      const index = selectServices.controls.findIndex(
        (i) => i.value === event.target.value
      );
      selectServices.removeAt(index);
    }
  }

  next() {
    const selectservices = this.services.filter((service) => {
      //seçilen servisler, services json içersinden filterelenip selectservices değişkenine atanıyor..
      return this.servicesForm.value.selectServices.some(
        (selectService: any) => {
          return selectService === service.name;
        }
      );
    });
    this.servicesControl = selectservices; // ilgili değişkeni globale taşır...
    this.saveStore(this.servicesControl);
    this.router.navigateByUrl('/summary');
  }

  saveStore(serviceInfoModel: Service) {
    this.servicesService.saveServices(serviceInfoModel);
    this.servicesService.serviceModel$;
  }

  // add(item: any) {
  //   this.services.forEach((element, index) => {
  //     if (element.id == item.id) {
  //       this.services.splice(index, 1);
  //       this.selectedServices.push(item);
  //     }
  //   });
  // }
  // remove(item: any) {
  //   this.selectedServices.forEach((element, index) => {
  //     if (element.id == item.id) {
  //       this.selectedServices.splice(index, 1);
  //       this.services.push(item);
  //     }
  //   });
  // }

  // next() {
  //   if (this.selectedServices.length) {
  //     console.log('store a data yolla');
  //     this.router.navigate(['/summary']);
  //   } else {
  //     this.toastr.error('Gerekli alanları doldurun');
  //   }
  // }

  backButton() {
    this.router.navigate(['/create-customer']);
  }
}
