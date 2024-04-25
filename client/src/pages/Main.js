import {Link} from 'react-router-dom';

const Main = () => {
    
    return (
        <div>
            Hello world
            <ul>
                <Link to={"/list?genre=1&page=1"}><li>무협</li></Link>
            </ul>
        </div>
    )
}

export default Main;