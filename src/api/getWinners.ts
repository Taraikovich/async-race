export type Winners = {
    id: number,
    wins: number,
    time: number
};

export async function getWinners(page: number, limit: number, sort: string, orger: string): Promise<Winners[]> {
    const res = await fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${orger}`);
    const data = await res.json();
    return data
}