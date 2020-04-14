<template>
  <div id="userManage">
    <Table :columns="columns" :data="userArray" width="900px" minWidth="1100px" stripe>
      <template slot-scope="{ row}" slot="userId">
        <span>{{ row.userId }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="name">
        <Input type="text" v-model="editName" v-if="editIndex === index" />
        <span v-else>{{ row.userName }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="password">
        <Input type="text" v-model="editPassword" v-if="editIndex === index" />
        <span v-else>{{row.password }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="userPhone">
        <Input type="text" v-model="editPhone" v-if="editIndex === index" />
        <span v-else>{{ row.userPhone }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <Button @click="handleSave(index)">保存</Button>
          <Button @click="editIndex = -1">取消</Button>
        </div>
        <div v-else>
          <Button @click="handleEdit(row, index)">操作</Button>
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "ID",
          slot: "userId"
        },
        {
          title: "用户名",
          slot: "name"
        },
        {
          title: "密码",
          slot: "password"
        },
        {
          title: "手机",
          slot: "userPhone"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      userArray: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editPassword: "", // 第二列输入框
      editPhone: ""
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      let data = new FormData();
      data.append("code", "getUser");
      this.$axios({
        method: "post",
        data: data,
        url: "/api/controller/adminSystem.php"
      }).then(res => {
        this.userArray = res.data;
        console.log(res.data);
      });
    },
    handleEdit(row, index) {
      this.editName = row.userName;
      this.editPassword = row.password;
      this.editPhone = row.userPhone;
      this.editIndex = index;
    },
    handleSave(index) {
        this.userArray[index].userName = this.editName;
        this.userArray[index].password = this.editPassword;
        this.userArray[index].userPhone = this.editPassword;
      let data = new FormData();
      data.append("code", "adminAlterUser");
      data.append("id",this.userArray[index].userId);
      data.append("name",this.editName);
      data.append("password",this.editPassword);
      data.append("phone",this.editPhone);
      this.$axios({
        method: "post",
        data: data,
        url: "/api/controller/adminSystem.php"
      }).then(res => {
        console.log(res.data);
      });
      this.editIndex = -1;
    }
  }
};
</script>