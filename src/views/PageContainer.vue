<template>
    <div class="box">
        <div class="btn" @click="press">按</div>
        <div class="scrollBox">
            <div class="item itemHeight">{{default_list[0]}}</div>
            <div class="item" :class="[`item${id}`]" v-for="(item,id) in default_list" :key="id">
                <div>{{item.name}}</div>
                <div>{{item.age}}</div>
                <div>{{item.sex}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    // import { ceshi } from '../api/demo'
    export default {
        props:{
            size:{
                type:Number,
                default:20
            },
            all_list:{
                type:Array,
                default:()=>(new Array(200)).fill(11).map((item,idx) => {
                    return {
                        name:`张${idx+1}`,
                        age:idx+20,
                        sex:idx%2==0?'男':'女'
                    }
                })
            },
        },
        data() {
            return {
                default_list:[],
                move_distance:0,
                itemHeight:0,
                all_height:0
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init(){
                setTimeout(() => {
                    this.default_list = this.all_list.slice(0,this.size)
                    this.get_dom_size(this.all_list)
                });
            },
            get_dom_size(arr){
                // 获取单个高度
                const itemHeight = document.querySelector('.itemHeight')
                itemHeight.style.display = 'block'
                const height = itemHeight.clientHeight
                this.itemHeight = height
                // console.log('height--->',height)
                // 获取所有item的高度
                const all_height = height * arr.length
                this.all_height = all_height
                // console.log('all_height--->',all_height)
                // 所有高度赋值给滚动的scrollBox
                const scrollBox = document.querySelector('.scrollBox')
                scrollBox.style.height = `${all_height}px`
                itemHeight.style.display = 'none'
                // 每个item移动的距离绝对值
                this.move_distance = this.size * height
                // console.log('move_distance>',this.move_distance)
                // 调用box滚动方法
                this.box_scroll()
            },
            box_scroll(){
                const vm = this
                var scroll_top,index_piece,index_item
                const box = document.querySelector('.box')
                box.onscroll = function() {
                    scroll_top = box.scrollTop
                    // console.log('scroll_top',scroll_top)
                    // 滚到了第几个区间
                    index_piece = parseInt(scroll_top / vm.move_distance)
                    // 滚到该区间的哪一个item
                    index_item = parseInt((scroll_top % vm.move_distance) / vm.itemHeight)
                    // console.log(`第${index_piece}个区间,第${index_item}个item`)
                    // 拆分两组视图。下去的和即将下去的
                    const arr = (new Array(vm.size)).fill(0).map((item,idx) => idx)
                    var down = arr.slice(0,index_item)
                    var will_down = arr.slice(index_item)
                    // console.log('down',down,'will_down',will_down)
                    down.forEach((item,idx) => {
                        const itemDom = document.querySelector(`.item${item}`)
                        // console.log('itemDom',itemDom)
                        itemDom.style.transform = `translateY(${vm.move_distance * (index_piece+1)}px)`
                        // 定位，确定移动的是整体的第几个数据
                        const number = (index_piece+1) * vm.size + item
                        // console.log('number',number)
                        // console.log('item',item)
                        // console.log('vm.default_list',vm.default_list)
                        vm.$set(vm.default_list,Number(item),vm.all_list[number])
                    })
                    will_down.forEach((item,idx) => {
                        const itemDom = document.querySelector(`.item${item}`)
                        // console.log('itemDom',itemDom)
                        itemDom.style.transform = `translateY(${vm.move_distance * (index_piece)}px)`
                        // 定位，确定移动的是整体的第几个数据
                        const number = (index_piece) * vm.size + item
                        // console.log('number',number)
                        // console.log('item',item)
                        // console.log('vm.default_list',vm.default_list)
                        vm.$set(vm.default_list,Number(item),vm.all_list[number])
                    })
                }
            },
            press(){
                this.all_list[21].name = '牛逼'
                var obj = this.all_list[21]
                var last = this.all_list[199]
                this.all_list.splice(21,1)
                this.all_list.unshift(obj)
                this.all_list.splice(199,1)
                this.all_list.unshift(last)

                setTimeout(() => {
                    this.default_list = this.all_list.slice(0,this.size)
                    this.get_dom_size(this.all_list)
                });

                console.log('press',this.all_list)
            }
        },
        watch: {
            default_list(){
                console.log('biale')
            }
        },
    }
</script>

<style lang="scss" scoped>
    .box{
        position: absolute;left: 0;top: 0;width: 100vw;height: 100vh;overflow: auto;-webkit-overflow-scrolling: touch;box-sizing: border-box;
        .btn{
            position: fixed;right: 5vw;bottom: 5vw;width: 15vw;height: 15vw;border-radius: 100%;background: lightseagreen;color: white;font-size: 4vw;
            text-align: center;line-height: 15vw;z-index: 2;
        }
        div{
            box-sizing: border-box;
        }
        .scrollBox{
            overflow: hidden;
        }
        .item{
            width: 100vw;box-sizing: border-box;padding: 0 5vw;box-shadow: 0 2px #eee;line-height: 15vw;height: 15vw;
            >div{
                float: left;margin-right: 20vw
            }
        }
    }
</style>
