import React, {useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
const INITIAL_FORM = {
    author: '',
    title: '',
    description: '',
    image: ''
};
const NewThreadForm = (props) => {
    const [inputForm, setFormData] = useState(INITIAL_FORM);
    const onChangeInput = e => {
        setFormData({...inputForm, [e.target.name]: e.target.value})
    };
    const onFileChange = e => {
        setFormData({...inputForm, [e.target.name]: e.target.files[0]})
    };
    const submitForm = async e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(inputForm).forEach(key => {
            if(inputForm[key]){
                formData.append(key, inputForm[key]);
            }
        });
        try {
            await props.onSubmit(formData);
            setFormData(INITIAL_FORM);
            props.toggle();
        } catch(e){
            console.error(e);
        }
    };
    return (
        <Form onSubmit={submitForm}>
            <FormGroup row>
                <Label sm={2} for="author">Author</Label>
                <Col sm={10}>
                    <Input
                        type="text"
                        name="author" id="author"
                        value={inputForm.author}
                        onChange={onChangeInput}
                        placeholder="Enter your name if you wish"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2} for="description">Description</Label>
                <Col sm={10}>
                    <Input
                        value={inputForm.description}
                        type="textarea"
                        required
                        onChange={onChangeInput}
                        name="description" id="description"
                        placeholder="Enter the description of the thread"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2} for="image">Image</Label>
                <Col sm={10}>
                    <Input
                        type="file"
                        name="image" id="image"
                        onChange={onFileChange}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={{offset:2, size: 10}}>
                    <Button type="submit" color="primary">Save</Button>
                </Col>
            </FormGroup>
        </Form>
    );
};

export default NewThreadForm;
