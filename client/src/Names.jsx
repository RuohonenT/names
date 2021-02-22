import React, { useEffect, useState } from 'react';
import './Names.css';

const axios = require('axios');

const useAxios = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(url)
        axios.get(url)
            .then(async res => {
                setData(res.data)
            })
            .catch(async error =>
                setData('uh oh error!'));
    }, [setData, url]);

    return [data];
};


function Names() {
    const [namesData] = useAxios('api/data');
    /* creating a "employees" state with empty array as initial state,
    later on to be set in sortArray function with the sorted array  */
    const [employees, setEmployees] = useState([]);
    /* creating a "arrange" state and give it a value of empty string "" so
    when the app renders the first time it'll sort the names in alphabetical order
    using sortArray function's arrow function "sorted" and it's else -property */
    const [arrange, setArrange] = useState('');
    // creating a "count" state and set it to "workers.length" to count the length of the "names" array
    const [count, setCount] = useState(null);
    const [total, setTotal] = useState(null);

    useEffect(() => {

        /* arrow function taking in argument "value". creating types object to give properties 
        "decending", "ascending" and "amount" their respective values  */
        const sortNames = value => {
            const types = {
                descending: 'descending',
                ascending: 'ascending',
                amount: 'amount'
            };

            const sortValue = types[value];

            /* using spread operator to create a new array from workers and sort it either by descending or ascending names, 
            or by the amount of each name.  */
            let am = [];
            for (let i in namesData) {
                for (let j in namesData[i]) {
                    am.push(Object.values(namesData[i][j]));
                    setCount(namesData[i].length);
                    const sorted = [...namesData[i]].sort((a, b) => {
                        if (sortValue === 'amount') {
                            return b[sortValue] - a[sortValue];
                        } else if (sortValue === 'ascending') {
                            return b.name.localeCompare(a.name);
                        } else {
                            return a.name.localeCompare(b.name);
                        }
                    })
                    setEmployees(sorted);
                }
                let num = 0;
                am.map(emp => num += emp[1]);
                setTotal(num);
            }
        };
        sortNames(arrange);
    }, [namesData, arrange]);

    return (
        <div className='container'>
            {employees.length > 0 ?
                <>
                    <div className='select_amount'>
                        <select onChange={(e) => setArrange(e.target.value)}>
                            <option value='arrange'>Järjestä</option>
                            <option value='descending'>Laskeva</option>
                            <option value='ascending'>Nouseva</option>
                            <option value='amount'>Määrän mukaan</option>
                        </select>
                    </div>

                    <div className='arrange_names'>
                        {employees.map((employee, i) => (
                            <div key={i} className='names_container'>
                                <div className='names'>
                                    {employee.name} {employee.amount}
                                </div>
                            </div>
                        ))}
                    </div >

                    <div className='total'>
                        Nimiä yhteensä: {count}<br />
                        Kokonaismäärä: {total}
                    </div>

                </>
                :

                <div>Not Found</div>}

        </div >
    )

};

export default Names;
