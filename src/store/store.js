import { makeAutoObservable } from "mobx"
import AuthService from "../services/AuthService"
import axios from "axios"
import {API_URL} from '../http/http.js'

export default class Store{
    user = {}
    isAuth = false
    isFight = false
    inSerch = false
    isLoading = false
    user_figth = {}
    checkLogin = false
    checkReg = false

    constructor(){
        makeAutoObservable(this)
    }

    setAuth(bool){
        this.isAuth = bool
    }

    setUser(user){
        this.user = user
    }

    setSerch(status){
        this.inSerch = status
    }

    setFight(isFight){
        this.isFight = isFight
    }

    setUserFight(userFight){
        this.user_figth = userFight
    }

    setLoading(isLoading){
        this.isLoading = isLoading
    }

    setCheckLogin(checkLogin){
        this.checkLogin = checkLogin
    }

    setCheckReg(checkReg){
        this.checkReg = checkReg
    }


    async login(username, password){
        this.setLoading(true)
        try {
            let response = await AuthService.login(username, password)
            console.log(response);
            if(response.status === 400){
                this.setCheckLogin(true)
            }else{
                localStorage.setItem('token', response.data.access)
                this.setAuth(true)
                this.setUser(response.data.user)
                this.setCheckLogin(false)
            }
            this.setLoading(false)
        } catch (e) {
            console.log(e);
        }
    }

    async registration(username, email, password){
        this.setLoading(true)
        try {
            const response = await AuthService.registration(username, email, password)
            if(response.status === 400){
                this.setCheckReg(true)
            }else{
                localStorage.setItem('token', response.data.access)
                this.setAuth(true)
                this.setUser(response.data.user)
            }
            this.setLoading(false)
        } catch (e) {
            console.log(e);
        }
    }

    async logout(){
        try {
            this.setLoading(true)
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setUser({})
            this.setAuth(false)
            this.setLoading(false)
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth(){
        try {
            this.setLoading(true)
            const response = await axios.get(`${API_URL}/api/refresh/`, {withCredentials: true})
            localStorage.setItem('token', response.data.access)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.setLoading(false)
        } catch (e) {
            console.log(e);
        }
    }
}







