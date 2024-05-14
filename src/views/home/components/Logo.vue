<template>
    <div class="header-banner_inner">
        <div class="logo-box">
            <router-link to="/">
                <img src="@/assets/images/logo_white.png" alt="">
            </router-link>
        </div>
    </div>
</template>
<script lang='ts' setup>
</script>
<style lang='scss' scoped>
.header-banner_inner {
    position: relative;
    display: flex;
    align-items: flex-end;
    width: 100%;
    max-width: 2078px;
    margin: 0 auto;
    z-index: 20;

    .logo-box {
        margin-bottom: 10px;
        z-index: 1;
        display: inline-block;
        min-height: 60px;
        width: 180px;
    }
}

@media (max-width: 1099.9px) {
    .bala-header .header-banner_inner {
        padding: 0 56px
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .bala-header .header-banner_inner {
        padding: 0 56px
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .bala-header .header-banner_inner {
        padding: 0 64px
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .bala-header .header-banner_inner {
        padding: 0 130px;
        max-width: 2270px
    }
}

@media (min-width: 2200px) {
    .bala-header .header-banner_inner {
        max-width: 2078px
    }
}
</style>
