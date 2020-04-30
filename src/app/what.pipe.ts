import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'what'
})
export class WhatPipe implements PipeTransform {

	transform(value: any, args?: string): unknown {
		/** means we want a full url */
		if (args) {
			/** return top-level files but not folders */
			if (value.type == "file")
				return args + value.name;
		}
		else if (value.type == "directory")
			return value.name;
	}

}
