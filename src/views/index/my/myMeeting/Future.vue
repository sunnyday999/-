<template>
  <div>
    <!--表格-->
    <v-card>
      <!--表格-->
      <v-data-table
          :headers="headers"
          :items="dataList"
          sort-by="calories"

          hide-default-footer
          :page.sync="pagination.currentPage"
          :items-per-page="pagination.pageSize"
          :server-items-length="pagination.total"
          :update:page="handleCurrentPage">
        <!--表格 顶部的工具栏-->
        <template v-slot:top>
          <v-toolbar flat prominent>
            <!--展示表格的icon-->
            <v-card class="white--text success  text-center mycard elevation-5 pa-8" >
              <i class="fa fa-suitcase fa-2x" />
            </v-card>
            <div class="mt-5 ml-5 text-h6">要参加的会议</div>
            <v-spacer></v-spacer>
            <!--搜索框-->
            <v-text-field  v-model="pagination.queryString"  label="在此输入.." dense
                           solo hint="根据学工号，院系，权限筛选" color="success" class="mt-5"></v-text-field>
            <v-btn color="success" elevation="5" class="mt-5 ml-5" @click="searchUser"><i class="fa fa-search"></i> </v-btn>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <!--操作的按钮-->
        <template v-slot:item.actions="{ item }">
          <v-btn small elevation="5" color="success" ><i class="fa fa-eye"></i></v-btn>
        </template>

      </v-data-table>
    </v-card>
    <!--分页组件-->
    <v-pagination
        class="mt-10"
        color="success"
        v-model="pagination.currentPage"
        :length="pageCount"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="handleCurrentPage"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "Future",
  data() {
    return {
      // 保存按钮的样式
      saveLoading: false,
      // 分页相关数据
      pagination: {
        currentPage: 1, // 当前页
        pageSize: 10,  // 每页显示条数
        total: 10,    // 总记录数
        queryString: '', // 查询条件
      },
      dataList: [],  // 要展示的数据数组
      pageCount: 1, // 总页码
      //存放学院信息
      faculty: [],
      //所有的列信息
      headers: [
        {
          text: '历史会议',
          align: 'center',
          sortable: false,
          class: 'green--text subtitle-1',
          value: 'name'
        },
        {
          text: '是否参加',
          align: 'center',
          sortable: false,
          class: 'green--text subtitle-1',
          value: 'part'
        },
        {
          text: '会议时间',
          align: 'center',
          sortable: false,
          class: 'green--text subtitle-1',
          value: 'time'
        },
        {
          text: '查看',
          align: 'center',
          class: 'green--text subtitle-1',
          value: 'actions',
          sortable: false
        },
      ],
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.dataList = [
        {
          id: 1,
          name: '会议1',
          part: '已参加',
          time: '2021-3-1'
        },
        {
          id: 2,
          name: '会议2',
          part: '已参加',
          time: '2021-2-1'
        },
        {
          id: 3,
          name: '会议2',
          part: '请假',
          time: '2021-3-1'
        },
      ]
    },
    // 页码变化
    handleCurrentPage(currentPage) {
      this.pagination.currentPage = currentPage;
    },
    save() {
      dialog("保存");
    },
    // 新建页面的取消按钮
    close() {
      // 隐藏页面
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem) // 清空保存数据的editedItem
        this.$refs.form.reset() // 重置表单
      })
    },

  },
}
</script>

<style scoped>
.mycard{
  width: 100px;
  height: 100px;
  top: -30px;
}
</style>