import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-historial-estados',
  templateUrl: './historial-estados.component.html',
  styleUrls: ['./historial-estados.component.scss']
})
export class HistorialEstadosComponent implements OnInit {

  constructor
    (
      private _apiSv: ApiService
    ) { }
  @Input() id: any = [];
  estados: any = [];
  print: boolean
  minimize: boolean;
  ngOnInit(): void {
    this.getEstados(this.id)
  }

  getEstados(id) {
    this._apiSv.getTareasEstados({
      IdPedido: id
    }).then(r => {
      this.estados = r;
    }).catch(e => {
      throw new Error("Error al obtener los estados");
    });
  }

  getHTML(): string {
    let printContents = document.getElementById('estados').innerHTML;

    return `
      <html>
        <head>
          <meta charset="UTF-8">
		      <meta name="keywords" content="HTML,CSS">
		      <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Historial de estados VB-`+ this.id + `</title>
          <style>
            .no-imprimir {
              display: none!important;
            }
            .d_flex{
              display:flex;
            }
            .justify_content_center{
              justify-content:center;
            }
            .estados{
              margin-top:10px;
            }
            .programador{
              font-size: 14px;
          }
          @mixin tablet-and-up {
            @media screen and (min-width: 769px) { @content; }
        }
        @mixin mobile-and-up {
            @media screen and (min-width: 601px) { @content; }
        }
        @mixin tablet-and-down  {
            @media screen and (max-width: 768px) { @content; }
        }
        @mixin mobile-only {
            @media screen and (max-width: 600px) { @content; }
        }
            
    ul, li{
      list-style: none;
      padding: 0;
    }
        
    .container{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 1rem;
      background: linear-gradient(45deg, #209cff, #68e0cf);
      padding: 3rem 0;
    }
    .wrapper{
      background: #eaf6ff;
      padding: 2rem;
      border-radius: 15px;
    }
    h1{
      font-size: 1.1rem;
    //   font-family: sans-serif;
    }
    .sessions{
      margin-top: 2rem;
      border-radius: 12px;
      position: relative;
    }
    li{
      padding-bottom: 1.5rem;
      border-left: 1px solid #477f46;
      position: relative;
      padding-left: 20px;
      margin-left: 10px;
 
    }
    li:last-child{
      border: 0px;
      padding-bottom: 0;
    }
    li:before{
      content: '';
      width: 15px;
      height: 15px;
      background: #477f46;
      border: 1px solid #477f46;

      border-radius: 50%;
      position: absolute;
      left: -10px;
      top: 0px;
    }
    .time{
      color: #2a2839;
     font-family: sans-serif;
      font-weight: 600;
      @include mobile-and-up{
        font-size: 1rem;
      }
      @include mobile-only{
        margin-bottom: .3rem;
        font-size: 0.85rem;
      }
    
    }
    p{
      color: #4f4f4f;
     font-family: sans-serif;
      line-height: 1.5;
      margin-top:0.4rem;
      @include mobile-only{
        font-size: 2rem;
      }
    }
    .title_listado_detalle{
      font-family: sans-serif;
      font-size: 20px;
      display: flex;
      flex-direction: column;
  }

          </style>
        </head>
        <body onload="window.print();">
          ${printContents}
        </body>
      </html>`;
  }
  imprimir() {
    let popupWin = window.open('', '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + screen.availWidth + ',height=' + screen.availHeight);
    popupWin.document.open();
    popupWin.document.write(this.getHTML());
    popupWin.document.close();
  }
}
