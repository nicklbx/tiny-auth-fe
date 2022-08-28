<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
            type="index"
            width="50">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="商品id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="商品描述"
        width="300">
      </el-table-column>
      <el-table-column
        prop="pic"
        label="商品图片"

      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="180"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" size="small" type="success">修改</el-button>

          <el-button @click="handleDelete(scope.row)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin: 20px;display: flex;justify-content: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20, 50, 100]"
          :page-size="pageSize"
          layout=" total,sizes, prev, pager, next,jumper"
          :total="total">
        </el-pagination>
      </div>

  </div>


</template>

<script>
  import {listProduct}  from '@/api/product'

  export default {

    data() {
      return {
        tableData: [],
        total:0,
        pageSize:10,
        currentPage:1,

      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList(){
        let params={
          pageNo:this.currentPage,
          pageSize:this.pageSize
        }
        listProduct(params)
          .then(res=>{
            console.log(res)
            this.tableData=res.data.list;
            this.total=res.data.total;
            this.pageSize=res.data.pageSize;
            this.currentPage=res.data.pageNo;
          });
      },
      handleSizeChange(e){
        this.pageSize=e;
        this.getList()
      },
      handleCurrentChange(e){
        this.currentPage=e
        this.getList()
      },
      handleUpdate(row){
        console.log(row)
      },
      handleDelete(row){
        console.log(row)
      }
    }
  }
</script>
