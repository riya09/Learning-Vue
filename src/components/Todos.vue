<template>
  <div class="todo">
    <h2>{{title}}</h2>
    <input type="text" placeholder="Add a new task..." v-on:keyup.enter="addTask">
    <ul>
      <li v-for="(todo,index) in todoList" :key='index'>
        <input type="checkbox" v-model="todo.completed">
        <del v-if = "todo.completed">{{todo.task}}</del>
        <span v-else>{{todo.task}}</span>
        <button v-on:click="removeTask(todo.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Todos',
  data(){
    return {
      title:'Todos',
      todoList:[
        {task:"This is the first task.",id:1,completed:false},
        {task:"This is the second task.",id:2,completed:false}
      ]
    }
  },
  methods:{
    addTask(event){
      const text = event.target.value
      let newId = this.todoList.length+1
      this.todoList.push({task:text,id:newId,completed:false})
      event.target.value='';
    },
    removeTask(id){
      this.todoList=this.todoList.filter(todo=>todo.id !== id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
