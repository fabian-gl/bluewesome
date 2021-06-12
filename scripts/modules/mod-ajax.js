export { ajaxCall, listaArchivosCarpeta }

function ajaxCall(url, obj, func = null)
{
    var xhttp = new XMLHttpRequest()
    let formData = new FormData()

    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && func) func(this.responseText)
    }
    xhttp.open("POST", "./" + url, true)
    Object.keys(obj).forEach(key => { formData.append(key, obj[key]) })

    xhttp.send(formData)
}

function ajaxCallPromise(url, obj)
{
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest()
        let formData = new FormData()
    
        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4) resolve(this.responseText)
        }
        xhttp.open("POST", "./" + url, true)
        Object.keys(obj).forEach(key => { formData.append(key, obj[key]) })
    
        xhttp.send(formData)
    })

}

async function listaArchivosCarpeta(carpeta)
{
    const rta = JSON.parse(await ajaxCallPromise('php/gestor.php',{tipo: 'listaArchivosCarpeta', carpeta}))
    if (!rta.ok) return []
    return rta.data
}
