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


    const handleUsernamecheck = () => {
        if (!username) {
            alert("ID를 입력해주세요!");
            return
        }
        console.log(username)
        axios.post('http://localhost:8000/checkusername', { username })
        .then((res) => {
            console.log('요청성공');
            console.log("서버 응답:", res.data);
            setNameduplication(res.data.success);
            alert(res.data.message);
        })
        .catch((err) => {
            console.error("중복확인 중 오류", err)
            alert("ID 중복 확인 중 오류가 발생하였습니다.");
        })
    }


    const handleSubmint = async () => {
        try { 
            if(!username || !nickname || !password || !checkpassword || !email) {
            alert("필수 입력사항들을 모두 입력해주세요");
            return;
            }
            if (!nameduplication) {
                alert("ID 중복 확인을 해주세요");
                return;
            }
            if (!email.includes('@')) {
                alert("올바른 이메일 형식이 아닙니다.");
                return;
            }
            if (password !== checkpassword) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            await axios.post("http://localhost:8000/userregister", {
                username,
                nickname,
                password,
                email
            })
            .then((result) => {
                console.log("요청성공");
                console.log(result);
            })
            .catch((err) => {
                console.log('err');
                console.log(err);
            })
        }
        catch {
            console.error('에러');
        }
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
                            {nameduplication ? 
                            <div>
                                <p>사용하실 수 있는 ID입니다.</p>
                            </div>
                            : ''}
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
                            type="password" 
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
                            type="password" 
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
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmint}>회원가입</button>
                    <button>취소</button>
                </div>
            </div>
        </div>
    )
}

export default Memberregister;