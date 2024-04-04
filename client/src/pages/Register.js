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

    async function handleSubmit () {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('writer', writer);
            formData.append('platform', platform);
        }
        catch(error) {
            console.error('Error during POST request', error);
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
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <p>플랫폼</p>
                    </div>
                    <div>
                        <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <p>작품 소개</p>
                    </div>
                    <div>
                        <textarea rows="20" cols="80" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div>
                    <button type="submit">작품 등록</button>
                    <button>취소하기</button>
                </div>
            </div> 
        </div>
    )
}

export default Register;