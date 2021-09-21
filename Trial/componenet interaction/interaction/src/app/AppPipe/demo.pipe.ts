
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'demopipe'
})

export class DemoPipe implements PipeTransform{

    transform(value:any, before: string){
        return before + value;
    }
}