import { Winners } from "../views/winners";
import { Garage } from "../views/garage";

export class SelectView {

    private garageBtn: HTMLButtonElement = document.createElement('button');

    private winnersBtn: HTMLButtonElement = document.createElement('button');

    private garage = new Garage();

    private winners = new Winners();

    constructor() {
        this.garageBtn.textContent = 'garage';
        this.winnersBtn.textContent = 'winners';
        document.body.append(this.garageBtn);
        document.body.append(this.winnersBtn);
        this.garage.addView();
        this.changeView();
    }

    private changeView(): void {
        this.garageBtn.addEventListener('click', () => {
            this.winners.removeView();
            this.garage.addView();
        });
        this.winnersBtn.addEventListener('click', () => {
            this.garage.removeView();
            this.winners.addView();
            this.winners.main.innerHTML = '';
            this.winners.addH1Text();
            this.winners.addTable();
            this.winners.paginationNav.innerHTML = '';
            this.winners.addPagination();
        });
    }
}