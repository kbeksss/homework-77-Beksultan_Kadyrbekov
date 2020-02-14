import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {fetchAllThreads, postNewThread} from "../../store/actions/boardsActions";
import {
    Button,
    Card,
    CardText,
    CardTitle, Col,
    Container,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row,
} from "reactstrap";
import NewThreadForm from "../../components/NewTheadForm/NewThreadForm";
import ImageThumbnail from "../../components/imageThumbnail/imageThumbnail";

const Home = props => {
    const [modal, setModal] = useState(false);
    useEffect(() => {
        console.log(props.allThreads);
        props.fetchAllThreads();
    }, []);
    const submitThread = async (thread) => {
        try{
            await props.postNewThread(thread);
            props.fetchAllThreads();
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Container className='mt-5'>
            <Button color='primary mb-3' onClick={() => setModal(true)}>Add New Thread</Button>

            {props.allThreads.map(thread => (
                <Card className='mb-2' key={thread.id} body>
                    <Row>
                        <Col>
                            <ImageThumbnail image={thread.image}/>
                        </Col>
                        <Col>
                            <CardTitle>Title: {thread.title}</CardTitle>
                            <CardTitle>Author: {thread.author}</CardTitle>
                        </Col>
                    </Row>
                    <CardText>Text: {thread.description}</CardText>
                </Card>
            ))}
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Modal title</ModalHeader>
                <ModalBody>
                    <NewThreadForm onSubmit={submitThread} toggle={() => setModal(false)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setModal(!modal)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

const mapStateToProps = state => ({
    allThreads: state.allThreads,
});
const mapDispatchToProps = dispatch => ({
    fetchAllThreads: () => dispatch(fetchAllThreads()),
    postNewThread: thread => dispatch(postNewThread(thread))
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
