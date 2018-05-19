import axios from 'axios'

export function api_seller () {
    return new Promise((resolve, rejects) => {
        axios.get('https://www.easy-mock.com/mock/5af2ea652440bf0190eee1cb/sell/seller')
        .then(response=>{
            resolve(response)
        })
        .catch(error=>{
            rejects(error)
        })
    })
}

export function api_goods () {
    return new Promise((resolve, rejects) => {
        axios.get('https://www.easy-mock.com/mock/5af2ea652440bf0190eee1cb/sell/goods')
        .then(response=>{
            resolve(response)
        })
        .catch(error=>{
            rejects(error)
        })
    })
}

export function api_comments () {
    return new Promise((resolve, rejects) => {
        axios.get('https://www.easy-mock.com/mock/5af2ea652440bf0190eee1cb/sell/comment')
        .then(response=>{
            resolve(response)
        })
        .catch(error=>{
            rejects(error)
        })
    })
}