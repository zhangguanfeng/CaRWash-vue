<template>
    <div class="rightContent">
        <transition name="fade-page" mode="out-in">
            <keep-alive v-if="$route.meta.noCache">
				<router-view></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.noCache"></router-view>
        </transition>
    </div>
</template>

<script>

</script>

<style lang = 'scss'>

</style>