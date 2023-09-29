import { CarTempelate } from "../components/car";
import { getCars, getCarsPage, getFirstCarNextPage, getCar } from "../api/getCars";
import { View } from "./view";
import { createCar } from "../api/createCar";
import { deleteCar } from "../api/deleteCar";
import { updateCar } from "../api/updateCar";
import { getRandomCarName } from "../utils/randomCarName";
import { getRandomColorHex } from "../utils/randomColor";
import { getCurrntPage, setCurrntPage } from "../state/currentPage";
import { startCarEngin } from "../api/startCar";
import { driveMode } from "../api/driveMode";
import { getWinner } from "../api/getWinner";
import { Winner, updateWinner } from "../api/updateWinner";
import { NewWinner, createWinner } from "../api/createWinner";
import { deleteWinner } from "../api/deleteWinner";
import { carsPerPage } from "../utils/constants";

export class Garage extends View {

    private selectedCar: number | null = null;

    constructor() {
        super();
        this.addH1Text();
        this.addH2Text();
        this.addCars();
        this.createCar();
        this.updateeCar();
        this.generateCars();
        this.startRace();
        this.resetRace();
        this.carEvents();
        this.addPagination();
    }

    private async addH1Text(): Promise<void> {
        const carCount = await getCars();
        this.h1.textContent = `Garage (${carCount.length})`
    }

    private async addH2Text(): Promise<void> {
        this.h2.textContent = `Page #${getCurrntPage()}`
    }

    private async addCars(): Promise<void> {
        const cars = await getCarsPage();
        cars.forEach(item => {
            const car = new CarTempelate(item);
            this.main.append(car.addCar());
        })
    }

    private addPagination(): void {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'prev';
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'next';
        this.paginationNav.append(prevBtn, nextBtn);

        const disabler = async () => {
            if (getCurrntPage() === '1') {
                prevBtn.disabled = true;
            } else {
                prevBtn.disabled = false;
            }
            if (Number(getCurrntPage()) >= (await getCars()).length / carsPerPage) {
                nextBtn.disabled = true;
            } else {
                nextBtn.disabled = false;
            }
        };
        disabler();

        nextBtn.addEventListener('click', () => {
            this.main.innerHTML = '';
            const currentPage = (Number(getCurrntPage()) + 1).toString();
            setCurrntPage(currentPage);
            this.addCars();
            this.addH2Text();
            disabler();
        })

        prevBtn.addEventListener('click', () => {
            this.main.innerHTML = '';
            const currentPage = (Number(getCurrntPage()) - 1).toString();
            setCurrntPage(currentPage);
            this.addH2Text();
            this.addCars();
            disabler();
        })
    }

    getSelectedCar(): number | null {
        return this.selectedCar;
    }

    setSelectedCar(event: MouseEvent): void {
        if (event.target instanceof HTMLButtonElement &&
            event.target.textContent === 'select' &&
            event.target.parentNode instanceof HTMLElement) {
            this.selectedCar = Number(event.target.parentNode.id);
        }
    }

    private createCar(): void {
        const form = document.createElement('div');

        const inputName = document.createElement('input');
        inputName.type = 'text';
        const inputColor = document.createElement('input');
        inputColor.type = 'color';
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'create';

        form.append(inputName, inputColor, submitBtn);
        this.nav.append(form);

        submitBtn.addEventListener('click', async () => {
            const car = {
                "name": inputName.value,
                "color": inputColor.value
            }

            const newCar = new CarTempelate(await createCar(car));
            const nextBtn = this.paginationNav.childNodes[1] as HTMLButtonElement;
            if (this.main.childNodes.length === carsPerPage) nextBtn.disabled = false;
            if (this.main.childNodes.length < carsPerPage) this.main.append(newCar.addCar());
            this.addH1Text();
        })
    }

