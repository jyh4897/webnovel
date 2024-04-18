import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        async function fetchData () {
            try {
                const rawData = await axios.get("http://localhost:8000/user", {})
            }
            catch (error) {
                console.error('Error fetching data', error);
            }
        }
    })

    return (
        <div>
            <div>
                <div>
                    <div>
                        <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div>
                    <button type="submit">로그인</button>
                </div>
                <div>
                    <div>
                        <Link to="/memberregister"><p>회원가입</p></Link>
                    </div>
                    <div>
                        <p>아이디/비밀번호를 잊어버리셨나요?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;