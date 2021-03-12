<template>
  <v-app>
    <v-container>
      <div class="mt-10"/>
      <!--表格-->
      <v-data-table
          :headers="headers"
          :items="dataList"
          sort-by="calories"
          class="elevation-5"
          hide-default-footer
          :page.sync="pagination.currentPage"
          :items-per-page="pagination.pageSize"
          :server-items-length="pagination.total"
          :loading="loading"
          :update:page="handleCurrentPage">
        <!--表格 顶部的工具栏-->
        <template v-slot:top>
          <v-toolbar flat prominent>
            <!--展示表格的icon-->
            <v-card class="white--text success  text-center mycard elevation-5 pa-8" >
              <i class="fa  fa-home fa-2x" />
            </v-card>
            <div class="mt-5 ml-5 text-h6">会议室信息表</div>
            <v-spacer></v-spacer>
            <!--搜索框-->
            <v-text-field v-model="pagination.queryString" append-icon="mdi-magnify" label="在此输入.." dense solo
                          hint="根据地点，人数，状态，筛选" color="success" class="mt-5"></v-text-field>
            <v-btn color="success" class="mt-5 ml-5" @click="searchUser">查询</v-btn>
            <v-spacer></v-spacer>
            <!--新建会议按钮-->
            <v-btn color="success" dark class="mt-5" @click="showCreateDialog">新建会议室</v-btn>
          </v-toolbar>
        </template>

        <!--操作的按钮-->
        <template v-slot:item.actions="{ item }">
          <v-btn small color="success" class="mr-2" @click="editItem(item)">修改</v-btn>
          <v-btn small color="error" @click="deleteItem(item)">删除</v-btn>
        </template>

        <!--第一列展示图片-->
        <template v-slot:item.img="{item}">
          <v-img :src="item.img" lazy-src="http://img.yangcc.top/image1.jpg" width="150" height="75" @click.stop="showImg(item)">
            <!--当图片有问题时候，显示无法加载的样式-->
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </template>

        <!--自定义info列,只展示部分内容-->
        <template v-slot:item.info="{ item }">
          <v-chip  color="primary" @click="showInfo(item)">{{ item.info.substring(0,3) }}.</v-chip>
        </template>
        <!--自定义会议状态列-->
        <template v-slot:item.status="{ item }">
          <div v-if="item.status==='可用'">
            <v-chip color="success" label>可用</v-chip>
          </div>
          <div v-if="item.status==='使用中' ">
            <v-chip color="warning" label>使用中</v-chip>
          </div>
          <div v-if="item.status==='维修中'">
            <v-chip color="error" label>维修中</v-chip>
          </div>
        </template>
      </v-data-table>

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
    </v-container>

    <!--删除的弹出页面-->
    <v-dialog v-model="dialogDelete" max-width="250px">
      <v-card>
        <v-card-title class="subtitle-1">你确定要删除这个会议室吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success"  @click="closeDelete">取消</v-btn>
          <v-btn color="error"  @click="deleteItemConfirm">删除</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--新建会议室的弹出页面-->
    <v-form v-model="valid"  ref="form">
      <v-dialog fullscreen v-model="dialog" max-width="600px" transition="dialog-top-transition">
        <!--新建页面的title-->
        <v-card>
          <v-toolbar  class="text-h6" color="success" dark>
            <v-spacer/>
            {{ formTitle }}
            <v-spacer/>
          </v-toolbar>
          <!--新建页面的内容-->
          <v-card-text>
            <v-container>
              <!--图片上传-->
              <v-file-input accept="image/*" @change="onFileChange" label="上传图片"
                            show-size color="success" truncate-length="20"></v-file-input>
              <v-text-field color="success" v-model="editedItem.location" label="会议室地点" :rules="locationRules"></v-text-field>
              <v-text-field color="success" v-model="editedItem.capacity" label="可容纳人数" :rules="capacityRules"></v-text-field>
              <v-radio-group mandatory v-model="editedItem.status" row>
                <v-radio color="success" label="可用" value="可用"></v-radio>
                <v-radio color="warning" label="使用中" value="使用中"></v-radio>
                <v-radio color="error" label="维修中" value="维修中"></v-radio>
              </v-radio-group>
              <v-textarea color="success" outlined name="input-7-4" label="会议室描述信息"
                          v-model="editedItem.info"  :rules="infoRules" counter></v-textarea>
            </v-container>
          </v-card-text>
          <!--新建页面的保存，取消按钮-->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="close">取消</v-btn>
            <v-btn :disabled="!valid" color="success" @click="save">保存</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>

    <!--图片弹窗-->
    <v-dialog
        v-model="imgDialog"
        transition="dialog-top-transition"
        max-width="800">
      <v-card>
        <v-img :src="imgDialogSrc" width="800"></v-img>
      </v-card>
    </v-dialog>
    <!--会议室信息弹窗-->
    <v-dialog
        v-model="infoDialog"
        transition="dialog-top-transition"
        max-width="300">
      <v-card>
        <v-toolbar color="primary" class="text-h6 mb-5" dark>
          {{location}}
        </v-toolbar>
        <v-card-text class="text-body-1">
          {{info}}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "MeetingRoomMange",
  data(){
    return{
      // 编辑,或者修改页面的表单是否通过验证
      valid: true,
      // 编辑，新建弹出框是否展示
      dialog: false,
      dialogDelete: false,
      editedIndex: -1, // 用于判断是否是新建，还是修改
      loading: false,  // 是否展示加载样式
      // 图片弹窗相关
      imgDialog: false,
      imgDialogSrc: '',
      //会议室信息弹窗
      infoDialog: false,
      info: '',
      location: '',
      // 输入框规则
      locationRules: [value => !!value || '不能为空'],
      capacityRules: [value => !!value || '不能为空',  value => {let pattern = /^[0-9]*$/
        return pattern.test(value)|| '只能是数字'}],
      infoRules: [value => !!value || '不能为空'],
      // 图片文件
      img: '',
      //所有的列信息
      headers: [
        {
          text: '会议室',
          align: 'center',
          sortable: false, // 不可排序
          class: 'green--text subtitle-1',
          value: 'img',
        },
        {
          text: '会议室地点',
          align: 'center',
          sortable: false, // 不可排序
          class: 'green--text subtitle-1',
          value: 'location',
        },
        { text: '可容纳人数',
          align: 'center',
          sortable: false,
          class: 'green--text subtitle-1',
          value: 'capacity' },
        {
          text: '会议室状态',
          align: 'center',
          sortable: false,
          class: 'green--text subtitle-1',
          value: 'status'
        },
        { text: '描述',
          align: 'center',
          class: 'green--text subtitle-1',
          value: 'info',
          sortable: false
        },
        { text: '操作',
          align: 'center',
          class: 'green--text subtitle-1',
          value: 'actions',
          sortable: false
        },
      ],

      // 分页相关数据
      pagination:{
        currentPage: 1, // 当前页
        pageSize: 10,  // 每页显示条数
        total: 10,    // 总记录数
        queryString: '', // 查询条件
      },
      dataList: [],  // 要展示的数据数组
      pageCount: 1, // 总页码


      // 保存新建，修改弹窗的值
      editedItem: {
        id: '',
        location:'',
        capacity: '',
        status: '',
        info:'',
      },
      // 点击清空时候赋值
      defaultItem: {
        id: '',
        location:'',
        capacity:'',
        status: '',
        info: '',
      },
    };
  },

  created () {
    this.init()
  },

  // 所有的方法
  methods: {
    init(){
      this.dataList = [
        { img:"http://img.yangcc.top/image1.jpg",
          location:"9号楼472",
          capacity:"18",
          status: "可用",
          info:"此会议室配备先进的灯光、影音系统，有各类大、中、小型会议室多间，可提供符合国际标准的多用途会议场所，令人心旷神怡的环境，贯穿始终的优质服务是您成功的保障。本酒店会议室一流的设备、一流的服务，是举行商贸活动、高层培训、学术论坛、节目联欢的理想选择！"},
        { img:"http://img.yangcc.top/image1.jpg",
          location:"6号楼409",
          capacity:"100",
          status: "使用中",
          info:"此会议室........"},
        { img:"http://img.yangcc.top/image1.jpg",
          location:"409",
          capacity:"18",
          status: "维修中",
          info:"此会议室........"},
        { img:"http://img.yangcc.top/image1.jpg",
          location:"409",
          capacity:"18",
          status: "可用",
          info:"此会议室........"},
      ];
    },

    //图片上传
    onFileChange(file){
      this.img = file;
      console.log(this.img)

    },

    // 新建会议室的弹窗
    showCreateDialog(){
      this.dialog =true;
    },
    // 展示图片的弹窗
    showImg(item){
      this.imgDialogSrc=item.img;
      this.imgDialog = true
    },
    //展示会议室描述
    showInfo(item){
      this.info=item.info;
      this.location=item.location;
      this.infoDialog=true;
    },

    // 点击搜索按钮
    searchUser(){
      this.findPage();
    },

    // 点击修改按钮
    editItem (item) {
      // 保存此id，说明这个哪个用户
      this.editedItem.id =item.id;
      // 修改editedIndex来说明现在是修改
      this.editedIndex = this.dataList.indexOf(item);
      // 将此行的数据复制到editedItem，用于Dialog展示，【es6新语法】
      this.editedItem = Object.assign({},item);
      this.dialog =true;
    },

    // 点击删除按钮
    deleteItem (item) {
      // 拿到id
      this.editedItem.id =item.id;
      this.editedIndex = this.dataList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    // 删除页面的删除按钮
    deleteItemConfirm () {

    },

    // 删除页面的取消按钮
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)//清空editedItem
        this.editedIndex = -1  //重置弹出框是修改，还是新建
      })
    },
    // 新建页面的取消按钮
    close () {
      // 隐藏页面
      this.dialog = false
      this.$nextTick(()=>{
        this.editedItem = Object.assign({}, this.defaultItem) // 清空保存数据的editedItem
        this.editedIndex = -1   // 重置弹出框标题
        this.$refs.form.reset() // 重置表单
      })
    },

    // 新建，或者修改 页面的保存
    save () {
      console.log(this.img.type.substring(0,5))
      if ( this.editedItem.info.length>=200){
        this.$message.error("议室信息需要少于200字")
      }else if(this.img===undefined || this.img===null||this.img.type.substring(0,5)!=='image'){
        this.$message.error("请检查文件是否上传,或者文件是否为图片")
      } else{
        // 验证表单输入,如果通过，像后端发请求
        let validate = this.$refs.form.validate();
        if (validate === true) {
          // 如果是新建的保存
          if (this.editedIndex===-1) {
            // 将图片上传
            let formData = new FormData;
            formData.append('file',this.img)
            formData.append('status',this.editedItem.status)
            formData.append('capacity',this.editedItem.capacity)
            formData.append('location',this.editedItem.location)
            formData.append('info',this.editedItem.info)
            this.$axios.post("/meetingRoom/upload",formData,).then(()=>{

            }).catch(()=>{

            })
          }
          // 如果是修改保存
          else{

          }
        }
      }
    },

    // 分页查询
    findPage(){
      // 当前页，每页显示记录数，查询条件
      let param ={
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        queryString: this.pagination.queryString,
      }
      this.$axios.post("/user/findPage",param).then((res)=>{
        // 为，总记录数，数据集合赋值
        this.pagination.total = res.data.total;
        this.dataList = res.data.rows;
        // 总页码赋值
        this.pageCount =Math.ceil(this.pagination.total/this.pagination.pageSize);
      }).catch((res)=>{
        this.$message.error("分页请求发送失败，请检查网络")
      })
    },
    // 页码变化
    handleCurrentPage(currentPage){
      this.pagination.currentPage =currentPage;
      this.findPage();
    }
  },

  computed: {
    //判断是新建，还是编辑，而展示不同的title
    formTitle () {
      return this.editedIndex === -1 ? '新建会议室' : '编辑会议室信息'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
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