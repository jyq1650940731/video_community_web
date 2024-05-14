<template>
    <div class="bala-header_banner">
        <div class="animated-banner">
            <!-- <img src="@/assets/images/animated/bilibili-winter-view-1.jpg" class="morning" alt=""> -->
            <!-- <img src="@/assets/images/animated/bilibili-winter-view-3.jpg" class="afternoon" alt=""> -->
            <img src="@/assets/images/animated/banner.png" class="afternoon" alt="">
            <video autoplay loop muted class="evening">
                <source src="@/assets/images/animated/bilibili-winter-view-3.webm" type="video/webm" />
            </video>
            <img src="@/assets/images/animated/bilibili-winter-view-3-snow.png" class="window-cover" alt="">
        </div>
        <!-- logo -->
        <logo></logo>
    </div>
</template>
<script lang='ts' setup>
import logo from './Logo.vue';
</script>
<style lang='scss' scoped>
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


    .animated-banner {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        transition: .2s all ease-in;
        transform: translatex(calc(var(--percentage) * 100px));


        img {
            position: absolute;
            display: block;
            width: 120%;
            height: 100%;
            object-fit: cover;
        }

        .morning {
            z-index: 20;
            opacity: calc(1 - (var(--percentage) - 0.25) / 0.25);
        }

        .afternoon {
            z-index: 10;
            opacity: calc(1 - (var(--percentage) - 0.5) / 0.5);
        }

        .window-cover {
            opacity: calc((var(--percentage) - 0.9) / 0.1);
        }
    }
}

.moving {
    .afternoon {
        transition: none;
    }

}
</style>
