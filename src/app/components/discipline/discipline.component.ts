import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  discipline: string;
  text: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.discipline = this.router.url;
    this.text = 'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background\n' +
      '  applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
      '  Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background\n' +
      '  applications, is refined by Ant UED Team. Ant Design';
  }

}
