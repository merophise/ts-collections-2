import {IEnumerable} from "./IEnumerable";
import {Enumerable} from "./Enumerable";
import {EqualityComparator} from "../shared/EqualityComparator";
import {Accumulator} from "../shared/Accumulator";
import {Selector} from "../shared/Selector";
import {Predicate} from "../shared/Predicate";
import {List} from "../list/List";
import {IndexedPredicate} from "../shared/IndexedPredicate";

export class EnumerableStatic {
    public static aggregate<TElement, TAccumulate, TResult>(source: IEnumerable<TElement>, accumulator: Accumulator<TElement, TAccumulate>, seed?: TAccumulate, resultSelector?: Selector<TAccumulate, TResult>): TAccumulate | TResult {
        return new Enumerable(source).aggregate(accumulator, seed, resultSelector);
    }

    public static all<TElement>(source: IEnumerable<TElement>, predicate?: Predicate<TElement>): boolean {
        return new Enumerable(source).all(predicate);
    }

    public static any<TElement>(source: IEnumerable<TElement>, predicate?: Predicate<TElement>): boolean {
        return new Enumerable(source).any(predicate);
    }

    public static append<TElement>(source: IEnumerable<TElement>, element: TElement): IEnumerable<TElement> {
        return new Enumerable(source).append(element);
    }

    public static average<TElement>(source: IEnumerable<TElement>, selector?: Selector<TElement, number>): number {
        return new Enumerable(source).average(selector);
    }

    public static concat<TElement>(source: IEnumerable<TElement>, enumerable: IEnumerable<TElement>): IEnumerable<TElement> {
        return new Enumerable(source).concat(enumerable);
    }

    public static contains<TElement>(source: IEnumerable<TElement>, element: TElement, comparator?: EqualityComparator<TElement>): boolean {
        return new Enumerable(source).contains(element, comparator);
    }

    public static count<TElement>(source: IEnumerable<TElement>, predicate?: Predicate<TElement>): number {
        return new Enumerable(source).count(predicate);
    }

    public static defaultIfEmpty<TElement>(source: IEnumerable<TElement>, value?: TElement): IEnumerable<TElement> {
        return new Enumerable(source).defaultIfEmpty(value);
    }

    public static distinct<TElement>(source: IEnumerable<TElement>, comparator?: EqualityComparator<TElement>): IEnumerable<TElement> {
        return new Enumerable(source).distinct(comparator);
    }

    public static elementAt<TElement>(source: IEnumerable<TElement>, index: number): TElement {
        return new Enumerable(source).elementAt(index);
    }

    public static elementAtOrDefault<TElement>(source: IEnumerable<TElement>, index: number): TElement {
        return new Enumerable(source).elementAtOrDefault(index);
    }

    public static except<TElement>(source: IEnumerable<TElement>, enumerable: IEnumerable<TElement>, comparator?: EqualityComparator<TElement>): IEnumerable<TElement> {
        return new Enumerable(source).except(enumerable, comparator);
    }

    public static first<TElement>(source: IEnumerable<TElement>, predicate?: Predicate<TElement>): TElement {
        return new Enumerable(source).first(predicate);
    }

    public static firstOrDefault<TElement>(source: IEnumerable<TElement>, predicate?: Predicate<TElement>): TElement {
        return new Enumerable(source).firstOrDefault(predicate);
    }

    public static intersect<TElement>(source: IEnumerable<TElement>, enumerable: IEnumerable<TElement>, comparator?: EqualityComparator<TElement>): IEnumerable<TElement> {
        return new Enumerable(source).intersect(enumerable, comparator);
    }

    public static last<TElement>(source: IEnumerable<TElement>, predicate?: Predicate<TElement>): TElement {
        return new Enumerable(source).last(predicate);
    }

    public static lastOrDefault<TElement>(source: IEnumerable<TElement>, predicate?: Predicate<TElement>): TElement {
        return new Enumerable(source).lastOrDefault(predicate);
    }

    public static max<TElement>(source: IEnumerable<TElement>, selector?: Selector<TElement, number>): number {
        return new Enumerable(source).max(selector);
    }

    public static min<TElement>(source: IEnumerable<TElement>, selector?: Selector<TElement, number>): number {
        return new Enumerable(source).min(selector);
    }

    public static prepend<TElement>(source: IEnumerable<TElement>, item: TElement): IEnumerable<TElement> {
        return new Enumerable(source).prepend(item);
    }

    public static reverse<TElement>(source: IEnumerable<TElement>): IEnumerable<TElement> {
        return new Enumerable(source).reverse();
    }

    public static select<TElement, TResult>(source: IEnumerable<TElement>, selector: Selector<TElement, TResult>): IEnumerable<TResult> {
        return new Enumerable(source).select(selector);
    }

    public static sequenceEqual<TElement>(source: IEnumerable<TElement>, enumerable: IEnumerable<TElement>, comparator?: EqualityComparator<TElement>): boolean {
        return new Enumerable(source).sequenceEqual(enumerable, comparator);
    }

    public static single<TElement>(source: IEnumerable<TElement>, predicate?: Predicate<TElement>): TElement {
        return new Enumerable(source).single(predicate);
    }

    public static singleOrDefault<TElement>(source: IEnumerable<TElement>, predicate?: Predicate<TElement>): TElement {
        return new Enumerable(source).singleOrDefault(predicate);
    }

    public static skip<TElement>(source: IEnumerable<TElement>, count: number): IEnumerable<TElement> {
        return new Enumerable(source).skip(count);
    }

    public static skipLast<TElement>(source: IEnumerable<TElement>, count: number): IEnumerable<TElement> {
        return new Enumerable(source).skipLast(count);
    }

    public static skipWhile<TElement>(source: IEnumerable<TElement>, predicate?: IndexedPredicate<TElement>): IEnumerable<TElement> {
        return new Enumerable(source).skipWhile(predicate);
    }

    public static sum<TElement>(source: IEnumerable<TElement>, selector?: Selector<TElement, number>): number {
        return new Enumerable(source).sum(selector);
    }

    public static take<TElement>(source: IEnumerable<TElement>, count: number): IEnumerable<TElement> {
        return new Enumerable(source).take(count);
    }

    public static takeLast<TElement>(source: IEnumerable<TElement>, count: number): IEnumerable<TElement> {
        return new Enumerable(source).takeLast(count);
    }

    public static takeWhile<TElement>(source: IEnumerable<TElement>, predicate?: IndexedPredicate<TElement>): IEnumerable<TElement> {
        return new Enumerable(source).takeWhile(predicate);
    }

    public static toArray<TElement>(source: IEnumerable<TElement>): TElement[] {
        return new Enumerable(source).toArray();
    }

    public static toList<TElement>(source: IEnumerable<TElement>): List<TElement> {
        return new Enumerable(source).toList();
    }

    public static union<TElement>(source: IEnumerable<TElement>, enumerable: IEnumerable<TElement>, comparator?: EqualityComparator<TElement>): IEnumerable<TElement> {
        return new Enumerable(source).union(enumerable, comparator);
    }

    public static where<TElement>(source: IEnumerable<TElement>, predicate: IndexedPredicate<TElement>): IEnumerable<TElement> {
        return new Enumerable(source).where(predicate);
    }
}
