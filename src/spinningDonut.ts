import { $ } from './utils/funcs'

export class SpinningDonut {
    element
    timer!: number | null
    a
    b
    z!: Array<number>
    screen!: Array<string>
    sinA!: number
    cosA!: number
    cosB!: number
    sinB!: number
    sinI!: number
    cosI!: number
    cosJ!: number
    sinJ!: number
    cosJ2!: any
    d!: number
    t!: number
    x!: number
    y!: number
    o!: any
    N!: number

    constructor(element: string) {
        this.element = $<HTMLDivElement>(element)
        this.timer = null
        this.a = 0
        this.b = 0
        this.renderFrame()
    }

    renderFrame() {
        this.z = []
        this.screen = []
        this.a += 0.07
        this.b += 0.03
        const width = 80
        const height = 26

        for (let k = 0; k < height * width; k++) {
            this.screen[k] = k % width == 79 ? '\n' : ' '
            this.z[k] = 0
        }

        for (let j = 0; j < 6.28; j += 0.07) {
            for (let i = 0; i < 6.28; i += 0.04) {
                this.sinA = Math.sin(this.a)
                this.cosA = Math.cos(this.a)
                this.cosB = Math.cos(this.b)
                this.sinB = Math.sin(this.b)

                this.sinI = Math.sin(i)
                this.cosI = Math.cos(i)
                this.cosJ = Math.cos(j)
                this.sinJ = Math.sin(j)

                this.cosJ2 = this.cosJ + 2
                this.d =
                    1 /
                    (this.sinI * this.cosJ2 * this.sinA +
                        this.sinJ * this.cosA +
                        5)
                this.t =
                    this.sinI * this.cosJ2 * this.cosA - this.sinJ * this.sinA

                this.x = Math.round(
                    40 +
                        30 *
                            this.d *
                            (this.cosI * this.cosJ2 * this.cosB -
                                this.t * this.sinB)
                )

                this.y = Math.round(
                    12 +
                        15 *
                            this.d *
                            (this.cosI * this.cosJ2 * this.sinB +
                                this.t * this.cosB)
                )

                this.o = this.x + width * this.y
                this.N = Math.round(
                    8 *
                        ((this.sinJ * this.sinA -
                            this.sinI * this.cosJ * this.cosA) *
                            this.cosB -
                            this.sinI * this.cosJ * this.sinA -
                            this.sinJ * this.cosA -
                            this.cosI * this.cosJ * this.sinB)
                )

                if (
                    0 <= this.y &&
                    this.y < height &&
                    0 <= this.x &&
                    this.x < width &&
                    this.z[this.o] < this.d
                ) {
                    this.z[this.o] = this.d
                    this.screen[this.o] = '.,-~:;=!*#$@'[
                        this.N > 0 ? this.N : 0
                    ]
                }
            }
        }

        console.log(this.element)

        this.element.innerHTML = this.screen.join('')
    }

    animate() {
        if (this.timer === null) {
            this.timer = setInterval(() => {
                this.renderFrame()
            }, 0.05 * 1000)
        } else {
            clearInterval(this.timer)
            this.timer = null
        }
    }
}
