<template>
    <header class="bala-container">
        <div class="bala-header">
            <!-- 导航 -->
            <header-bar></header-bar>
            <!-- 动画 -->
            <animated-banner></animated-banner>
            <!-- logo -->
            <div class="bala-header_banner">
                <div class="header-banner_inner">
                    <div class="logo-box">
                        <router-link to="/">
                            <img src="@/assets/images/logo_white.png" alt="">
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="bala-header_channel">
                <div class="channel-icon"></div>
                <div class="right-channel-container">
                    <div class="channel-items_left"></div>
                    <div class="channel-items_right"></div>
                </div>
            </div>
        </div>
    </header>
</template>
<script lang='ts' setup>
import AnimatedBanner from './components/AnimatedBanner.vue';
</script>
<style lang='scss' scoped>
.bala-container {
    min-height: 64px;
    position: relative;
    margin: 0 auto;
    max-width: 2560px;
    width: 100%;

    .bala-header {

        .bala-header_banner {
            position: relative;
            z-index: 30;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            margin: 0 auto;
            min-width: 1000px;
            min-height: 155px;
            height: 9.375vw;
            max-height: 240px;

            .header-banner_inner {
                display: flex;
                align-items: flex-end;
                width: 100%;

                .logo-box {
                    margin-bottom: 10px;
                    z-index: 1;
                    display: inline-block;
                    min-height: 60px;
                    width: 180px;
                }
            }
        }
    }

}



// header .morning {
//     z-index: 20;
//     opacity: calc(1 - (var(--percentage) - 0.25) / 0.25);
// }

// header .afternoon {
//     z-index: 10;
//     opacity: calc(1 - (var(--percentage) - 0.5) / 0.5);
// }

// header .tree {
//     transform: translatex(calc(var(--percentage) * 50px));
//     filter: blur(3px);
// }


header.moving .view,
header.moving .tree,
header.moving .morning,
header.moving .afternoon {
    transition: none;
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
        padding: 0 96px;
        max-width: 2270px
    }
}

@media (min-width: 2200px) {
    .bala-header .header-banner_inner {
        max-width: 2078px
    }
}
</style>
