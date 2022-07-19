import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  datos: boolean;
  logged: boolean;
  view_toolbar: boolean;
  datos_usuarios = this._auth.getCurrentUser();
  constructor(public _auth: AuthService,
    private _globalsSv: GlobalsService) {


  }

  ngOnInit(): void {
    this._auth.viewToolbar.subscribe((r: boolean) => {
      this.view_toolbar = r;
    });
  }



}
