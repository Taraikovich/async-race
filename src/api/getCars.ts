import { getCurrntPage } from "../state/currentPage";

export type Car = {
    name: string,
    color: string,
    id: number
};

export async function getCars(): Promise<Car[]> {
    const res = await fetch('http://127.0.0.1:3000/garage');
    const data = await res.json();
    return data;
}

export async function getCarsPage(): Promise<Car[]> {
    const currentPage = getCurrntPage();
    const res = await fetch(`http://127.0.0.1:3000/garage?_limit=7&_page=${currentPage}`);
    const data = await res.json();
    return data;
}

export async function getFirstCarNextPage(): Promise<Car> {
    const currentPage = Number(getCurrntPage()) + 1;
    const res = await fetch(`http://127.0.0.1:3000/garage?_limit=7&_page=${currentPage}`);
    const data = await res.json();
    return data[0];
}

export async function getCar(id: number): Promise<Car> {
    const res = await fetch(`http://127.0.0.1:3000/garage/${id}`);
    const data = await res.json();
    return data;
}