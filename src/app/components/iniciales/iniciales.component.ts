import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciales',
  templateUrl: './iniciales.component.html',
  styleUrls: ['./iniciales.component.scss']
})
export class InicialesComponent implements OnInit {

  constructor() { }
  @Input() text: string;
  @Input() opacity: string;
  @Input() size: string;
  @Input() color: string;
  @Input() fuente: string;
  @Input() width: string = '32px';
  @Input() height: string = '32px';
  @Input() borde: string;
  @Input() border_color: string = 'white';
  ngOnInit(): void {
  }

}
