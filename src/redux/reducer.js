import {api_seller} from '../../src/tools/api.js'

const state_init = {
    seller_data: null,      // 店铺数据
    alert_show: null,       // 店铺详情弹出框
    goods_cur: 0,           // 当期选中的商品种类
    left_list: null,        // 左边商品种类一级列表
    right_list: null,       // 右边商品细分二级列表
    left_scroll: null,
    right_scroll: null,
    right_change_left: true,       // 右边的scroll滚动时是否可以改变左边的scroll
    goods: [],              // 加入购物车的商品
    goods_number: 0,        // ↑↑↑↑↑解决list变化view不刷新问题
    balls: [],
    balls_number: 0,
    is_detail_show: false,     // 详情页面是否显示
    detail_food_data: null    // food详情页的数据
}
const mutations = {
    get_seller_data (state, payload) {
        return {
            ...state,
            seller_data: payload.seller_data
        }
    },
    alert (state, payload) {
        return {
            ...state,
            alert_show: payload.flag
        }
    },
    change_cur (state, payload) {
        return {
            ...state,
            goods_cur: payload.data.cur,
            right_change_left: payload.data.right_change_left
        }
    },
    set_left_list (state, payload) {
        return {
            ...state,
            left_list: payload.list
        }
    },    
    set_right_list (state, payload) {
        return {
            ...state,
            right_list: payload.list
        }
    },
    set_left_scroll (state, payload) {
        return {
            ...state,
            left_scroll: payload.scroll
        }
    },    
    set_right_scroll (state, payload) {
        return {
            ...state,
            right_scroll: payload.scroll
        }
    },
    add_goods (state, payload) {
        let goods = payload.goods
        let goods_number = state.goods_number
        goods_number++
        return {
            ...state,
            goods,
            goods_number
        }
    },
    remove_goods (state, payload) {
        let goods = payload.goods
        let goods_number = state.goods_number
        goods_number++
        return{
            ...state,
            goods,
            goods_number
        }
    },
    clear_cart (state, payload) {
        let goods = payload.goods
        let goods_number = 0
        let balls = []
        let balls_number = 0
        return {
            ...state,
            goods,
            goods_number,
            balls,
            balls_number
        }
    },
    add_ball (state, payload) {
        let balls = payload.ball
        let balls_number = balls.length
        return {
            ...state,
            balls,
            balls_number
        }
    },
    detail_show (state, payload) {
        let is_detail_show = payload.detail_data.is_show
        let detail_food_data = payload.detail_data.food_data
        return {
            ...state,
            is_detail_show,
            detail_food_data
        }
    },
    remove_balls (state, payload) {
        let balls = []
        let balls_number = 0
        return {
            ...state,
            balls,
            balls_number
        }
    }
}

export const actions = {
    get_seller_data (payload) {
        return dispatch => {
            api_seller().then(res => {
                let data = res.data.data
                dispatch({type: 'get_seller_data', seller_data: data})        
            })
        }
    },
    alert_close (payload) {
        return {'type': 'alert', 'flag': false}
    },
    alert_show (payload) {
        return {'type': 'alert', 'flag': true}
    },
    change_cur (payload) {
        return {'type': 'change_cur', 'data': payload}
    },
    set_left_list (payload) {
        return {'type': 'set_left_list', 'list': payload}
    },
    set_right_list (payload) {
        return {'type': 'set_right_list', 'list': payload}
    },
    set_left_scroll (payload) {
        return {'type': 'set_left_scroll', 'scroll': payload}
    },
    set_right_scroll (payload) {
        return {'type': 'set_right_scroll', 'scroll': payload}
    },
    add_goods (payload) {
        return {'type': 'add_goods', 'goods': payload}
    },
    remove_goods (payload) {
        return {'type': 'remove_goods', 'goods': payload}
    },
    clear_cart (payload) {
        return {'type': 'clear_cart', 'goods': []}
    },
    add_ball (payload) {
        return {'type': 'add_ball', 'ball': payload}
    },
    detail_show (payload) {
        return {'type': 'detail_show', 'detail_data': payload}
    },
    remove_balls (payload) {
        return {'type': 'remove_balls'}
    }
}

export function reducer (state = state_init , payload) {
    if(mutations.hasOwnProperty(payload.type)){
        return mutations[payload.type](state , payload);
    }
   return state;
}
