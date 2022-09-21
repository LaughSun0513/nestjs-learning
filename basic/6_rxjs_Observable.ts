import { Observable, interval, take } from 'rxjs';
import { map, filter, reduce, find, findIndex } from 'rxjs/operators';


const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

observable.subscribe({
    next: (value) => {
        console.log(value);
    }
});

/*
1
2
3
4
*/