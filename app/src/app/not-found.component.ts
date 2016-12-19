import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'uberlike-not-found',
    template: `
        <div class="center">
            <h1>Ressource introuvable, go home.</h1>
            <br /><br />
            <img src="{{ image }}" alt="404" />
            <br /><br />
            <a routerLink="/">Accueil</a>
        </div>
    `,
    styles: [`
        h1 {
            margin: 0;
            padding: 0;
        }
        div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        img {
            display: block;
        }
    `]
})
export class NotFoundComponent implements OnInit {

    image: string = '';

      constructor() { }

      ngOnInit() {
          const images: string[] = [
              '/assets/images/404/cat.gif',
              '/assets/images/404/mario.gif',
              '/assets/images/404/dragon-ball.gif',
              '/assets/images/404/pokemon.gif'
          ];

          this.image = images[Math.floor(Math.random() * images.length)];
      }

}
