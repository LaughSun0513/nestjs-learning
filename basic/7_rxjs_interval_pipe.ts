import { interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const subs = interval(500)
    .pipe(
        map(v => ({ num: v })),
        filter(v => (v.num % 2 == 0))
    )
    .subscribe(e => {
        console.log(e);
        if (e.num == 10) {
            subs.unsubscribe()
        }
    });
/*
{ num: 0 }
{ num: 2 }
{ num: 4 }
{ num: 6 }
{ num: 8 }
{ num: 10 }
*/