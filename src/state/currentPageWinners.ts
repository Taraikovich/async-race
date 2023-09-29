export function getCurrntPageWinners(): string {
    let currentPage = localStorage.getItem('currentPageWinners');
    if (!currentPage) currentPage = '1';
    return currentPage;
}

export function setCurrntPageWinners(page: string): void {
    localStorage.setItem('currentPageWinners', page);
}