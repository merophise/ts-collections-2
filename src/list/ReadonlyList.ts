import {EqualityComparator} from "../shared/EqualityComparator";
import {AbstractReadonlyCollection, IList, IReadonlyList} from "../imports.ts";

export class ReadonlyList<TElement> extends AbstractReadonlyCollection<TElement> implements IReadonlyList<TElement> {
    private readonly list: IList<TElement>;

    public constructor(list: IList<TElement>) {
        super(list.comparator);
        this.list = list;
        this.updateLength();
    }

    * [Symbol.iterator](): Iterator<TElement> {
        yield* this.list;
    }

    public override contains(element: TElement, comparator?: EqualityComparator<TElement>): boolean {
        return this.list.contains(element, comparator);
    }

    public override containsAll<TSource extends TElement>(collection: Iterable<TSource>): boolean {
        return this.list.containsAll(collection);
    }

    public* entries(): IterableIterator<[number, TElement]> {
        yield* this.list.entries();
    }

    public get(index: number): TElement {
        return this.list.get(index);
    }

    public getRange(index: number, count: number): IReadonlyList<TElement> {
        return this.list.getRange(index, count);
    }

    public indexOf(element: TElement, comparator?: EqualityComparator<TElement>): number {
        return this.list.indexOf(element, comparator);
    }

    public lastIndexOf(element: TElement, comparator?: EqualityComparator<TElement>): number {
        return this.list.lastIndexOf(element, comparator);
    }

    public override get length(): number {
        return this.list.length;
    }

    public override size(): number {
        return this.list.size();
    }
}