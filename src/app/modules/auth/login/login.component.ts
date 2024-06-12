import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreUrl } from '@app/@core/core.url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public username: string;
  public password: string;
  public invalidCreds: boolean;

  constructor(private _router: Router) {
    this.username = "";
    this.password = "";
    this.invalidCreds = false
  }

  ngOnInit() {
  }

  login(): void {
    if (this.username == 'admin' && this.password == 'admin') {
      this._router.navigate([CoreUrl.pageUrl.HOME_PAGE]);
    } else {
      this.invalidCreds = true
    }
  }
}