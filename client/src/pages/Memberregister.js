import { useState, useEffect } from 'react'
import styles from './Memberregitser.module.css';
import axios from 'axios'

const Memberregister = () => {

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [checkpassword, setCheckpassword] = useState('');
    const [email, setEmail] = useState('');
    const [nameduplication , setNameduplication] = useState(false);
    const [emailduplication, setEmailduplication] = useState(false);

    const handleUsernamecheck = () => {
        if (!username) {
            alert("ID를 입력해주세요!");
            return
        }

        axios.post('http://localhost:8000/checkusername', { username })
        .then((result) => {
            console.log('요청성공');
            console.log(result);
        })
        .then((res) => {
            console.log("서버 응답:", res.data);
            setNameduplication(res.data.success);
            alert(res.data.message);
        })
        .catch((err) => {
            console.error("중복확인 중 오류", err)
            alert("ID 중복 확인 중 오류가 발생하였습니다.");
        })
    }


    return (
        <div>
            <div>
                <div>
                    <p>회원가입</p>
                </div>
                <div>
                    <div>
                        <div>
                            <p>ID</p>
                        </div>
                        <div>
                            <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                        <div>
                            <button onClick={handleUsernamecheck}>중복확인</button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>닉네임</p>
                        </div>
                        <div>
                            <input 
                            type="text" 
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                             />
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>비밀번호</p>
                        </div>
                        <div>
                            <input 
                            type="text" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                             />
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>비밀번호 확인</p>
                        </div>
                        <div>
                            <input 
                            type="text" 
                            value={checkpassword}
                            onChange={(e) => setCheckpassword(e.target.value)}
                             />
                        </div>
                        {password && checkpassword && password !== checkpassword ? 
                        <div>
                            <p>비밀번호가 일치하지 않습니다.</p>
                        </div>
                        : ''}
                    </div>
                    <div>
                        <div>
                            <p>이메일</p>
                        </div>
                        <div>
                            <input 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                             />
                        </div>
                        <div>
                            <button>중복확인</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit">회원가입</button>
                    <button>취소</button>
                </div>
            </div>
        </div>
    )
}

export default Memberregister;