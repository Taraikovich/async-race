export function getCurrntPage(): string {
    let currentPage = localStorage.getItem('currentPage');
    if (!currentPage) currentPage = '1';
    return currentPage;
}

export function setCurrntPage(page: string): void {
    localStorage.setItem('currentPage', page);
}