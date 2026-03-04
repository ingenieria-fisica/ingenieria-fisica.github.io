class Header {
    constructor({ type }) {
        this.type = type;
    }
    /**
    @returns {HTMLElement}
    */
    render() {
        const element = document.createElement('header');

        this.type.split(' ').forEach(className => {
            if (className) element.classList.add(className);
        });

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('header__container');
        element.appendChild(headerContainer);

        if (this.type === 'header nav') {
            element.classList.add('nav');
            const nav = document.createElement('nav');
            nav.classList.add('nav');
            headerContainer.appendChild(nav);
        } else {
            const headerName = document.createElement('h1');
            headerName.classList.add('header__name');
            headerName.textContent = 'COMUNIDAD IF';

            const headerTagline = document.createElement('p');
            headerTagline.classList.add('header__tagline');
            headerTagline.textContent = 'Universidad Nacional de Colombia';

            headerContainer.appendChild(headerName);
            headerContainer.appendChild(headerTagline);
        }
        return element;
    }
}

class NavButton {
    constructor({ link, title }) {
        this.link = link;
        this.title = title;
    }
    /**
    @returns {HTMLElement}
    */
    render() {
        const element = document.createElement('a');
        element.classList.add('nav__button');
        element.href = this.link;
        element.textContent = this.title;

        element.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.link) {
                const newUrl = window.location.pathname + '?data=' + this.link;
                window.history.pushState({ path: this.link }, '', newUrl);
                // Llamamos a la función principal con la nueva ruta
                createGrid(this.link);
            }
        });

        return element;
    }
}

class Grid {
    constructor({ type, columns, rows, flow }) {
        this.type = type;
        this.columns = columns;
        this.rows = rows;
        this.flow = flow;
    }
    /**
    @returns {HTMLElement}
    */
    render() {
        const element = document.createElement('div');
        element.classList.add(this.type);

        if (this.columns) {
            element.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
        }

        if (this.rows) {
            element.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
        }

        element.style.gridAutoFlow = this.flow;
        return element;
    }
}

class IndexButton {
    constructor({ link, imageSrc, imageAlt, title, autor }) {
        this.link = link;
        this.imageSrc = imageSrc;
        this.imageAlt = imageAlt;
        this.title = title;
        this.autor = autor;
    }
    /**
    @returns {HTMLElement}
    */
    render() {
        const element = document.createElement('button');
        element.classList.add('index-button');
        //element.href = this.link;

        if (this.imageSrc) {
            const image = document.createElement('img');
            image.classList.add('index-button__image');
            image.src = this.imageSrc;
            image.alt = this.imageAlt;
            element.appendChild(image);
        }

        const titleElement = document.createElement('h2');
        titleElement.classList.add('index-button__name');
        titleElement.textContent = this.title;

        element.appendChild(titleElement);

        if (this.autor) {
            const autorElement = document.createElement('p');
            autorElement.classList.add('index-button__autor');
            autorElement.textContent = this.autor;
            element.appendChild(autorElement);
        }

        // Evitamos que navegue a otra página
        element.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.link) {
                const newUrl = window.location.pathname + '?data=' + this.link;
                window.history.pushState({ path: this.link }, '', newUrl);
                // Llamamos a la función principal con la nueva ruta
                createGrid(this.link);
            }
        });

        return element;
    }
}

class ResourceButton {
    constructor({ link, imageSrc, imageAlt, title, autor, comunity }) {
        this.link = link;
        this.imageSrc = imageSrc;
        this.imageAlt = imageAlt;
        this.title = title;
        this.autor = autor;
        this.comunity = comunity;
    }
    /**
    @returns {HTMLElement}
    */
    render() {
        const element = document.createElement('a');
        element.classList.add('index-button');
        element.href = this.link;
        element.setAttribute('target', '_blank');

        if (this.imageSrc) {
            const image = document.createElement('img');
            image.classList.add('index-button__image');
            if (this.comunity) {
                image.classList.add('comunity');
            }
            image.src = this.imageSrc;
            image.alt = this.imageAlt;
            element.appendChild(image);
        }

        const titleElement = document.createElement('h2');
        titleElement.classList.add('index-button__name');
        if (this.comunity) {
            titleElement.classList.add('comunity');
        }
        titleElement.textContent = this.title;

        element.appendChild(titleElement);

        if (this.autor) {
            const autorElement = document.createElement('p');
            autorElement.classList.add('index-button__autor');
            autorElement.textContent = this.autor;
            element.appendChild(autorElement);
        }

        return element;
    }
}

