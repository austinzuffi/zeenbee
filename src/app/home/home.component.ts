import { Component, OnInit } from '@angular/core';
import { WhatService } from '../what.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
	providers: [WhatService]
})
export class HomeComponent implements OnInit {
	blurb = `Hey friends and fam! Sienna & I ran off and got married in Joshua Tree on October 15th 2016. We wanted to 
						celebrate our love and figured that marriage was just the thing. Friends rallied down to the desert (in style) 
						and helped make this event into a masterpiece. We built our own furniture, collected decorations from flea 
						markets, bought a case of champagne and headed into Joshua Tree National Park for a photoshoot. We parked 
						the Volkswagen on an old lake bed and unfolded a brilliant dining table. Solar panels lit the scene where we 
						feasted and spoke aloud under the full moon. Our dear ordained Josh led the ceremonies as we stood 
						in between the van and the table-of-plenty. This was a safe space that set the stage for true bonding. 
						All of you brought us to this very place in our lives, we thank you directly. This 
						website is our product to share. It is the finest culmination of our combined skills, fueled with 
						love. We hope that this can transport you to that far away place where something special once began.`;
	tooltip = 'Peeks are out here!';
	blurb2 = `We returned home to plan a big family wedding. On October 15th 2017, we had the ceremony at the Brazilian 
						Room in Berkeley. We built a photo booth, decorated the tables with protea, and gathered all who have been part of our 
						relationship. Twas a treat to have you all. Please, 
						enjoy the photos. Hope you find a good one or two of yourself :)`;
	claim = 'site made from scratch by Austin Zee, photos curated & edited by Sienna Bee';
	spotify = '~playlist~';
	public whatList: string[];
	public whatUrl: string;

  constructor(
		private whatService: WhatService
	) { }

  ngOnInit(): void {
		this.whatList = [];
		this.getWhat();
  }

	getWhat() {
		this.whatService.getWhat().subscribe(
			resp => {
				this.whatList = resp.body;
				this.whatUrl = resp.url;
			},
			error => {
				this.handleError(error);
			}
		);
	}

	handleError(error: HttpErrorResponse) {
		if(error.error instanceof ErrorEvent) {
			console.error("error occurred");
		} else {
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`
			);
		}

	}

	bottomImgClicked() {
		window.scrollTo(0,0)
	}

}
