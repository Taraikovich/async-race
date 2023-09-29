export class View {

    h1: HTMLElement = document.createElement('h1');

    h2: HTMLElement = document.createElement('h2');

    nav: HTMLElement = document.createElement('nav');

    main: HTMLElement = document.createElement('main');

    paginationNav: HTMLElement = document.createElement('nav');

    addView(): void {
        document.body.append(this.nav);
        document.body.append(this.h1);
        document.body.append(this.h2);
        document.body.append(this.main);
        document.body.append(this.paginationNav);
    }

    removeView(): void {
        this.h1.remove();
        this.h2.remove();
        this.nav.remove();
        this.main.remove();
        this.paginationNav.remove();
    }
}