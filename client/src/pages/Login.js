import { Link } from 'react-router-dom';

const Login = () => {

    

    return (
        <div>
            <div>
                <div>
                    <div>
                        <input type="text" placeholder="아이디" />
                    </div>
                    <div>
                        <input type="password" placeholder="비밀번호" />
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