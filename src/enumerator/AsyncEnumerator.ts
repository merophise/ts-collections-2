import {IAsyncEnumerable} from "./IAsyncEnumerable";
import {IndexedPredicate} from "../shared/IndexedPredicate";
import {ErrorMessages} from "../shared/ErrorMessages";
import {Selector} from "../shared/Selector";
import {Accumulator} from "../shared/Accumulator";
import {Predicate} from "../shared/Predicate";
import {Enumerable, EnumerableSet, IEnumerable, List, SortedSet} from "../../imports";
import {EqualityComparator} from "../shared/EqualityComparator";
import {Comparators} from "../shared/Comparators";
import {AsyncEnumerable} from "./AsyncEnumerable";
import {OrderComparator} from "../shared/OrderComparator";
import {IndexedAction} from "../shared/IndexedAction";

export class AsyncEnumerator<TElement> implements IAsyncEnumerable<TElement> {

    public constructor(private readonly iterable: () => AsyncIterable<TElement>) {
    }

    async* [Symbol.asyncIterator](): AsyncIterator<TElement> {
        yield* await this.iterable();
    }

    public async aggregate<TAccumulate = TElement, TResult = TAccumulate>(accumulator: Accumulator<TElement, TAccumulate>, seed?: TAccumulate, resultSelector?: Selector<TAccumulate, TResult>): Promise<TAccumulate | TResult> {
        if (!accumulator) {
            throw new Error(ErrorMessages.NoAccumulatorProvided);
        }
        let accumulatedValue: TAccumulate;
        if (seed == null) {
            if(!await this.any()) {
                throw new Error(ErrorMessages.NoElements);
            }
            accumulatedValue = await this.first() as unknown as TAccumulate;
            for await (const element of this.skip(1)) {
                accumulatedValue = accumulator(accumulatedValue, element);
            }
        } else {
            accumulatedValue = seed;
            for await (const element of this) {
                accumulatedValue = accumulator(accumulatedValue, element);
            }
        }
        if (!resultSelector) {
            return accumulatedValue;
        }
        return resultSelector(accumulatedValue);
    }

    public async all(predicate: Predicate<TElement>): Promise<boolean> {
        if (!predicate) {
            throw new Error(ErrorMessages.NoPredicateProvided);
        }
        for await (const element of this) {
            if(!predicate(element)) {
                return false;
            }
        }
        return true;
    }

    public async any(predicate?: Predicate<TElement>): Promise<boolean> {
        if (!predicate) {
            return this[Symbol.asyncIterator]().next().then(result => !result.done);
        }
        for await (const element of this) {
            if(predicate(element)) {
                return true;
            }
        }
        return false;
    }

    public append(element: TElement): IAsyncEnumerable<TElement> {
        return new AsyncEnumerator<TElement>(() => this.appendGenerator(element));
    }

    public async average(selector?: Selector<TElement, number>): Promise<number> {
        let total = 0;
        let count = 0;
        for await (const element of this) {
            total += selector?.(element) ?? element as number;
            ++count;
        }
        if (count === 0) {
            throw new Error(ErrorMessages.NoElements);
        }
        return total / count;
    }

    public chunk(size: number): IAsyncEnumerable<IEnumerable<TElement>> {
        if (size < 1) {
            throw new Error(ErrorMessages.InvalidChunkSize);
        }
        return new AsyncEnumerator<IEnumerable<TElement>>(() => this.chunkGenerator(size));
    }

    public concat(other: IAsyncEnumerable<TElement>): IAsyncEnumerable<TElement> {
        return new AsyncEnumerator<TElement>(() => this.concatGenerator(other));
    }

    public async contains(element: TElement, comparator?: EqualityComparator<TElement>): Promise<boolean> {
        comparator ??= Comparators.equalityComparator;
        for await (const e of this) {
            if (comparator(e, element)) {
                return true;
            }
        }
        return false;
    }

    public async count(predicate?: Predicate<TElement>): Promise<number> {
        if (!predicate) {
            return this.toArray().then(array => array.length);
        }
        let count = 0;
        for await (const element of this) {
            if(predicate(element)) {
                ++count;
            }
        }
        return count;
    }

    public defaultIfEmpty(defaultValue?: TElement): IAsyncEnumerable<TElement> {
        return new AsyncEnumerator<TElement>(() => this.defaultIfEmptyGenerator(defaultValue));
    }

    public distinct<TKey>(keySelector?: Selector<TElement, TKey>, keyComparator?: EqualityComparator<TKey>): IAsyncEnumerable<TElement> {
        keyComparator ??= Comparators.equalityComparator;
        keySelector ??= (element: TElement) => element as unknown as TKey;
        return new AsyncEnumerator<TElement>(() => this.unionGeneratorWithKeySelector(
            new AsyncEnumerator(async function* () { yield* []; }), keySelector, keyComparator));
    }

    public async elementAt(index: number): Promise<TElement> {
        if (index < 0) {
            throw new Error(ErrorMessages.IndexOutOfBoundsException);
        }
        let count = 0;
        for await (const element of this) {
            if (count === index) {
                return element;
            }
            ++count;
        }
        throw new Error(ErrorMessages.NoSuchElement);
    }

    public async elementAtOrDefault(index: number): Promise<TElement | null> {
        if (index < 0) {
            throw new Error(ErrorMessages.IndexOutOfBoundsException);
        }
        let count = 0;
        for await (const element of this) {
            if (count === index) {
                return element;
            }
            ++count;
        }
        return null;
    }

