const button_add_task = document.getElementById("button_add_task");
const add_task = document.getElementById("add_task");
const form_new_task = document.getElementById("form-new-task");
const button_cancel_task = document.getElementById("cancel_task");
const input_new_task = document.getElementById("input_new_task");
const save_task = document.getElementById("save_task");
const tasks_container = document.querySelector("main");

// Função para excluir tarefa
function excluirTarefa(event) {
  var tarefa = event.target.closest(".container-task");
  tarefa.remove();
  salvarTarefas();
}

// Função para marcar tarefa como concluída
function chackedTask(event) {
  var task = event.target.closest(".container-task");
  if (event.target.checked) {
    task.classList.add("checked-task");
  } else {
    task.classList.remove("checked-task");
  }
  salvarTarefas();
}

// Função para salvar tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem("savedContent", tasks_container.innerHTML);
}

// Função para adicionar nova tarefa com checkbox funcionando
function adicionarTarefa(titulo) {
  var newDiv = document.createElement("div");
  newDiv.className = "container-task";

  newDiv.innerHTML = `
      <div>
                <p>${titulo}</p>
            </div>
            <div>
                <input type="checkbox" class="check-task">
                <i class="fa-solid fa-trash"></i>
            </div>
  `;

  // Adiciona os eventos de clique e mudança para a nova tarefa
  newDiv.querySelector(".fa-trash").addEventListener("click", excluirTarefa);
  newDiv.querySelector(".check-task").addEventListener("change", chackedTask);

  tasks_container.appendChild(newDiv);
  salvarTarefas();
}

// Adiciona evento de mudança para o checkbox de cada tarefa existente
document.querySelectorAll(".check-task").forEach(function (checkbox) {
  checkbox.addEventListener("change", chackedTask);
});

// Carregar tarefas salvas ao carregar a página
window.addEventListener("load", function () {
  const savedContent = localStorage.getItem("savedContent");
  if (savedContent) {
    tasks_container.innerHTML = savedContent;

    // Reatribuir os eventos para as tarefas carregadas
    document.querySelectorAll(".fa-trash").forEach(function (btn) {
      btn.addEventListener("click", excluirTarefa);
    });

    document.querySelectorAll(".check-task").forEach(function (checkbox) {
      checkbox.addEventListener("change", chackedTask);
    });
  }
});

// Open form to create task

add_task.addEventListener("click", function () {
  form_new_task.style.display = "flex";
  form_new_task.style.visibility = "visible";
});

// Cancel new task
button_cancel_task.addEventListener("click", function () {
  input_new_task.value = "";
  form_new_task.style.display = "none";
  form_new_task.style.visibility = "hidden";
});

save_task.addEventListener("click", function () {
  if (input_new_task.value == "") {
    Toastify({
      text: "Crie um título",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "red",
      },
      onClick: function () {},
    }).showToast();
  } else {
    adicionarTarefa(input_new_task.value);
    form_new_task.style.display = "none";
    form_new_task.style.visibility = "hidden";
    input_new_task.value = "";
  }
});
