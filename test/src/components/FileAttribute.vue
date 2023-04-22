<template>

  <div style="position:fixed;margin-top: 85px;margin-left: 6px;float: left">
    <!--  全选选择框 element plus-->
    <el-checkbox  :indeterminate="store.state.check_box_check_all_is_indeterminate" ></el-checkbox><!--        //indeterminate	设置不确定状态，仅负责样式控制	boolean  -->
  </div>
  <table style="width: 100%;position: relative">
    <tr>

      <td style="width:79.5%;font-size: 7px;color: #727272;" class="table-td" >
        <span style="margin-left: 30px"> 名称 </span>
      </td>
      <td  style="font-size: 7px;color: #727272;width: 11.7%" class="table-td" >修改日期</td>
      <td  style="font-size: 7px;color: #727272;" class="table-td" >大小 </td>
      <!--      <td  style="width: 110px" class="table-td" ></td>-->
    </tr>
  </table>

</template>

<script setup>
import store from "@/store";
</script>

<style scoped>

</style>
