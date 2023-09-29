export type Winners = {
    id: number,
    wins: number,
    time: number
};

export async function getWinnersCount(): Promise<number> {
    const res = await fetch('http://127.0.0.1:3000/winners');
    const data = await res.json();
    return data.length;
}