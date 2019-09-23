// Z modułu electron wyciągamy klasy app, BrowserWindow, Menu i shell
const { app, BrowserWindow, Menu, shell } = require('electron')

// Tworzymy zmienną, która będzie przechowywać obiekt BrowserWindow
let win

// Funkcja tworząca okno (obiekt BrowserWindow)
function createWindow () {
    
    // Tworzenie obiektu
    win = new BrowserWindow({
        width: 800, // szerokość okna
        height: 600, // wysokość okna
        backgroundColor: "#223", // kolor tła
        webPreferences: { // funkcje przeglądarki
            nodeIntegration: true // integracja z Nodejs
        }
    })

    // Ładowanie pliku index.html do okna
    win.loadFile('index.html')

    // Otwarcie narzędzi deweloperskich
    // win.webContents.openDevTools()

    // Gdy okno zostanie zamknięte
    win.on('closed', () => {
        // Przypisz zmiennej null
        win = null
    })
}


// Szablon naszego menu
let template = [{
    label: 'Informacje',
    submenu: [{
        label: 'Otwórz Repozytorium',
        click: () => {
            shell.openExternal('https://github.com/mateuszmikos/electron-puerile-calculator');
        }
    }, {
        label: 'Przejdź na stronę kursu',
        click: () => {
            shell.openExternal('https://aimweb.pl/kurs-electron---pierwsza-aplikacja-okienkowa-z-html,-css-i-js');
        }
    }, {
        type: 'separator',
    }, {
        label: 'Przejdź na aimweb.pl',
        click: () => {
            shell.openExternal('https://aimweb.pl/');
        }
    }]
}]
  
// Wykonaj funkcję createWindow i przypisz menu, gdy inicjalizacja Electrona będzie zakończona
app.on('ready', () => {
    createWindow()
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})

// Gdy wszyskie okna są zamknięte
app.on('window-all-closed', () => {
    // Jeżeli system operacyjny != macOS
    if (process.platform !== 'darwin') {
        // Zamknij aplikację
        app.quit()
    }
})

// Gdy aplikacja aktywowana (dla macOS)
app.on('activate', () => {
    // Jeżeli okno nie istnieje (zostało zamknięte)
    if (win === null) {
        // Stwórz okno
        createWindow()
    }
})