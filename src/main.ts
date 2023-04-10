import { SpinningDonut } from './spinningDonut'
import './style.css'
import { $ } from './utils/funcs'

$<HTMLDivElement>('#app').innerHTML = `
    <div id="donut"></div>
    <button class="toggle-btn">Spin Donut</button>
`

let toggled = false

window.addEventListener('DOMContentLoaded', () => {
    const donut = new SpinningDonut('#donut')
    const toggleSpin = $<HTMLButtonElement>('.toggle-btn')

    toggleSpin.addEventListener('click', () => {
        if (toggled) {
            toggleSpin.innerHTML = 'Spin Donut'
            donut.timer = false
            toggled = false
        } else {
            toggleSpin.innerHTML = 'Stop Donut'
            donut.timer = true
            toggled = true
        }
        donut.animate()
    })
})