    private updateeCar(): void {
        const form = document.createElement('div');

        const inputName = document.createElement('input');
        inputName.type = 'text';
        const inputColor = document.createElement('input');
        inputColor.type = 'color';
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'update';

        form.append(inputName, inputColor, submitBtn);
        this.nav.append(form);

        submitBtn.addEventListener('click', async () => {
            const car = {
                "name": inputName.value,
                "color": inputColor.value
            }

            const selectedCarId: number | null = this.getSelectedCar();
            if (selectedCarId !== null) {
                const updatedCar = (new CarTempelate(await updateCar(selectedCarId, car))).addCar();
                const selectedCar = document.getElementById(`${selectedCarId}`) as HTMLElement;
                this.main.replaceChild(updatedCar, selectedCar);
            }
        })
    }

    private generateCars(): void {
        const generateBtn = document.createElement('button');
        generateBtn.textContent = 'generate';

        this.nav.append(generateBtn);

        generateBtn.addEventListener('click', async () => {
            const nextBtn = this.paginationNav.childNodes[1] as HTMLButtonElement;
            nextBtn.disabled = false;
            for (let i = 0; i < 100; i++) {
                const car = {
                    "name": `${getRandomCarName()}`,
                    "color": `${getRandomColorHex()}`
                }
                const newCar = new CarTempelate(await createCar(car));
                if (this.main.childNodes.length < carsPerPage) this.main.append(newCar.addCar());
                this.addH1Text();
            }
        })
    }

    private async startRace(): Promise<void> {
        const raceBtn = document.createElement('button');

        raceBtn.textContent = 'race';
        this.nav.append(raceBtn);
        const cars = this.main.childNodes;

        raceBtn.addEventListener('click', async () => {
            const promises: Promise<{
                time: number;
                id: string;
            }>[] = [];

            cars.forEach(async item => {
                if (item instanceof HTMLElement) {
                    raceBtn.disabled = true;
                    const startBtn = item.childNodes[2] as HTMLButtonElement;
                    startBtn.disabled = true;
                    const stopBtn = item.childNodes[3] as HTMLButtonElement;
                    stopBtn.disabled = false;
                    const carID = item.id;
                    const action = 'started';
                    const car = item.childNodes[5].firstChild as HTMLElement;

                    const timePromise = startCarEngin(carID, action)
                        .then(async (time) => {
                            car.style.transition = `all ${time}s linear`;
                            car.style.transform = `translateX(${document.body.clientWidth - 50}px)`;
                            const engine = await driveMode(carID);
                            if (engine === 'engine stopped') {
                                const stopPosition = window.getComputedStyle(car).getPropertyValue('transform').split(', ')[4];
                                car.style.transition = `all 0s linear`;
                                car.style.transform = `translateX(${stopPosition}px)`;
                                await new Promise<void>(resolve => {
                                    setTimeout(async () => {
                                        await startCarEngin(carID, 'stopped');
                                        resolve();
                                    }, 20000);
                                });
                            }

                            return {
                                time: time,
                                id: carID,
                            };
                        });

                    promises.push(timePromise);

                }
            });
            const result = await Promise.race(promises);
            const car = await getCar(Number(result.id))
            this.winnerPopUp(car.name, result.time);
            this.createWinner(car.id, result.time);
        });


    }

    private winnerPopUp(carName: string, time: number): void {
        const container = document.createElement('div');
        container.className = 'winner-popup';
        container.textContent = `${carName} went first (${time}s)`;
        this.main.append(container);
    }

    private async createWinner(carID: number, time: number): Promise<void> {
        const winner = await getWinner(carID);
        if (winner.id) {
            if (winner.time > time) {
                const winnerObject: Winner = {
                    "wins": winner.wins + 1,
                    "time": time
                }
                updateWinner(winner.id, winnerObject);
            } else {
                const winnerObject: Winner = {
                    "wins": winner.wins + 1,
                    "time": winner.time
                }
                updateWinner(winner.id, winnerObject);
            }
        } else {
            const winnerObject: NewWinner = {
                "id": carID,
                "wins": 1,
                "time": time
            }
            createWinner(winnerObject);
        }
    }


