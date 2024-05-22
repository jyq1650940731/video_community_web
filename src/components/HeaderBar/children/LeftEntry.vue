
<template>
    <ul class="left-entry">
        <li v-if="isFixHeaderBar">
            <router-link to="/" class="left-entry__title">
                <img src="@/assets/images/logo_blue.png" class="mini-header__logo">
                <div class="mini-header__title">
                    <span>首页</span>
                </div>
            </router-link>
        </li>
        <li v-else>
            <router-link to="/" class="entry-title">
                <svg-icon name="logo" color="#fff" width="20" class="main-icon"></svg-icon>
                <span>首页</span>
            </router-link>
        </li>
        <li class="default-entry" v-for="item in listBar" :key="item.id" @click="noPage">
            <span>{{ item.name }}</span>
        </li>
    </ul>
</template>
<script lang='ts' setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const isOpen = ref(false);

const noPage = () => {
    ElMessage({
        message: '维护中...',
        type: 'warning',
    })
}


defineProps(['listBar', 'isFixHeaderBar'])

</script>
<style lang='scss' scoped>
.left-entry {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 30px;

    .main-icon {
        margin-right: 6px;
        color: #fff;
    }

    .entry-title {
        display: flex;
        align-items: center;

    }

    .default-entry {
        display: inline-block;
        margin-right: 20px;

        &:hover span {
            animation: jump .3s;
        }
    }

    .left-entry__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 20px;
        height: 56px;

        .mini-header__logo {
            margin-right: 25px;
            width: 115px;
            cursor: pointer;
        }

        .mini-header__title {
            display: flex;
            align-items: center;
            text-align: center;
            line-height: 20px;
            cursor: pointer;
            color: #fff;

            span {
                display: inline-block;
                margin-right: 5px;
            }
        }

        .mini-header__arrow {
            width: 15px;
        }
    }


}
</style>
