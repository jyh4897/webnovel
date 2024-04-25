import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RefreshTokenContext } from '../RefreshTokenContext.js'

const Login = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { refreshToken, setRefreshToken } = useContext(RefreshTokenContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/login", { id, password }, { withCredentials: true })
            .then((response) => {
                const { accessToken, refreshToken } = response.data;
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                setRefreshToken(refreshToken);
                console.log(refreshToken);
                return response.data;
            })
        }
        catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                console.log('Error status:', status);
                console.log('Error data:', data);
                if (status === 401 || status === 400) {
                    setError("아이디 또는 비밀번호가 올바르지 않습니다.")
                }
                else {
                    setError("서버 오류가 발생하였습니다.")
                }
            }
            else {
                console.error('Error fetching data', error);
            }
        }
        
    }

    useEffect(() => {
        console.log(refreshToken)
    },[refreshToken])

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
                    <button type="submit" onClick={handleLogin}>로그인</button>
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