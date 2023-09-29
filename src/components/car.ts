import { carSvg } from "../images/carSvg";
import { Car } from "../api/getCars";

export class CarTempelate {

    carName: string;

    carColor: string;

    carID: number;

    constructor(carObject: Car) {
        this.carName = carObject.name;
        this.carColor = carObject.color;
        this.carID = carObject.id;
    }

    addCar(): HTMLElement {
        const carWrapper = document.createElement('div');
        carWrapper.className = 'car-wrapper';
        carWrapper.id = `${this.carID}`;
        carWrapper.append(
            this.addDelBtn(),
            this.addSelectBtn(),
            this.addStartBtn(),
            this.addStopBtn(),
            this.addCarName(),
            this.addCarImg()
        );
        return carWrapper;
    }

    private addCarName(): HTMLElement {
        const carName = document.createElement('div');
        carName.className = 'car-name';
        carName.textContent = this.carName;
        return carName;
    }

    private addCarImg(): HTMLElement {
        const carImg = document.createElement('div');
        carImg.innerHTML = carSvg(this.carColor);
        return carImg;
    }

    private addDelBtn(): HTMLButtonElement {
        const delBtn = document.createElement('button');
        delBtn.textContent = 'delete';
        return delBtn;
    }

    private addSelectBtn(): HTMLButtonElement {
        const selectBtn = document.createElement('button');
        selectBtn.textContent = 'select';
        return selectBtn;
    }

    private addStartBtn(): HTMLButtonElement {
        const startBtn = document.createElement('button');
        startBtn.textContent = 'start';
        return startBtn;
    }

    private addStopBtn(): HTMLButtonElement {
        const stopBtn = document.createElement('button');
        stopBtn.textContent = 'stop';
        stopBtn.disabled = true;
        return stopBtn;
    }
}