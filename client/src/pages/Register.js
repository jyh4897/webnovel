import { useState } from 'react';


const Register = () => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('1');
    const [img, setImg] = useState([]);
    const [description, setDescription] = useState('');
    const [writer, setWriter] = useState('');
    const [platform, setPlatform] = useState('');

    const handleChangeFile = (e) => {
        const selectedFiles = e.target.files
        if(selectedFiles.length > 0) {
            const filesArray = Array.from(selectedFiles);
            setImg((prev) => [...prev, ...filesArray]);
        }
    }



    return (
        <div>
            <div>           
                <div>
                    <div>
                        <p>대표사진</p>
                    </div>
                    <div>
                        <input type="file" name="files" onChange={(e) => handleChangeFile(e)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <p>장르</p>
                        </div>
                        <div>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="1">무협</option>
                                <option value="2">판타지</option>
                                <option value="3">퓨전판타지</option>
                                <option value="4">현대판타지</option>
                                <option value="5">로맨스판타지</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>작가</p>
                        </div>
                        <div>
                            <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <p>작품명</p>
                    </div>
                    <div>
                        <input type="text" />
                    </div>
                </div>
                <div>
                    <div>
                        <p>플랫폼</p>
                    </div>
                    <div>
                        <input type="text" />
                    </div>
                </div>
                <div>
                    <div>
                        <p>작품 소개</p>
                    </div>
                    <div>
                        <textarea rows="20" cols="80" />
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Register;