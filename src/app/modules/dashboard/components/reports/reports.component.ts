import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @Input()
  url: string = "https://5o739b2fm5gxy1n.sg.qlikcloud.com/single/?appid=f85cea69-7d42-4e4b-8c94-bf3ad2069ac5&sheet=92e16369-a44e-427f-9d13-a324ca00b3ef&theme=horizon&opt=ctxmenu";
  urlSafe?: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
