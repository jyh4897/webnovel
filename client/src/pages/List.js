import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const List = () => {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const genre = queryParams.get('genre');
    const sort = queryParams.get('sort');
    const [ novel, setNovel] = useState({
        novelid : '',
        title : '',
        category: '',
        thumbnail : '',
    })
    const [ rate, setRate ] = useState({
        novelid : '',
        title: '',
        avgrate : ''
    })

    useEffect(() => {
        async function fetchData() {
            const rawData = await axios.get('http://localhost:8000/novel', {});
            const sortedData = await rawData.data.filter((it) => it.category == genre);
            const novels = sortedData.map((it) => ({
                novelid : it.novelid,
                title : it.title,
                category : it.category,
                thumbnail : it.thumbnail,
            }));
            const rawRate = await axios.get('http://localhost:8000/avgrate', {});
            const rates = await rawRate.data.filter((it) => ({
                novelid : it.novelid,
                title: it.title,
                avgrate : it.avgrate
            }));
            setNovel(novels);
            setRate(rates);
        }
        fetchData();
    },[genre])

    return (
        <div>

        </div>
    )
}


export default List;