    public except(enumerable: IAsyncEnumerable<TElement>, comparator?: EqualityComparator<TElement>, orderComparator?: OrderComparator<TElement>): IAsyncEnumerable<TElement> {
        if (enumerable == null) {
            throw new Error(ErrorMessages.NullSequence);
        }
        comparator ??= Comparators.equalityComparator;
        return new AsyncEnumerator<TElement>(() => this.exceptGenerator(enumerable, comparator, orderComparator));
    }

    public async first(predicate?: Predicate<TElement>): Promise<TElement> {
        let count = 0;
        for await (const element of this) {
            ++count;
            if (!predicate) {
                return element;
            }
            if(predicate(element)) {
                return element;
            }
        }
        if (count === 0) {
            throw new Error(ErrorMessages.NoElements);
        }
        throw new Error(ErrorMessages.NoMatchingElement);
    }

    public async firstOrDefault(predicate?: Predicate<TElement>): Promise<TElement | null> {
        for await (const element of this) {
            if (!predicate) {
                return element;
            }
            if(predicate(element)) {
                return element;
            }
        }
        return null;
    }

    public async forEach(action: IndexedAction<TElement>): Promise<void> {
        let index = 0;
        for await (const element of this) {
            action(element, index);
            ++index;
        }
    }

    public prepend(element: TElement): IAsyncEnumerable<TElement> {
        return new AsyncEnumerator<TElement>(() => this.prependGenerator(element));
    }

    public select<TResult>(selector: Selector<TElement, TResult>): IAsyncEnumerable<TResult> {
        if (!selector) {
            throw new Error(ErrorMessages.NoSelectorProvided);
        }
        return new AsyncEnumerator<TResult>(() => this.selectGenerator(selector));
    }

    public skip(count: number): IAsyncEnumerable<TElement> {
        if (count < 0) {
            throw new Error(ErrorMessages.IndexOutOfBoundsException);
        }
        return new AsyncEnumerator<TElement>(() => this.skipGenerator(count));
    }

    public where(predicate: IndexedPredicate<TElement>): IAsyncEnumerable<TElement> {
        if (!predicate) {
            throw new Error(ErrorMessages.NoPredicateProvided);
        }
        return new AsyncEnumerator<TElement>(() => this.whereGenerator(predicate));
    }

    public async toArray(): Promise<TElement[]> {
        const result: TElement[] = [];
        for await (const element of this) {
            result.push(element);
        }
        return result;
    }

    private async* appendGenerator(element: TElement): AsyncIterable<TElement> {
        yield* await this;
        yield element;
    }

    private async* chunkGenerator(size: number): AsyncIterable<IEnumerable<TElement>> {
        const buffer: TElement[] = [];
        for await (const element of this) {
            buffer.push(element);
            if (buffer.length === size) {
                yield Enumerable.from([...buffer]);
                buffer.length = 0;
            }
        }
        if (buffer.length > 0) {
            yield Enumerable.from([...buffer]);
        }
    }

    private async* concatGenerator(other: IAsyncEnumerable<TElement>): AsyncIterable<TElement> {
        yield* await this;
        yield* await other;
    }

    private async* defaultIfEmptyGenerator(defaultValue?: TElement): AsyncIterable<TElement> {
        let hasElements = false;
        for await (const element of this) {
            hasElements = true;
            yield element;
        }
        if (!hasElements) {
            yield defaultValue;
        }
    }

    private async* exceptGenerator(enumerable: IAsyncEnumerable<TElement>, comparator: EqualityComparator<TElement>, orderComparator?: OrderComparator<TElement>): AsyncIterable<TElement> {
        const collection = orderComparator ? new SortedSet<TElement>([], orderComparator) : comparator ? new List<TElement>([], comparator) : new EnumerableSet<TElement>();
        for await (const element of enumerable) {
            if (!collection.contains(element)) {
                collection.add(element);
            }
        }
        for await (const element of this) {
            if (!collection.contains(element)) {
                collection.add(element);
                yield element;
            }
        }
    }

    private async* prependGenerator(element: TElement): AsyncIterable<TElement> {
        yield element;
        yield* await this;
    }

    private async* selectGenerator<TResult>(selector: Selector<TElement, TResult>): AsyncIterable<TResult> {
        for await (const element of this) {
            yield selector(element);
        }
    }

    private async* skipGenerator(count: number): AsyncIterable<TElement> {
        let index = 0;
        for await (const d of this) {
            if (index >= count) {
                yield d;
            }
            ++index;
        }
    }

    private async* unionGeneratorWithKeySelector<TKey>(enumerable: IAsyncEnumerable<TElement>, keySelector: Selector<TElement, TKey>, comparator: EqualityComparator<TKey>): AsyncIterable<TElement> {
        const distinctList: TElement[] = [];
        for await (const source of [this, enumerable]) {
            for await (const element of source) {
                let exist = false;
                for (const existingItem of distinctList) {
                    if (comparator(keySelector(element), keySelector(existingItem))) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    yield element;
                    distinctList.push(element);
                }
            }
        }
    }

    private async* whereGenerator(predicate: IndexedPredicate<TElement>): AsyncIterable<TElement> {
        let index = 0;
        for await (const d of this) {
            if (predicate(d, index)) {
                yield d;
            }
            ++index;
        }
    }
}