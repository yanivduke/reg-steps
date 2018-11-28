/* eslint-disable promise/param-names */
import { POSTBACK_REQUEST, POSTBACK_SUCCESS, POSTBACK_ERROR, STEP1_REQUEST, STEP1_ERROR, STEP1_SUCCESS, STEP2_REQUEST, STEP2_ERROR, STEP2_SUCCESS,STEP3_REQUEST, STEP3_ERROR, STEP3_SUCCESS } from '../actions/steps'

import {idbKeyVal} from '../../idbPromise'

const state = { step: 0, status: '', registration: {firstname:'',lastname:'',email:'',phone:''} }

const getters = {
  step: state => state.step,
  stepStatus: state => state.status,

}

const actions = {
  [POSTBACK_REQUEST]: ({commit, dispatch}, data1) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify(data1);
      let postConfig = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'include', // include, same-origin, *omit
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: data,
      }

      commit(POSTBACK_REQUEST)

      fetch('http://localhost:3001/api/steps/ispostback/', postConfig)
      //fetch('/api/authenticate/', postConfig)
      .then((resp) => resp.json().then((respJson) => {
        console.log(respJson)
        commit(POSTBACK_SUCCESS, respJson)
        resolve(respJson)
      }))
      .catch(err => {
        commit(POSTBACK_ERROR, err)
        reject(err)
      })
    })
  },
  [STEP1_REQUEST]: ({commit, dispatch}, data1) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify(data1);
      let postConfig = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'include', // include, same-origin, *omit
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: data,
      }

      commit(STEP1_REQUEST)

      fetch('http://localhost:3001/api/steps/1/', postConfig)
      //fetch('/api/authenticate/', postConfig)
      .then((resp) => resp.json().then((respJson) => {
        console.log("in store steps",respJson)
        commit(STEP1_SUCCESS, respJson)
        resolve(respJson)
      }))
      .catch(err => {
        commit(STEP1_ERROR, err)
        reject(err)
      })
    })
  },
  [STEP2_REQUEST]: ({commit, dispatch}, data2) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify(data2);
      let postConfig = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'include', // include, same-origin, *omit
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: data,
      }

      commit(STEP2_REQUEST)

      fetch('http://localhost:3001/api/steps/2/', postConfig)
      //fetch('/api/authenticate/', postConfig)
      .then((resp) => resp.json().then((respJson) => {
        
        commit(STEP2_SUCCESS, respJson)
        resolve(respJson.data)
      }))
      .catch(err => {
        commit(STEP2_ERROR, err)
        reject(err)
      })
    })
  },
  [STEP3_REQUEST]: ({commit, dispatch}, data3) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify(data3);
      let postConfig = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'include', // include, same-origin, *omit
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: data,
      }

      commit(STEP3_REQUEST)

      fetch('http://localhost:3001/api/steps/3/', postConfig)
      //fetch('/api/authenticate/', postConfig)
      .then((resp) => resp.json().then((respJson) => {
        commit(STEP3_SUCCESS, respJson)
        resolve(respJson.data)
      }))
      .catch(err => {
        commit(STEP3_ERROR, err)
        reject(err)
      })
    })
  },
  
}

const mutations = {
  [POSTBACK_REQUEST]: (state) => {
    state.status = 'processing...'
  },
  [POSTBACK_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.step = resp.data.step
    state.registration.firstname = resp.data.firstname
    state.registration.lastname = resp.data.lastname

  },
  [POSTBACK_ERROR]: (state) => {
    state.status = 'error'
  },
  [STEP1_REQUEST]: (state) => {
    state.status = 'processing...'
  },
  [STEP1_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.step = 1
  },
  [STEP1_ERROR]: (state) => {
    state.status = 'error'
  },
  [STEP2_REQUEST]: (state) => {
    state.status = 'processing...'
  },
  [STEP2_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.step = 2
  },
  [STEP2_ERROR]: (state) => {
    state.status = 'error'
  },
  [STEP3_REQUEST]: (state) => {
    state.status = 'processing...'
  },
  [STEP3_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.step = 3
  },
  [STEP3_ERROR]: (state) => {
    state.status = 'error'
  },
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
