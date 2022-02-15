// Retrieve Elements
const editorElement = document.querySelector('.editor');
const consoleElement = document.querySelector('.editor__console');
const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');
const changeThemeSelect = document.querySelector('.editor__theme');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 'console.log("Hello World !");';
let consoleMessages = [];

let editorLib = {
    clearConsoleScreen() {
        consoleMessages.length = 0;

        // Remove all elements in the log list
        while (consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
    },
    printToConsole() {
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = log.class;
			newLogText.dataset.theme = changeThemeSelect.value.toLowerCase().replace(" ", "_").replace("80s", "eighties").replace(" ", "_") || 'dreamweaver'
            newLogText.textContent = `> ${log.message}`;

            newLogItem.appendChild(newLogText);

            consoleLogList.appendChild(newLogItem);
        })
    },
    init() {
        // Configure Ace

        // Theme
		codeEditor.setTheme(`ace/theme/${changeThemeSelect.value.toLowerCase().replace(" ", "_").replace("80s", "eighties").replace(" ", "_").replace("greeon_on_black", "gob") || 'dreamweaver'}`);
		consoleElement.dataset.theme = changeThemeSelect.value.toLowerCase().replace(" ", "_").replace("80s", "eighties").replace(" ", "_").replace("greeon_on_black", "gob");
		editorElement.dataset.theme = changeThemeSelect.value.toLowerCase().replace(" ", "_").replace("80s", "eighties").replace(" ", "_").replace("greeon_on_black", "gob");
		Array.from(consoleElement.getElementsByClassName("log")).forEach(function(log) {
    		log.dataset.theme = changeThemeSelect.value.toLowerCase().replace(" ", "_").replace("80s", "eighties").replace(" ", "_").replace("greeon_on_black", "gob");
		});

        // Set language
        codeEditor.session.setMode("ace/mode/javascript");

        // Set Options
        codeEditor.setOptions({
            fontFamily: 'Consolas',
            fontSize: '12pt',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
			showPrintMargin: false
        });

        // Set Default Code
        codeEditor.setValue(defaultCode);
    }
}

// Events
executeCodeBtn.addEventListener('click', () => {
    // Clear console messages
    editorLib.clearConsoleScreen();

    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    try {
        new Function(userCode)();
    } catch (err) {
        console.error(err);
    }

    // Print to the console
    editorLib.printToConsole();
});

resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    codeEditor.setValue(defaultCode);

    // Clear console messages
    editorLib.clearConsoleScreen();
})

changeThemeSelect.addEventListener('change', (event) => {
    codeEditor.setTheme(`ace/theme/${event.target.value.toLowerCase().replace(" ", "_").replace("80s", "eighties").replace(" ", "_").replace("greeon_on_black", "gob")}`);
	consoleElement.dataset.theme = changeThemeSelect.value.toLowerCase().replace(" ", "_").replace("80s", "eighties").replace(" ", "_").replace("greeon_on_black", "gob");
	editorElement.dataset.theme = changeThemeSelect.value.toLowerCase().replace(" ", "_").replace("80s", "eighties").replace(" ", "_").replace("greeon_on_black", "gob");
	Array.from(consoleElement.getElementsByClassName("log")).forEach(function(log) {
    	log.dataset.theme = changeThemeSelect.value.toLowerCase().replace(" ", "_").replace("80s", "eighties").replace(" ", "_").replace("greeon_on_black", "gob");
	});
})

editorLib.init();