    private resetRace(): void {
        const resetBtn = document.createElement('button');
        const raceBtn = this.nav.childNodes[3] as HTMLButtonElement;
        resetBtn.textContent = 'reset';
        this.nav.append(resetBtn);

        resetBtn.addEventListener('click', () => {
            const cars = this.main.childNodes;
            if (this.main.lastChild instanceof HTMLElement &&
                this.main.lastChild.classList.contains('winner-popup')) {
                this.main.lastChild.remove();
            }
            cars.forEach(async item => {
                if (item instanceof HTMLElement) {
                    const startBtn = item.childNodes[2] as HTMLButtonElement;
                    const stopBtn = item.childNodes[3] as HTMLButtonElement;
                    stopBtn.disabled = true;
                    const carID = item.id;
                    const action = 'stopped';
                    const car = item.childNodes[5].firstChild as HTMLElement;
                    await startCarEngin(carID, action);
                    car.style.transition = `all 0s linear`;
                    car.style.transform = `translateX(0px)`;
                    startBtn.disabled = false;
                    raceBtn.disabled = false;
                }
            })
        })
    }

    private carEvents(): void {
        this.main.addEventListener('click', (e) => {
            this.removeCar(e);
            this.setSelectedCar(e);
            this.startCar(e);
            this.stopCar(e);
        })
    }

    private async removeCar(event: MouseEvent): Promise<void> {
        if (event.target instanceof HTMLButtonElement &&
            event.target.textContent === 'delete' &&
            event.target.parentNode instanceof HTMLElement) {

            event.target.parentNode.remove();
            const nextBtn = this.paginationNav.childNodes[1] as HTMLButtonElement;
            if (Number(getCurrntPage()) < (await getCars()).length / carsPerPage) {
                const newCar = (new CarTempelate(await getFirstCarNextPage())).addCar();
                this.main.append(newCar);
            }
            await deleteCar(Number(event.target.parentNode.id));
            deleteWinner(Number(event.target.parentNode.id));
            this.addH1Text();
            if (Number(getCurrntPage()) === (await getCars()).length / carsPerPage) nextBtn.disabled = true;
        }
    }

    private async startCar(event: MouseEvent): Promise<void> {
        if (event.target instanceof HTMLButtonElement &&
            event.target.textContent === 'start' &&
            event.target.parentNode instanceof HTMLElement &&
            event.target.parentNode.childNodes[5] instanceof HTMLElement) {

            const startBtn = event.target;
            const stoptBtn = event.target.parentNode.childNodes[3] as HTMLButtonElement;
            stoptBtn.disabled = false;
            startBtn.disabled = true;
            const carID = event.target.parentNode.id;
            const action = 'started';
            const car = event.target.parentNode.childNodes[5].firstChild as HTMLElement;
            car.style.transition = `all ${await startCarEngin(carID, action)}s linear`;
            car.style.transform = `translateX(${document.body.clientWidth - 50}px)`;
            const engine = await driveMode(carID);
            if (engine === 'engine stopped') {
                const stopPosition = window.getComputedStyle(car).getPropertyValue('transform').split(', ')[4];
                car.style.transition = `all 0s linear`;
                car.style.transform = `translateX(${stopPosition}px)`;
            }
        }
    }

    private async stopCar(event: MouseEvent): Promise<void> {
        if (event.target instanceof HTMLButtonElement &&
            event.target.textContent === 'stop' &&
            event.target.parentNode instanceof HTMLElement &&
            event.target.parentNode.childNodes[5] instanceof HTMLElement) {

            const startBtn = event.target.parentNode.childNodes[2] as HTMLButtonElement;
            const stopBtn = event.target;
            stopBtn.disabled = true;
            const carID = event.target.parentNode.id;
            const action = 'stopped';
            const car = event.target.parentNode.childNodes[5].firstChild as HTMLElement;
            await startCarEngin(carID, action);
            car.style.transition = `all 0s linear`;
            car.style.transform = `translateX(0px)`;
            startBtn.disabled = false;
        }
    }


}