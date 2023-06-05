import { _api } from "../http/http";

export default class GameServices{
    static async gameStart(username){
        return _api.post('/api/to-queue/', {username})
    }

    static async gameEnd(username){
        return _api.delete('/api/remove-queue/', {data: {username}})
    }

    static async getExpression(){
        return _api.get('api/generate-exp/')
    }
}