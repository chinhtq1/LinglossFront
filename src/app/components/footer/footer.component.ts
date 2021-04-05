import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  mode = 'Student mode'; // TODO get from localstorage user
  constructor() { }

  ngOnInit(): void {
  }

}
