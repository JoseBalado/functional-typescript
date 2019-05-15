class Left {
    constructor(value) {
        this.value = value;
        this._tag = "Left";
    }
    map(f) {
        return left(this.value);
    }
}
class Right {
    constructor(value) {
        this.value = value;
        this._tag = "Right";
    }
    map(f) {
        return right(f(this.value));
    }
}
const left = (l) => new Left(l);
const right = (a) => new Right(a);
const double = (x) => x * 2;
const inverse = (x) => x === 0 ? left("cannot divide by zero") : right(1 / x);
const doubleInverse = (x) => inverse(x).map(double);
console.log(doubleInverse(2) // Right(1)
);
console.log(doubleInverse(0) // Left('cannot divide by zero')
);
const inc = (x) => x + 1;
console.log(inverse(0)
    .map(double)
    .map(inc) // Left('cannot divide by zero')
);
console.log(inverse(4)
    .map(double)
    .map(inc) // Right(1.5)
);
// Identity Functor
class Identity {
    constructor(value) {
        this.value = value;
    }
    map(f) {
        return new Identity(f(this.value));
    }
}
const identity = new Identity(5);
const identity2 = new Identity({ name: 'John', surname: 'Doe' });
const nameLength = (text) => text.name.length;
console.log(identity);
console.log(identity2);
console.log(identity
    .map(double));
console.log(identity2
    .map(nameLength));
// Functor Array
const functorArray = {
    map: (f, fa) => fa.map(f)
};
const arrayNumbers = [1, 2, 3];
const addOne = (x) => x + 1;
console.log('functorArray', functorArray.map(addOne, arrayNumbers));
// Functor IO
class IO {
    constructor(run) {
        this.run = run;
    }
    map(f) {
        return new IO(() => f(this.run()));
    }
}
const log = (s) => new IO(() => console.log(s));
const helloIO = log('Hello IO');
helloIO.run();
const io = new IO(() => 'Hello IO');
io
    .map(text => text + ' again!!!')
    .map(console.log.bind(console))
    .run();
// Functor Task
class Task {
    constructor(run) {
        this.run = run;
    }
    map(f) {
        return new Task(() => this.run().then(f));
    }
}
// const myPromise = Promise.resolve('Hello Task!')
const task = new Task(() => Promise.resolve('Hello Task!'));
task
    .map(console.log.bind(console))
    .run();
//# sourceMappingURL=5_Contravariant_Functor.js.map