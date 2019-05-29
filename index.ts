interface IProgress<T> {
    report(value: T);
}

class Progress<T> implements IProgress<T>
{
    constructor(private callback: (value: T) => void) {
    }

    report(value: T) {
        this.callback(value);
    }
}

class WorkDone {
    constructor(public percent: number) { }
}

function DoMyBidding(workDoneProgress?: IProgress<WorkDone>) {
    for (let index = 0; index < 100; index++) {
        // do some work

        // Report on progress every 5% we're done.
        if ((index % 5) == 0 && workDoneProgress) {
            workDoneProgress.report(new WorkDone(index));
        }
    }
}

// Strongly-typed example:
DoMyBidding(new Progress<WorkDone>(d => console.log(`${d.percent}% done!`)));

// But a Progress<any> "instance" works equally well:
DoMyBidding(new Progress<any>(d => console.log(`${d.percent}% done!`)));
