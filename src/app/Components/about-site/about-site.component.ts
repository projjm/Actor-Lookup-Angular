import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about-site',
  templateUrl: './about-site.component.html',
  styleUrls: ['./about-site.component.scss']
})
export class AboutSiteComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {

  }

  closeNotificationClicked(): void
  {
    this.onClose.emit();
  }

}
