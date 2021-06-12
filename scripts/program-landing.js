import { listaArchivosCarpeta } from './modules/mod-ajax.js'
import { categorias } from './modules/categorias.js'

let galeriaCargada = 0
let imgCargadas
let archivosXGaleria

document.addEventListener('DOMContentLoaded', () => {
    // window.setTimeout(muestraPantalla, 2000)

    cargaBotones()
    loader()
})

function muestraPantalla()
{
    document.querySelector('.loader').addEventListener('transitionend', e => {
        document.body.removeChild(e.currentTarget)
    })
    // Por si falla el transition end
    window.setTimeout(() => {
        document.body.removeChild(document.querySelector('.loader'))
    }, 1500)

    document.querySelector('.loader').classList.add('oculto')

    document.querySelector('.cont-gral').classList.remove('mas-oculto')
    document.querySelector('.cont-telefono').classList.remove('mas-oculto')

}

async function loader()
{
    imgCargadas = 0
    if (galeriaCargada < categorias.length)
    {
        document.querySelector('.slider').appendChild(await creaGaleria(categorias[galeriaCargada].carpeta))
        galeriaCargada++
    }

}

async function creaGaleria(carpeta)
{
    const listaArchivos = await listaArchivosCarpeta(carpeta)
    archivosXGaleria = listaArchivos.length

    const galeria = document.createElement('div')

    galeria.classList.add('cont-pics')
    listaArchivos.forEach(nombre => {
        const div = document.createElement('div')
        div.appendChild(cargaImagen(`assets/portfolio/${carpeta}/${nombre}`))
        galeria.appendChild(div)
    })
    return galeria
}

function cargoImg()
{ 
    console.log(galeriaCargada)
    if (galeriaCargada == 1) actualizaBarra()
    if (++imgCargadas >= archivosXGaleria)
    {
        if (galeriaCargada == 1) window.setTimeout(muestraPantalla, 1000)
        loader()
    }
}

function actualizaBarra()
{
    const porc = 100 - ((imgCargadas + 1)/archivosXGaleria) * 100
    document.querySelector('.load-bar .blanco').style.width = `${porc}%`
}

function cargaImagen(ruta)
{
    const img = document.createElement('img')
    img.onload = cargoImg
    img.onerror = cargoImg
    img.src = ruta
    return img
}

function cargaBotones()
{
    const cont = document.querySelector('.cont-nav div')
    categorias.forEach((categ, index) => {
        cont.appendChild(creaBoton(categ.nombre, index))
    })
}

function creaBoton(nombre, index)
{
    const btnNav = document.createElement('div')

    btnNav.classList.add('nav-button')
    if (index == 0) btnNav.classList.add('active')
    const innerDiv = document.createElement('div')
    innerDiv.innerHTML = nombre

    btnNav.appendChild(innerDiv)
    btnNav.addEventListener('click', e => {
        const activoAnterior = document.querySelector('.nav-button.active')
        const estilo = categorias[index].estilo || ''
        console.log(estilo)
        document.querySelector('.cont-gral').className = `cont-gral ${estilo}`
        if (activoAnterior) activoAnterior.classList.remove('active')
        e.currentTarget.classList.add('active')
        document.querySelector('.slider').style.transform = `translateX(-${index * 100}vw)`
    })

    return btnNav
}