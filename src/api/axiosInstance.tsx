import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import Expense from '../models/Expense';
import { testExpoenseTypes } from '../testData';

const axiosInstance = axios.create()

if (process.env.REACT_APP_DEBUG) {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

    mock.onGet("/").reply((config): [number] | [number, Expense[]] => {
        if (config.params?.page && config.params.page > 5) {
            return [204];
        }

        const page: number = config.params?.page ?? 0;
        
        const values: Expense[] = [];
        const pageSize: number = 30;
        for (let i = page * pageSize; i < page * pageSize + pageSize; i++) {
            values.push({
                "id": String(i),
                "category": testExpoenseTypes[Math.floor(Math.random() * (testExpoenseTypes.length))],
                "date": 2024 + "-" + 8 + "-" + 1,
                "description": "item " + (i+1) + (config.params?.search? " " + config.params?.search : ""),
                "price": Math.floor(Math.random() * (1000-9)+10)
            })
        }

        return [200, values];
    });
}

export default axiosInstance;