/*
 * ************************************************************************************
 * @license
 * Simple Vanilla Number Roller <https://github.com/chuot/simple-vanilla-number-roller>
 * Copyright (C) 2022 Chrystian Huot <chrystian.huot@saubeo.solutions>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 * ************************************************************************************
 */

class SimpleVanillaNumberRoller {
    #config;
    #counter;
    #digitsLength;
    #element;
    #running;

    get #speed() {
        const a = this.#counter - this.#config.countTo;
        const b = Math.abs(this.#config.countFrom - this.#config.countTo);
        const c = Math.abs(this.#config.speedFrom - this.#config.speedTo);
        const d = Math.min(this.#config.speedFrom, this.#config.speedTo);
        return Math.round(a / b * c + d);
    }

    constructor(element, options) {
        if (element instanceof HTMLElement)
            this.#element = element;
        else
            throw 'element is not an instanceof HTMLElement';

        this.#config = {
            autoStart: typeof options?.autoStart === 'boolean' ? options.autoStart : SimpleVanillaNumberRoller.defaultConfig.autoStart,
            autoStartDelay: typeof options?.autoStartDelay === 'number' ? Math.abs(options.autoStartDelay) : SimpleVanillaNumberRoller.defaultConfig.autoStartDelay,
            countFrom: typeof options?.countFrom === 'number' ? Math.abs(options.countFrom) : SimpleVanillaNumberRoller.defaultConfig.countFrom,
            countTo: typeof options?.countTo === 'number' ? Math.abs(options.countTo) : SimpleVanillaNumberRoller.defaultConfig.countTo,
            onCompleted: typeof options?.onCompleted === 'function' ? options.onCompleted : SimpleVanillaNumberRoller.defaultConfig.onCompleted,
            speedFrom: typeof options?.speedFrom === 'number' ? Math.abs(options.speedFrom) : SimpleVanillaNumberRoller.defaultConfig.speedFrom,
            speedTo: typeof options?.speedTo === 'number' ? Math.abs(options.speedTo) : SimpleVanillaNumberRoller.defaultConfig.speedTo,
            to: typeof options?.to === 'number' ? options.to : SimpleVanillaNumberRoller.defaultConfig.to,
        };

        this.#counter = this.#config.countFrom;

        this.#digitsLength = Math.max(this.#config.countFrom.toString().length, this.#config.countTo.toString().length);

        this.#element.innerHTML = ''.padStart(this.#digitsLength, '0');

        Object.assign(this.#element.style, {
            display: 'inline-flex',
            height: `${this.#element.offsetHeight}px`,
            lineHeight: 'normal',
            overflow: 'hidden',
            textAlign: 'start',
            verticalAlign: 'text-top',
            width: `${this.#element.offsetWidth}px`,
        });

        this.#element.innerHTML = '';

        this.#buildDigits();

        if (this.#config.autoStart)
            setTimeout(() => this.start(), this.#config.autoStartDelay);
    }

    start() {
        this.#running = true;

        this.#tick();
    }

    stop() {
        this.#running = false;
    }

    #buildDigits() {
        const digits = this.#getDigits();
        const height = this.#element.offsetHeight;
        const radius = Math.sqrt(height ** 2 + height ** 2);

        while (this.#element.children.length)
            this.#element.removeChild(this.#element.lastElementChild);

        for (let i = 0; i < this.#digitsLength; i++) {
            const group = document.createElement('span');

            if (i == this.#digitsLength - 1)
                group.ontransitionend = () => this.#tick();

            Object.assign(group.style, {
                position: 'relative',
                transform: `rotateX(${digits[i] * 36}deg)`,
                transformStyle: 'preserve-3d',
                width: '100%',
            });

            for (let j = 0; j < 10; j++) {
                const digit = document.createElement('span');

                Object.assign(digit.style, {
                    backfaceVisibility: 'hidden',
                    height: `${this.#element.offsetHeight}px`,
                    position: 'absolute',
                    transform: `rotateX(${j * -36}deg) translateZ(${radius}px)`,
                });

                digit.innerHTML = j.toString();

                group.appendChild(digit);
            }

            this.#element.appendChild(group);
        }
    }

    #getDigits() {
        return this.#counter.toString().padStart(this.#digitsLength, '0');
    }

    #tick() {
        const previousDigits = this.#getDigits();

        for (let i = 0; i < this.#digitsLength; i++)
            Object.assign(this.#element.children.item(i).style, {
                transform: `rotateX(${previousDigits[i] * 36}deg)`,
                transition: '',
            });

        if (this.#running)
            setTimeout(() => {
                if (this.#counter < this.#config.countTo)
                    this.#counter++;

                else if (this.#counter > this.#config.countTo)
                    this.#counter--;

                else {
                    this.#config.onCompleted();

                    return;
                }

                const nextDigits = this.#getDigits();

                for (let i = 0; i < this.#digitsLength; i++) {
                    let angle = nextDigits[i] * 36;

                    if (previousDigits[i] == 0) {
                        if (nextDigits[i] == 9)
                            angle = -36;

                    } else if (previousDigits[i] == 9) {
                        if (nextDigits[i] == 0)
                            angle = -36;
                    }

                    Object.assign(this.#element.children.item(i).style, {
                        transform: `rotateX(${angle}deg)`,
                        transition: `transform ${this.#speed}ms linear`,
                    });
                }
            }, this.#speed);
    }
}

SimpleVanillaNumberRoller.defaultConfig = {
    autoStart: true,
    autoStartDelay: 0,
    countFrom: 100,
    countTo: 0,
    onCompleted: () => { },
    speedFrom: 100,
    speedTo: 50,
};