class SemesterIndex {
    constructor({ semester_number }) {
        this.semester_number = semester_number;
    }
    /**
    @returns {HTMLElement}
    */
    render() {
        const element = document.createElement('button');
        element.classList.add('semester-index');
        element.textContent = `SEMESTRE ${this.semester_number}`;
        element.innerHTML = `<span>${element.textContent}</span>`;
        return element;
    }
}

class FolderButton {
    constructor({
        title,
        credits = 0,
        prerequisite = "",
        subject_code = "",
        category = "", // Puede ser 'if', 'math', 'science', 'physic'
        link = null,
        afterElement = false,
    }) {
        this.title = title;
        this.credits = credits;
        this.prerequisite = prerequisite;
        this.subject_code = subject_code;
        this.category = category;
        this.link = link;
        this.afterElement = afterElement;
    }

    /**
     * Crea el elemento DOM del botón
     * @returns {HTMLElement}
     */

    render() {
        // Determinate if is a link (<a>) or a button (<button>):
        const tag = this.link ? 'a' : 'button';
        const element = document.createElement(tag);

        // Add classes and attributes:

        element.classList.add('folder-button');
        if (this.category) {
            element.classList.add(this.category);
        }

        if (this.afterElement) {
            element.setAttribute('after-element', 'true');
        } else {
            element.setAttribute('after-element', 'false');
        }


        if (this.link) {
            element.href = this.link;
        }


        element.innerHTML = `
            <span class="row row-1">${this.title}</span>
            <span class="row row-2">
                <span title="Prerrequisito">${this.prerequisite}</span>
                <span title="Número de créditos">${this.credits}</span>
                <span title="Prerrequisito de">${this.subject_code}</span>
            </span>
        `;

        element.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.link) {
                const newUrl = window.location.pathname + '?data=' + this.link;
                window.history.pushState({ path: this.link }, '', newUrl);
                // Llamamos a la función principal con la nueva ruta
                createGrid(this.link);
            }
        });

        return element;
    }
}

class ResourceFolder {
    constructor({
        title,
        credits = "",
        prerequisite = "",
        subject_code = "",
        category = "", // Puede ser 'if', 'math', 'science', 'physic'
        link = null,
        afterElement = false,
    }) {
        this.title = title;
        this.credits = credits;
        this.prerequisite = prerequisite;
        this.subject_code = subject_code;
        this.category = category;
        this.link = link;
        this.afterElement = afterElement;
    }

    /**
     * Crea el elemento DOM del botón
     * @returns {HTMLElement}
     */

    render() {
        // Determinate if is a link (<a>) or a button (<button>):
        const tag = this.link ? 'a' : 'button';
        const element = document.createElement(tag);

        // Add classes and attributes:

        element.classList.add('folder-button');
        if (this.category) {
            element.classList.add(this.category);
        }

        if (this.afterElement) {
            element.setAttribute('after-element', 'true');
        } else {
            element.setAttribute('after-element', 'false');
        }


        if (this.link) {
            element.href = this.link;
            element.setAttribute('target', '_blank');

        }


        element.innerHTML = `
            <span class="row row-1">${this.title}</span>
            <span class="row row-2">
                <span title="Prerrequisito">${this.prerequisite}</span>
                <span title="Número de créditos">${this.credits}</span>
                <span title="Prerrequisito de">${this.subject_code}</span>
            </span>
        `;

        return element;
    }
}

class AboutSection {
    constructor({ title, content }) {
        this.title = title;
        this.content = content; // Aquí puedes pasar el texto con HTML (links, strong, br)
    }

    render() {
        const section = document.createElement('section');
        section.classList.add('about');
        section.id = 'sobre-mi';

        section.innerHTML = `
            <div class="about__container">
                <h2 class="about__title">${this.title}</h2>
                <p class="about__intro">${this.content}</p>
            </div>
        `;
        return section;
    }
}

class EmptySpace {
    constructor() {
    }

