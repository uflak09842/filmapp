import { useEffect, useState } from "react";
import axios from 'axios';

const useGet = (url, params) => {
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get(url, {
                params: params
            });

            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.msg || 'Bilinmeyen Bir Hata Oluştu');
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [url]);

    return {
        error,
        loading,
        data
    }
}

export default useGet;