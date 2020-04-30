import { Component, OnInit } from '@angular/core';
import { WhatService } from '../what.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
	providers: [WhatService]
})
export class NavComponent implements OnInit {
	public unsortedKeys: string[];
	public unfilteredKeys: string[];
	public whatKeys: string[];
	public isCollapsed = true;
	public errorMessage: string;

	constructor(private whatService: WhatService) {}

  ngOnInit(): void {
		this.getWhat();
  }

	/* Uses action methods
	 */
	getWhat(dir?: string) {
		this.whatService.getWhat(dir).subscribe(
			resp => {
				this.unsortedKeys = resp.body;
				this.unfilteredKeys = this.unsortedKeys.sort((left: any, right: any): number => {
					let l = new Date(left.mtime);
					let r = new Date(right.mtime);
					if (l < r) return -1;
					if (l > r) return 1;
					return 0;
				});
				this.whatKeys = this.unfilteredKeys.filter(
					(key:any) => key.type === 'directory'
				);
			},
			error => {
				this.errorMessage = 'not connected to my photo site, is your browser blocking?';
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
}
