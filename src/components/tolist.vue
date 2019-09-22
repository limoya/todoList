<template>
  <div class="tolist">
    <h1>{{title}}</h1>
    <!--<h1 v-html="title"></h1>-->
    <input type="text" v-model="newItem" @keyup.enter="addThing" placeholder="Please enter what you need to do...." />
    <ul class="list">
      <li v-for="(item,index) in list" :key="item.name">
        <span @click="toggleState(item,index)" class="pointer" :class="item.finished ? 'checked' : ''">{{item.name}}</span>
        <span @click="delThing(index)" class="pointer">×</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Store from '../store';
  export default {
    name: "tolist",
    data () {
      return {
        title: 'Todo List For Limo',
        list: Store.fetch(),
        newItem: '',
        wangling: '',
      }
    },
    watch: {
      list: {
        handler: function (list) {
          Store.save(list);
        },
        deep: true,
      }
    },
    methods: {
      toggleState:function(item,index){
        item.finished = !item.finished;
        if(item.finished){
          if(index !== this.list.length-1){
            this.list.push(item);
            this.list.splice(index,1);
          }
        }else{
          if(index !== 0){
            this.list.unshift(item);
            this.list.splice(index+1,1);
          }
        }
      },
      addThing: function(){
        this.list.unshift({
          name: this.newItem,
          finished: false
        });
        this.newItem = "";
      },
      delThing: function(index){
        this.list.splice(index,1);
      }
    }
  }
</script>

<style scoped>
  .tolist{
    padding: 20px;
    text-align: center;
  }
  .tolist input{
    font-size: 16px;
    margin-top: 10px;
    width: 300px;
    padding: 15px;
    outline: none;
    border: 2px solid #ccc;
    border-radius: 8px;
  }
  .tolist .list{
    list-style: none;
  }
  .tolist .list li{
    margin: 20px;
    font-size: 20px;
    font-weight: 600;
  }
  .tolist .list li .checked{
    text-decoration: line-through;
    color: #666;
    font-weight: normal;
  }
  .pointer{
    margin-left: 20px;
    cursor: pointer;
  }

</style>
