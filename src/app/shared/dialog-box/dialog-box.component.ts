import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  @Output() invoiceConfirmed = new EventEmitter<boolean>();

  public form = this._formBuilder.group({
    comment: ['', [Validators.required]]
  });

  constructor(public _dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

  submit(formData: any) {
    if (formData.status === "VALID") {
      this.invoiceConfirmed.emit(true)
      // this._dialogRef.close();
      this._dialogRef.close(true);

    }
  }


}
