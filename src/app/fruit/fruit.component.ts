import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WhatService } from '../what.service';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.scss'],
	providers: [WhatService]
})
export class FruitComponent implements OnInit {
	public directory: string;
	public whatList: string[];
	public whatUrl: string;
	public instructs = 'Scroll downnnnnnnnn!';

  constructor(
		private route: ActivatedRoute,
		private whatService: WhatService
	) { }

  ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			this.directory = params['dir'];
			this.whatList = [];
			this.getWhat();
		});
  }

	getWhat() {
		this.whatService.getWhat(this.directory).subscribe(
			resp => {
				this.whatList = resp.body;
				this.whatUrl = resp.url;
			}
		);
	}

}
