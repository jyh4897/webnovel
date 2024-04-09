import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Paging from '../components/Paging';



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
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState(0);
    const postPerPage = 5;
    const indexOfLastPost = page * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage

    useEffect(() => {
        async function fetchData() {
            try {
                const rawData = await axios.get('http://localhost:8000/novel', {});
                const sortedData = await rawData.data.filter((it) => it.category == genre);
                const novels = sortedData.map((it) => ({
                    novelid : it.novelid,
                    title : it.title,
                    category : it.category,
                    thumbnail : it.thumbnail,
                }));
                const sortedNovels = [...novels].sort((a,b) => Number(b.novelid) - Number(a.novelid));
                const rawRate = await axios.get('http://localhost:8000/avgrate', {});
                const rates = await rawRate.data.filter((it) => ({
                    novelid : it.novelid,
                    title: it.title,
                    avgrate : it.avgrate
                }));
                setNovel(sortedNovels);
                setRate(rates);
                setCount(sortedNovels.length); 
            } catch (error) {
                console.error('Error fetching data', error);
            }
            
        }
        fetchData();
    },[genre])

    useEffect(() => {
        setCurrentPosts(novel.slice(indexOfFirstPost, indexOfLastPost));
    }, [novel])

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div>
            <div>


                <Paging page={currentPage} count={count} handleChangePage={handleChangePage} postPerPage={postPerPage} />
            </div>
        </div>
    )
}


export default List;