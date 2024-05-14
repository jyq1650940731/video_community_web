<template>
    <div class="center-search-container">
        <div class="center-search__bar">
            <!-- 输入框 -->
            <form id="nav-searchform" :ref="formRef" :model="form">
                <div class="nav-search-content">
                    <el-input class="nav-search-input" v-model="form.searchVal" placeholder="请输入搜索内容"></el-input>
                </div>
                <div class="nav-search-clean" v-show="form.searchVal" @click="form.searchVal = ''">
                    <el-icon size="16">
                        <CircleCloseFilled />
                    </el-icon>
                </div>
                <div class="nav-search-btn">
                    <el-icon>
                        <Search />
                    </el-icon>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang='ts' setup>

const formRef = ref();
const state = reactive({
    form: {
        searchVal: ''
    }
})
const { form } = state;
</script>
<style lang='scss' scoped>
.center-search-container {
    flex: 1 auto;
    /* 宽度占80% 居中*/
    height: 40px;
}

.center-search-container .is-focus {
    box-shadow: 0 0 30px rgba(0, 0, 0, .1);
    border-radius: 8px;
}

.center-search-container .center-search__bar {
    position: relative;
    margin: 0 auto;
    min-width: 181px;
    max-width: 500px;
}

.center-search-container .center-search__bar {
    position: relative;
    margin: 0 auto;
    min-width: 181px;
    max-width: 500px;
}

#nav-searchform {
    display: flex;
    align-items: center;
    padding: 0 48px 0 4px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    border: 1px solid var(--line_regular);
    height: 40px;
    border-radius: 8px;
    background-color: var(--graph_bg_regular);
    opacity: .9;
    transition: background-color .3s;

    &:hover {
        background-color: #fff;
        opacity: 1;
    }

}

.nav-search-content {
    flex: 1
}


.nav-search-input {
    :deep() {
        .el-input__wrapper {
            background-color: #FFFFFF00;
            border-radius: 6px;
            box-shadow: none;
            padding: 1px 30px 1px 11px;
        }
    }
}

.nav-search-input-active {
    :deep() {
        .el-input__wrapper {
            background-color: #0000001A;
        }
    }
}

.nav-search-input {
    :deep() {
        .el-input__inner {
            color: var(--text2);
        }

        .el-input__inner:focus {
            color: var(--text1);
        }
    }
}





.nav-search-clean {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 55px;
    cursor: pointer;
    color: var(--graph_weak);
}



.nav-search-btn {
    position: absolute;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    color: var(--text1);
    line-height: 32px;
    cursor: pointer;
    transition: background-color .3s;
}

.nav-search-btn:hover {
    background-color: var(--graph_bg_thick);
}

.nav-search-clean:hover {
    color: var(--graph_icon);
}
</style>
