const toDoList = {
  input: document.querySelector(".input"),
  btnAdd: document.querySelector(".btn"),
  ul: document.querySelector(".ul"),
  Key: "to-do-list",

  setSuccess(element) {
    element.classList.add("success");
    element.classList.remove("error");
  },

  setError(element) {
    element.classList.add("error");
    element.classList.remove("success");
  },

  taskValidator() {
    const inputValue = this.input.value.trim();
    if (!inputValue) {
      this.setError(this.input);
      return false;
    }

    this.setSuccess(this.input);
    return inputValue;
  },

  saveLocalStorage(task) {
    const getLocalStorage = JSON.parse(localStorage.getItem(this.Key)) || [];
    getLocalStorage.push(task);
    localStorage.setItem(this.Key, JSON.stringify(getLocalStorage));
  },

  renderTask(task) {
    const li = document.createElement("li");
    li.textContent = task.Text;
    li.dataset.id = task.id;

    const btnRemove = document.createElement("button");
    btnRemove.textContent = "deletar";
    btnRemove.classList.add("remove-btn");

    li.appendChild(btnRemove);
    this.ul.appendChild(li);

    btnRemove.addEventListener("click", () => this.remove(li, task));
  },

  remove(li, task) {
    const getLocalStorage = JSON.parse(localStorage.getItem(this.Key)) || [];
    const filterGetLocalStorage = getLocalStorage.filter(
      (taskItem) => taskItem.id !== task.id
    );
    localStorage.setItem(this.Key, JSON.stringify(filterGetLocalStorage));

    li.remove();
  },

  addTask() {
    const inputValueValidation = this.taskValidator();
    if (inputValueValidation) {
      const task = {
        id: Date.now(),
        Text: inputValueValidation,
      };
      this.saveLocalStorage(task);
      this.renderTask(task);
      this.input.value = "";
    }
  },
};

const { btnAdd } = toDoList;
btnAdd.addEventListener("click", () => toDoList.addTask());
