import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Paging from '../components/Paging';



const List = () => {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const genre = queryParams.get('genre');
    const page = queryParams.get('page');
    const [ novel, setNovel] = useState([{
        novelid : '',
        title : '',
        category: '',
        thumbnail : '',
    }])
    const [ rate, setRate ] = useState([{
        novelid : '',
        title: '',
        avgrate : ''
    }])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState(0);
    const postPerPage = 5;
    const indexOfLastPost = currentPage * postPerPage;
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
                const rates = await rawRate.data.map((it) => ({
                    novelid : it.novelid,
                    title: it.title,
                    avgrate : it.avgrate
                }));
                setNovel(sortedNovels);
                setRate(rates);
                setCount(sortedNovels.length); 
                console.log(rate)
            } catch (error) {
                console.error('Error fetching data', error);
            }
            
        }
        fetchData();
    },[genre, page, rate])

    useEffect(() => {
        setCurrentPosts(novel.slice(indexOfFirstPost, indexOfLastPost));
    }, [novel, page, genre, indexOfFirstPost, indexOfLastPost])

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div>
            <div>
                <div>
                    {currentPosts && currentPosts.length > 0 ? 
                    currentPosts.map((it) => (
                        <div key={it.novelid}>
                            <div>
                                <img src={it.thumbnail} alt="img"/>
                            </div>
                            <div>
                                <p>{it.title}</p>
                            </div>
                            {rate.filter((rate) => rate.novelid == it.novelid) > 0 ? 
                            rate.filter((rate) => rate.novelid == it.novelid).map((prev) => (
                                <div>
                                    {prev.avgrate}
                                </div>
                            )) : <div><p>리뷰가 존재하지 않습니다</p></div>}
                        </div>
                    ))
                    : <div>등록된 작품이 없습니다.</div>}
                </div>
                <Paging page={currentPage} count={count} handleChangePage={handleChangePage} postPerPage={postPerPage} />
            </div>
        </div>
    )
}


export default List;