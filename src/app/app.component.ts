import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tareas';
  toolbar: boolean;
  user = this._auth.getCurrentUser();
  constructor(private _auth: AuthService) {
    this._auth.logged.subscribe((r) => {
      this.toolbar = r.status;
    });
  }

  ngOnInit() {
    if (this.user) {
      this.toolbar = true;
    }
  }
}
