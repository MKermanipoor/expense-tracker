import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import Expense from '../models/Expense';
import { testExpoenseTypes } from '../testData';
import ExpenseItem from '@/models/ExpenseItem';

const axiosInstance = axios.create()

if (process.env.REACT_APP_DEBUG) {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });

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
                "store": "store " + (i + 1) + (config.params?.search ? " " + config.params?.search : ""),
                "price": Math.floor(Math.random() * (1000 - 9) + 10),
                "date": 2024 + "-" + 8 + "-" + 1,
                "items": Array.from({ length: Math.floor(Math.random() * 5) }, (value, index) => {
                    return {
                        id: String(i) + '_' + index,
                        title: 'item ' + index,
                        price: Math.random() > 0.8 ? Math.floor(Math.random() * (50 - 5) + 5) / 10 : undefined,
                        tag: Math.random() > 0.5 ? 'tag' : undefined,
                    }
                })
            })
            if (values[values.length - 1].items?.length === 0) {
                values[values.length - 1].items = undefined
            }
        }

        return [200, values];
    });
}

export default axiosInstance;