import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
	{ value: 0, label: "Private" },
	{ value: 1, label: "Public"}
]

//functional component
function VideoUploadPage() {

	const [VideoTitle, setVideoTitle] = useState("")
	const [Description, setDescription] = useState("")

	// 네모 화살표 내려서 선택하는 창 만들기 (0번째 것을 default로 지정해준다.)
	const [Private, setPrivate] = useState(0)

	// 카테고리는 처음 미리 선택돼있는게 Film & Animation이기 때문에 그렇게 설정해준다.
	const [Category, setCategory] = useState("Film & Animation")

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
				value={VideoTitle}
			/>
			<br />
			<br />
			<label>Description</label>
			<TextArea
				onChange
				value={Description}
			/>
			<br />
			<br />

			<select onChange>
				
				{PrivateOptions.map((item, index) => (
					<option key={index} value = {item.value}>{item.label}</option>
				))}

				<option key value></option>
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