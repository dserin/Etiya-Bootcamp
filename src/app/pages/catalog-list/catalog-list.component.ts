import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Catalog } from 'src/app/models/catalog';
import { CatalogService } from 'src/app/services/catalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'],
})
export class CatalogListComponent implements OnInit {
  catalogs!: Catalog[];
  catalogForm!: FormGroup;
  checkedCatalogs!: any;

  constructor(
    private catalogService: CatalogService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.catalogForm = formBuilder.group({
      selectedCatalogs: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.getCatalogs();
  }

  getCatalogs() {
    this.catalogService.getCatalog().subscribe((res) => {
      this.catalogs = res;
    });
  }

  onCheckboxChange(event?: any) {
    //listelenen servisler içerisinde ilgili servislerin seçilip seçilmediği işleminin yapıldığı metot

    const selectedCatalogs = this.catalogForm.controls[
      'selectedCatalogs'
    ] as FormArray;

    if (event.target.checked) {
      //seçili service arraye push edilir..
      selectedCatalogs.push(new FormControl(event.target.value));
    } else {
      // seçili service çıkarılırsa arraydan silinir...
      const index = selectedCatalogs.controls.findIndex(
        (x) => x.value === event.target.value
      );
      selectedCatalogs.removeAt(index);
    }
  }

  goNextForm() {
    const selectedcatalogs = this.catalogs.filter((catalog) => {
      //seçilen cataloglar, catalogs json içersinden filterelenip selectedcatalogs değişkenine atanıyor..
      return this.catalogForm.value.selectedCatalogs.some(
        (selectedCatalog: any) => {
          return selectedCatalog === catalog.name;
        }
      );
    });
    console.log(selectedcatalogs);
    this.checkedCatalogs = selectedcatalogs; // ilgili değişkeni globale taşır...

    this.saveCatalogsStore(this.checkedCatalogs);

    this.router.navigateByUrl('/creation-overview');
  }

  saveCatalogsStore(catalogs: Catalog) {
    this.catalogService.saveCatalogs(catalogs);
    this.catalogService.catalogModel$.subscribe((res) => {
      console.log('services :', res); //store'dan alınan serviceModel
    });
  }

  goBackForm() {
    this.router.navigateByUrl('/create-customer');
  }
}
