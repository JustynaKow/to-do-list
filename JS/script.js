{
    const welcome = () => {
        console.log("Cześć! Stwórz swoją listę zadań!");
    };

    let tasks = [];

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex+1),
        ];
        
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {content: newTaskContent},
           ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex+1),
        ];

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneButtons = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li
                class="tasks__item"
                >
                    <button class="button tasks__button tasks__button--toggleDone js-toggleDone">
                        ${task.done ? "✓" : ""}
                    </button>
                    <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="button tasks__button tasks__button--remove js-remove">
                    🗑
                    </button>
                </li >
        `; 
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
            <button class="button buttons__button">Ukryj ukończone</button>
            <button class="button buttons__button">Ukończ wszystkie</button>
        `
    };

    const render = () => {
       renderTasks();
       renderButtons();

       bindRemoveEvents();
       bindToggleDoneButtons();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        welcome();
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}