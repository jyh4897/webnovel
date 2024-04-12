import { useState, useEffect } from 'react'

const Memberregister = () => {

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [checkpassword, setCheckpassword] = useState('');
    const [email, setEmail] = useState('');


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
                            />
                        </div>
                        <div>
                            <button>중복확인</button>
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
                             />
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>이메일</p>
                        </div>
                        <div>
                            <input 
                            type="text" 
                            value={email}
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