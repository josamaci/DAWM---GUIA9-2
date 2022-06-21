let cargarDatos = () => {
    //alert('¡Hola, mundo!')
    fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser()
            const xml = parser.parseFromString(data, 'application/xml')

            let escritores = xml.getElementsByTagName('escritor')

            for (const escritor of escritores) {
                let id = escritor.querySelector('id').textContent
                let nombre = escritor.querySelector('nombre').textContent
                let plantilla = `<option value="${id}">${nombre}</option>`
                document.querySelector('select').innerHTML += plantilla
            }

            document.querySelector('select').addEventListener('change', e => {
                document.querySelector('#frases').innerHTML = ''
                fetch('https://dataserverdaw.herokuapp.com/escritores/frases')
                    .then(response => response.json())
                    .then(data => {
                        for (const escritor of escritores) {
                            let id = escritor.querySelector('id').textContent
                            let nombre = escritor.querySelector('nombre').textContent

                            if (e.target.value == id) {
                                for (const frase of data.frases) {
                                    if (frase.id_autor == e.target.value) {
                                        let fraseHTML = `<div class="col-lg-3">
                                                            <div class="test-inner ">
                                                                <div class="test-author-thumb d-flex">
                                                                    <div class="test-author-info">
                                                                        <h4>${nombre}</h4>                                            
                                                                    </div>
                                                                </div>
                                                                <span>${frase.texto}</span>
                                                                <i class="fa fa-quote-right"></i>
                                                            </div>
                                                            </div>`
                                        document.querySelector('#frases').innerHTML += fraseHTML
                                    }
                                }
                            }
                        }
                    })
            })
        })
}
window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
});