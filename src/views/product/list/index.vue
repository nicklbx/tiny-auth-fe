<template>
  <div class="app-container" style="margin:20px 60px; ">
    <div class="search-contailer"  >
      <el-form :inline="true" :model="searchMap" >
        <el-form-item label="商品id">
          <el-input v-model="searchMap.productId" placeholder="商品id"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchMap.productName" placeholder="商品名称"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch()">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-product" style="display: flex;justify-content: flex-start;margin-left: 10px;">
      <el-button  type="primary" round>添加商品</el-button>
    </div>
    <div class="table-container" style="margin-top: 10px;">

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
        show-overflow-tooltip
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
    </div>

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
  import {listProduct,updateProduct,deleteProduct}  from '@/api/product'

  export default {

    data() {
      return {
        tableData: [],
        total:0,
        pageSize:10,
        currentPage:1,
        searchMap: {
                  productId: null,
                  productName: null
        }

      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList(){
        let params={
          pageNo:this.currentPage,
          pageSize:this.pageSize,
          productId:this.productId,
          productName:this.productName
        }
        //请求后台接口
        listProduct(params)
          .then(res=>{
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
        this.$confirm('确认删除商品?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {//确认删除
                  deleteProduct(row.productId)
                    .then(res=>{//删除成功
                      this.currentPage=1;
                      this.pageSize=10;
                      this.getList();
                      this.$message({
                        message: '删除成功!',
                        type: 'success'
                      });
                    }).catch(err=>{//删除失败
                        this.$message({
                          message: '删除失败！',
                          type: 'danger'
                        })
                      })
                }).catch(() => { //取消删除
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });


      },
      handleSearch(){
        this.productId=this.searchMap.productId;
        this.productName=this.searchMap.productName;
        this.currentPage=1;
        this.pageSize=10;
        this.getList()
      }
    }
  }
</script>
