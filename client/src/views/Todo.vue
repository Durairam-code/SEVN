<template>
  <v-app class="todo">
    <v-container id="todo-list" class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-spacer />
              <v-toolbar-title>TODO List</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form v-on:submit.prevent="addNewTask">
                <v-text-field
                  v-model="taskname"
                  id="tasknameinput"
                  placeholder="Add New Task"
                  label="Task Name"
                  solo
                  dense
                ></v-text-field>
                <v-btn
                  v-if="this.isEdit == false"
                  block
                  type="submit"
                  color="success"
                  dark
                  >Submit</v-btn
                >
                <v-btn
                  v-else
                  block
                  type="button"
                  v-on:click="updateTask()"
                  color="primary"
                  dark
                  >Update</v-btn
                >
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-content>
                <v-simple-table class="table">
                  <template v-slot:default>
                    <tbody>
                      <tr
                        v-for="todo in todos"
                        v-bind:key="todo.id"
                        v-bind:title="todo.name"
                      >
                        <td class="text-subtitle-1">{{ todo.name }}</td>
                        <td class="text-right">
                          <v-btn
                            v-on:click="editTask(todo.name, todo.id)"
                            class="mr-4"
                            color="light-blue"
                            >Edit</v-btn
                          >
                          <v-btn
                            v-on:click="deleteTask(todo.id)"
                            class="mr-4"
                            color="error"
                            >Delete</v-btn
                          >
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-content>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import API from "@/services/API";
export default {
  data() {
    return {
      todos: [],
      id: "",
      taskname: "",
      isEdit: false
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
          result => {
            console.log(result.data);
            this.todos = result.data;
          },
          error => {
            console.error(error);
          }
        );
    },
    addNewTask() {
      API()
        .post("/create", { name: this.taskname })
        .then(res => {
          this.taskname = "";
          this.getTasks();
          console.log(res);
        })
        .catch(err => {
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
        .then(res => {
          this.taskname = "";
          this.isEdit = false;
          this.getTasks();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTask(id) {
      API()
        .delete(`/delete/${id}`)
        .then(res => {
          this.taskname = "";
          this.getTasks();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
