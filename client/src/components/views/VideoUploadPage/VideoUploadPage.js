import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
<<<<<<< HEAD
//import Axios from 'axios';
=======
>>>>>>> parent of 965cb3b... 클라이언트 안되는 문제 생김
const { TextArea } = Input;
const { Title } = Typography;

//functional component
function VideoUploadPage() {
<<<<<<< HEAD

=======
	
	const [VideoTitle, setVideoTitle] = useState("")
	const [Description, setDescription] = useState("")
	const [Private, setPrivate] = useState(0)
	const [Category, setCategory] = useState("Film & Animation")

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
>>>>>>> parent of 965cb3b... 클라이언트 안되는 문제 생김
	return (
		<div style={{ maxWidth:'700px', margin:'2rem auto' }}>
			<div style = {{ textAlign:'center', marginBottom:'2rem' }}>
				<Title level={2}>Upload Video</Title>
			</div>

			<Form onSubmit>
				<div style={{ display:'flex', justifyContent:'space-between' }}>

					{/* Drop zone */}
					<Dropzone 
					onDrop
					multiple
					maxSize
					>
					{({ getRootProps, getInputProps }) => (
						<div style={{ width: '300px', height: '240px', border:'1px solid lightgray', display:'flex',
						alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
							<input {...getInputProps()} />
							<Icon type="plus" style={{ fontSize:'3rem'}} />
						</div>	
					)}
					</Dropzone>

					{}
					<div>
						<img src alt />
					</div>
				</div>
			<br />
			<br />
			<label>Title</label>
			<Input
				onChange
				value
			/>
			<br />
			<br />
			<label>Description</label>
			<TextArea
				onChange
				value
			/>
			<br />
			<br />

			<select onChange>
				<option key value></option>
			</select>

			<br />
			<br />
			<select onChange>
				<option key value></option>
			</select>
			<br />
			<br />
			<Button type="primary" size="large" onClick>
				Submit
			</Button>
			</Form>
		</div>
	)
}

//functional component를 만든 후에 이 component를 다른 파일에서도 이용할 수 있게 export 해주는 것.
export default VideoUploadPage;