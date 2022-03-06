import axios from 'axios';
import SERVER_API_BASE_URL from '../api/ServerApi';



class OrderService{
    getPreviousOrders(){
        return axios.get(SERVER_API_BASE_URL+"/allOrders");
    }

    addOrder(order){
        return axios.post(SERVER_API_BASE_URL+"/order",order);
    }
}
export default new OrderService;