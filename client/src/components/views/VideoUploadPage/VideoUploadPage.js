import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';
const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
	{ value: 0, label: "Private" },
	{ value: 1, label: "Public"}
]
const CategoryOptions = [
	{ value: 0, label: "Film & Animation"},
	{ value: 1, label: "Autos & Vehicles"},
	{ value: 2, label: "Music"},
	{ value: 3, label: "Pets & Animals"},
]



//functional component
function VideoUploadPage() {
	const user = useSelector(state => state.user)
	const [VideoTitle, setVideoTitle] = useState("")
	const [Description, setDescription] = useState("")

	// 네모 화살표 내려서 선택하는 창 만들기 (0번째 것을 default로 지정해준다.)
	const [Private, setPrivate] = useState(0)

	// 카테고리는 처음 미리 선택돼있는게 Film & Animation이기 때문에 그렇게 설정해준다.
	const [Category, setCategory] = useState("Film & Animation")
	const [FilePath, setFilePath] = useState("")
	const [Duration, setDuration] = useState("")
	const [ThumbnailPath, setThumbnailPath] = useState("")

	const onTitleChange = (e) => {
		setVideoTitle(e.currentTarget.value)
	}
	const onDescriptionChange = (e) => {
		setDescription(e.currentTarget.value)
	}
	const onPrivateChange = (e) => {
		setPrivate(e.currentTarget.value)
	}
	const onCategoryChange = (e) => {
		setCategory(e.currentTarget.value)
	}
	const onDrop = (files) => {
		let formData = new FormData;
		const config = {
			header: {'content-type': 'multipart/form-data'}
		}
		formData.append("file", files[0])
		//console.log(files)
		Axios.post('/api/video/uploadfiles', formData, config)
			.then(response => {
				if(response.data.success) {
					console.log(response.data)
					
					let variable = {
						url: response.data.url, //서버에서 response.data.url을 받았다고 한다.
						fileName: response.data.fileName
					}

					setFilePath(response.data.url)

					Axios.post('/api/video/thumbnail', variable)
					.then(response => {
						if(response.data.success) {
							setDuration(response.data.fileDuration)
							setThumbnailPath(response.data.url) //video.js의 'end'에서 url로 해줬기 때문에 여기에서도 response.data.url로 해준다.
						} else {
							alert('썸네일 생성에 실패 했습니다.')
						}
					})

				} else{
					alert('비디오 업로드를 실패했습니다.')
				}
			})
	}

	const onSumit = (e) => {
		e.preventDefault();

		// Video에서 정보들을 가져와서 submit 버튼을 누를 때 보내준다.
		const variables = {
			writer: user.userData._id, //여기는 리덕스에서 가져오기
			title: VideoTitle, //나머지는 다 state에서 가져온다.
			description: Description,
			privacy: Private,
			filePath: FilePath,
			category: Category,
			duration: Duration,
			thumbnail: ThumbnailPath
		}

		Axios.post('/api/video/uploadVideo', variables)
			.then(response => {
				if(response.data.success) {

				} else {
					alert('비디오 업로드에 실패했습니다.')
				}
			})
	}

	return (
		<div style={{ maxWidth:'700px', margin:'2rem auto' }}>
			<div style = {{ textAlign:'center', marginBottom:'2rem' }}>
				<Title level={2}>Upload Video</Title>
			</div>

			<Form onSubmit={onSumit}>
				<div style={{ display:'flex', justifyContent:'space-between' }}>

					{/* Drop zone */}
					<Dropzone 
						onDrop={onDrop}
						multiple={false}
						maxSize={1000000000}
					>
					{({ getRootProps, getInputProps }) => (
						<div style={{ width: '300px', height: '240px', border:'1px solid lightgray', display:'flex',
						alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
							<input {...getInputProps()} />
							<Icon type="plus" style={{ fontSize:'3rem'}} />
						</div>	
					)}
					</Dropzone>
					{/* Thumbnail */}
					{/*이 말은 ThumbnailPath가 있을 때에만 렌더링 되라는 뜻이다.*/}
					{ThumbnailPath && 
						<div>
							<img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
						</div>
					}
				</div>
			<br />
			<br />
			<label>Title</label>
			<Input
				onChange={onTitleChange}
				value={VideoTitle}
			/>
			<br />
			<br />
			<label>Description</label>
			<TextArea
				onChange={onDescriptionChange}
				value={Description}
			/>
			<br />
			<br />

			<select onChange={onPrivateChange}>			
				{PrivateOptions.map((item, index) => (
					<option key={index} Dvalue = {item.value}>{item.label}</option>
				))}
			</select>
			<br />
			<br />
			<select onChange={onCategoryChange}>
				{CategoryOptions.map((item, index) => (
					<option key={index} value = {item.value}>{item.label}</option>
				))}
			</select>
			<br />
			<br />
			<Button type="primary" size="large" onClick={onSumit}>
				Submit
			</Button>
			</Form>
		</div>
	)
}

//functional component를 만든 후에 이 component를 다른 파일에서도 이용할 수 있게 export 해주는 것.
export default VideoUploadPage;