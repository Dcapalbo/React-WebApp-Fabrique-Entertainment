import { useState, useEffect } from 'react';
import axios from 'axios';

const ApiHook = ( url, dataType ) => {

    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    const [fabriqueData, setFabriqueData] = useState([]);

    useEffect(() => {
        setloading(true);
        axios
        .get(url)   
            .then(res => {
                setFabriqueData(res.data.body[dataType]);
                console.log(res.data.body);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
                console.log("finished to fetch data");
            }); 
    }, [url, dataType]);

    return { fabriqueData, loading, error };
    
}

export default ApiHook;
