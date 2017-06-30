import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ItqService } from '../services/itq.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-itqs',
  templateUrl: './list.component.html'
})
export class ItqListComponent implements OnInit {

  itqs = [];
  isLoading = true;

  constructor(private itqService: ItqService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getItqs();
  }

  getItqs() {
    this.itqService.getItqs().subscribe(
      data => this.itqs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  encodeURIComponent(url) {
    return encodeURIComponent(url);
    // return encodeURI(url);
  }
}
