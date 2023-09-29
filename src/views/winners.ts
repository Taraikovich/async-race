import { carSvg } from "../images/carSvg";
import { getCar } from "../api/getCars";
import { getWinners } from "../api/getWinners";
import { getWinnersCount } from "../api/getWinnersCount";
import { View } from "./view";
import { getCurrntPageWinners, setCurrntPageWinners } from "../state/currentPageWinners";
import { winnersPerPage } from "../utils/constants";

export class Winners extends View {
    sortProp: string[] = ['id', 'ASC']

    constructor() {
        super();
        this.addH1Text();
        this.addH2Text();
        this.addTable();
        this.addPagination();
    }

    async addH1Text(): Promise<void> {
        const winnersCount = await getWinnersCount();
        this.h1.textContent = `Winners (${winnersCount})`
    }

    private async addH2Text(): Promise<void> {
        this.h2.textContent = `Page #${getCurrntPageWinners()}`;
    }

    async addTable(
        page = Number(getCurrntPageWinners()),
        carsOnPage = winnersPerPage,
        sort = this.sortProp[0],
        order = this.sortProp[1]
    ): Promise<void> {
        const table = document.createElement('table');
        const tableHeader = document.createElement('thead');
        const row = document.createElement('tr');
        const carId = document.createElement('td');
        carId.textContent = 'ID';
        const carImg = document.createElement('td');
        carImg.textContent = 'Car';
        const carName = document.createElement('td');
        carName.textContent = 'Name';
        const carWins = document.createElement('td');
        carWins.textContent = 'Wins';
        const carTime = document.createElement('td');
        carTime.textContent = 'Best time';
        row.append(carId, carImg, carName, carWins, carTime);
        tableHeader.append(row);
        table.append(tableHeader);
        this.main.append(table);

        let tbody = await this.getTableBody(page, carsOnPage, sort, order);
        table.append(tbody);

        carId.addEventListener('click', async () => {
            this.sortProp[0] = 'id';
            this.sortProp[1] = (this.sortProp[1] === 'ASC') ? 'DESC' : 'ASC';
            carId.textContent = (this.sortProp[1] === 'ASC') ? 'ID ▲' : 'ID ▼';
            carTime.textContent = 'Best time';
            carWins.textContent = 'wins';
            const currentPage = Number(getCurrntPageWinners());
            const newtbody = await this.getTableBody(currentPage, winnersPerPage, this.sortProp[0], this.sortProp[1]);
            tbody.remove();
            tbody = newtbody;
            table.append(tbody);
        });

        carWins.addEventListener('click', async () => {
            this.sortProp[0] = 'wins';
            this.sortProp[1] = (this.sortProp[1] === 'ASC') ? 'DESC' : 'ASC';
            carWins.textContent = (this.sortProp[1] === 'ASC') ? 'wins ▲' : 'wins ▼';
            carTime.textContent = 'Best time';
            carId.textContent = 'ID';
            const currentPage = Number(getCurrntPageWinners());
            const newtbody = await this.getTableBody(currentPage, winnersPerPage, this.sortProp[0], this.sortProp[1]);
            tbody.remove();
            tbody = newtbody;
            table.append(tbody);
        });

        carTime.addEventListener('click', async () => {
            this.sortProp[0] = 'time';
            this.sortProp[1] = (this.sortProp[1] === 'ASC') ? 'DESC' : 'ASC';
            carWins.textContent = 'wins';
            carTime.textContent = (this.sortProp[1] === 'ASC') ? 'Best time ▲' : 'Best time ▼';
            carId.textContent = 'ID';
            const currentPage = Number(getCurrntPageWinners());
            const newtbody = await this.getTableBody(currentPage, winnersPerPage, this.sortProp[0], this.sortProp[1]);
            tbody.remove();
            tbody = newtbody;
            table.append(tbody);
        });
    }

    async getTableBody(
        page: number,
        limit: number,
        sort: string,
        order: string
    ): Promise<HTMLElement> {
        const tableBody = document.createElement('tbody');
        const data = await getWinners(page, limit, sort, order);
        data.forEach(async item => {
            const car = await getCar(item.id);
            const row = document.createElement('tr');
            const tds = `
            <td>${item.id}</td>
            <td>${carSvg(car.color)}</td>
            <td>${car.name}</td>
            <td>${item.wins}</td>
            <td>${item.time}</td>`;
            row.innerHTML = tds;
            tableBody.append(row);
        })
        return tableBody;
    }

    addPagination(): void {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'prev';
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'next';
        this.paginationNav.append(prevBtn, nextBtn);

        const disabler = async () => {
            const winners = await getWinnersCount();
            if (getCurrntPageWinners() === '1') {
                prevBtn.disabled = true;
            } else {
                prevBtn.disabled = false;
            }
            if (Number(getCurrntPageWinners()) >= winners / winnersPerPage) {
                nextBtn.disabled = true;
            } else {
                nextBtn.disabled = false;
            }
        };
        disabler();

        nextBtn.addEventListener('click', () => {
            this.main.innerHTML = '';
            const currentPage = String(Number(getCurrntPageWinners()) + 1);
            setCurrntPageWinners(currentPage);
            this.addTable();
            this.addH2Text();
            disabler();
        })

        prevBtn.addEventListener('click', () => {
            this.main.innerHTML = '';
            const currentPage = String(Number(getCurrntPageWinners()) - 1);
            setCurrntPageWinners(currentPage);
            this.addH2Text();
            this.addTable(Number(currentPage))
            disabler();
        })
    }
}

