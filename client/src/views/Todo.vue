<template>
  <div class="todo">
    <div id="todo-list" class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <h1 class="text-center">TODO List</h1>
          <form v-on:submit.prevent="addNewTask">
            <label for="tasknameinput">Task Name</label>
            <input
              v-model="taskname"
              id="tasknameinput"
              class="form-control"
              placeholder="Add New Task"
            />
            <button
              v-if="this.isEdit == false"
              type="submit"
              class="btn btn-success btn-block  mt-3"
            >
              Submit
            </button>
            <button
              v-else
              type="button"
              v-on:click="updateTask()"
              class="btn btn-primary btn-block  mt-3"
            >
              Update
            </button>
          </form>

          <table class="table">
            <tr
              v-for="todo in todos"
              v-bind:key="todo.id"
              v-bind:title="todo.name"
            >
              <td class="text-left">{{ todo.name }}</td>
              <td class="text-right">
                <button
                  v-on:click="editTask(todo.name, todo.id)"
                  class=" btn btn-info "
                >
                  Edit
                </button>
                <button
                  v-on:click="deleteTask(todo.id)"
                  class=" btn btn-danger "
                >
                  Delete
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/services/API";
export default {
  data() {
    return {
      todos: [],
      id: "",
      taskname: "",
      isEdit: false,
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      API()
        .get("/view")
        .then(
          (result) => {
            console.log(result.data);
            this.todos = result.data;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    addNewTask() {
      API()
        .post("/create", { name: this.taskname })
        .then((res) => {
          this.taskname = "";
          this.getTasks();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editTask(title, id) {
      this.id = id;
      this.taskname = title;
      this.isEdit = true;
    },
    updateTask() {
      API()
        .put(`/update/${this.id}`, { name: this.taskname })
        .then((res) => {
          this.taskname = "";
          this.isEdit = false;
          this.getTasks();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(id) {
      API()
        .delete(`/delete/${id}`)
        .then((res) => {
          this.taskname = "";
          this.getTasks();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
