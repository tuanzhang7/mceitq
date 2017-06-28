import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { ItqService } from '../services/itq.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ViewEncapsulation } from '@angular/core';
import { Iitq } from '../../../interfaces/Iitq';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-itqs',
  templateUrl: './itq.component.html',
  styleUrls: ['./itq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ItqComponent implements OnInit {

  itq: Iitq = <Iitq>{};
  detail = {};
  topics = [];
  isLoading = true;
  isDetails = false;
  isAllSelected = false;
  isSelected = false;

  constructor(private itqService: ItqService,
    private http: Http,
    public toast: ToastComponent,
    public dialog: MdDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getItq(this.route.snapshot.params['id']);
    // this.route.params.map(params => params['id']).
    // switchMap((params: Params) => this.getItq(params['id']));
    // this.getItqs(params['id']);
  }

  getItq(id) {
    this.itqService.getItq(id).subscribe(
      data => this.itq = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
      }
    );
  }

  viewSubject(subject) {
    this.isDetails = true;
    this.detail = subject;
    this.topics = subject.topics;
    this.topics.forEach(itm => { itm.selected = false; });
  }
  back() {
    this.isDetails = false;
    this.isAllSelected = false;
    this.isSelected = false;
  }
  toggleAll() {
    const toggleStatus = !this.isAllSelected;
    this.topics.forEach(itm => { itm.selected = toggleStatus; });
    // this.isAllSelected = toggleStatus;
    this.isSelected = this.topics.some(function(itm) { return itm.selected; })
  }
  optionToggled() {
    this.isAllSelected = this.topics.every(function(itm) { return itm.selected; })
    this.isSelected = this.topics.some(function(itm) { return itm.selected; })
  }

  launch(mypage): void {
    const w = screen.width;
    const h = screen.height;
    const winprops = 'height=' + h + ',width=' + w + ',top=0,left=0,scrollbars=0, resizable=0';
    console.log('/assets/resources/' + mypage);
    window.open('/assets/resources/' + mypage, 'Resources', winprops);
  }

  openDialog(mypage, title) {
    const videoUrl = '/assets/resources/' + mypage;
    const data = {
      videoUrl: videoUrl,
      title: title
    }
    const dialogRef = this.dialog.open(DialogResultComponent, {
      data: data,
      height: '768px',
      width: '1024px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
    });
  }

  printSelected(subject): void {
    const selected = subject.topics.filter(function(obj) {
     return obj.selected;
    });
    let printhtml = '';
    selected.forEach(function(obj) {
      printhtml += `<tr>
       <td>${obj.SNo}</th>
       <td>${obj.topic}</th>
       <td>${obj.itqsynopsis}</th>
       <td>${obj.mcesynopsis}</th>
       <td>${obj.addinfo}</th>
       </tr>`;
   });
    let popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            body{font-family:Arial;}.table th{text-align:left;}.table td,.table th{border-bottom:1px solid #ccc;vertical-align:top;}
          </style>
        </head>
        <body onload="window.print();window.close()">
        <h2>MOE ITQ NO: ${this.itq.name} - Evaluation Site</small></h2>
        <h3>${subject.subject}</h3>
        <table class="table" cellpadding="3" cellspacing="0">
          <thead>
            <tr>
              <th width=5%>S/No.</th>
              <th width=20%>Topic</th>
              <th width=30%>ITQ Synopsis</th>
              <th width=30%>MCE Synopsis</th>
              <th width=15%>Additional Information</th>
            </tr>
          </thead>
        ${printhtml}
        </table>
          <p> &copy; 2017 Marshall Cavendish Education Pte. Ltd. All Rights Reserved. </p>
      </body>
      </html>`
    );
    popupWin.document.close();
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog-content.html',
})
export class DialogResultComponent {
  constructor(public dialogRef: MdDialogRef<DialogResultComponent>,
  @Inject(MD_DIALOG_DATA) public data: any) {}
}
