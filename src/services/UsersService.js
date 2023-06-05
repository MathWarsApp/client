import { _api } from "../http/http";

export default class UsersService{
    static async getUsers(){
        return _api.get('/api/users/')
    }

    static async deleteUser(id){
        return _api.delete('/api/user-delete/', {data: {id}})
    }
}