    /**
    @returns {HTMLElement}
     */
    render() {
        const element = document.createElement('div');
        element.classList.add('empty-space');
        return element;
    }
}


const classMap = {
    "ResourceButton": ResourceButton,
    "IndexButton": IndexButton,
    "FolderButton": FolderButton,
    "FolderResource": ResourceFolder,
    "SemesterIndex": SemesterIndex,
    "AboutSection": AboutSection,
    "EmptySpace": EmptySpace
};


async function createGrid(path = null) {
    try {

        const container = document.getElementById('content');

        if (!container) {
            throw new Error('No se ha encontrado el contenedor con ID "content" en el HTML.');
        } else {
            console.log('Contenedor encontrado:', container);
        }

        const jsonPath = path || container.getAttribute('data-json');

        if (!jsonPath) {
            throw new Error('No se ha especificado la ruta del archivo JSON en el atributo data-json del contenedor.');
        } else {
            console.log('Ruta del JSON encontrada:', jsonPath);
        }

        container.innerHTML = '';

        const response = await fetch(jsonPath)
            .then(response => response.json())
            .then(data => {

                const header_data = data[0];
                console.log('Datos del encabezado:', header_data);
                console.log('Tipo de encabezado:', header_data.type);
                console.log('header nav:', header_data.type == 'header nav');

                const header = new Header(header_data);
                const headerElement = header.render();
                container.appendChild(headerElement);


                console.log('Datos del encabezado:', header_data);
                console.log('Tipo de encabezado:', header_data.type);

                let n = 1;


                if (header_data.type == 'header nav') {
                    n = 5;
                    const nav_data = data.slice(1, 5);
                    console.log('Datos de navegación:', nav_data);

                    nav_data.forEach(navItemData => {
                        const navButton = new NavButton(navItemData);
                        const navButtonElement = navButton.render();
                        headerElement.querySelector('nav').appendChild(navButtonElement);
                    });
                }

                const grid_data = data[n];
                const buttons_data = data.slice(n + 1);

                if (grid_data.type == 'button-grid') {
                    document.body.style.overflowX = 'hidden';
                } else {
                    document.body.style.overflowX = 'auto';
                }

                console.log('Tipo de cuadrícula:', grid_data);
                console.log('Datos de los botones:', buttons_data);


                const grid = new Grid(grid_data);
                const gridElement = grid.render();

                container.appendChild(gridElement);

                buttons_data.forEach(buttonData => {
                    const ClassConstructor = classMap[buttonData.type];
                    if (ClassConstructor) {
                        const item_button = new ClassConstructor(buttonData);

                        console.log(`Creando botón:`, item_button);

                        if (buttonData.type == "AboutSection") {
                            container.appendChild(item_button.render());
                        } else {
                            gridElement.appendChild(item_button.render());
                        }

                    } else {
                        console.warn(`Unknown class type: ${buttonData.type}`);
                    }
                });
            })

            .catch(error => {
                throw new Error('Error al cargar el archivo JSON: ' + error);
            });


        //const gridData = await response.json();

        //console.log('Respuesta del fetch:', response);
        //console.log('Datos de la cuadrícula cargados:', gridData);






    } catch (error) {
        // console.error(): Imprime un mensaje de error destacado en la consola de herramientas de desarrollo del navegador
        console.error('Error al cargar la cuadrícula de botones:', error);
    }
}


window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const savedPath = params.get('data');
    const container = document.getElementById('content');
    const initialPath = savedPath || container.getAttribute('data-json');

    // ESTO ES CLAVE: Guardamos el estado actual para que el "Atrás" funcione desde la primera carga
    window.history.replaceState({ path: initialPath }, '', window.location.href);

    createGrid(initialPath);
});

window.addEventListener('popstate', (event) => {
    const container = document.getElementById('content');

    // 1. Intentamos sacar la ruta del estado guardado
    // 2. Si no hay, intentamos sacarla de la URL (?data=...)
    // 3. Si no hay nada, cargamos el JSON por defecto del HTML
    const params = new URLSearchParams(window.location.search);
    const pathFromUrl = params.get('data');
    const path = (event.state && event.state.path) ? event.state.path : (pathFromUrl || container.getAttribute('data-json'));

    console.log("Navegando históricamente a:", path);
    createGrid(path);
});
