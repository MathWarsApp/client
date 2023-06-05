import { _api } from "../http/http";

export default class AuthService{
    static async login(username, password){
        return _api.post('/api/login/', {username, password})
    }

    static async registration(username, email, password){
        return _api.post('/api/register/', {username, email, password})
    }

    static async logout(){
        return _api.post('/api/logout/')
    }
}