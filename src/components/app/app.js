import React from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage/characterPage';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import gotService from '../../services/gotService';



export default class App extends React.Component {

    gotService = new gotService();
    
    state={
        hide:false,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onHide = ()=>{
        this.setState({
            hide:!this.state.hide
        })
    }

    


    render (){
        const whatToShow = this.state.hide? null: <RandomChar/>

        if (this.state.error){
            return <ErrorMessage/>
        }

        return(
        <> 
            <Container>
                <Header />
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                    {whatToShow}
                        <Button color='success' onClick={() => this.onHide()}>Toggle</Button>
                    </Col>
                </Row>
                <CharacterPage/>
                <Row>
                    <Col md='6'>
                        <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData={this.gotService.getAllBooks}
                        renderItem={(item)=> item.name}
                        />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar}/>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData={this.gotService.getAllHouses}
                        renderItem={(item)=> item.name}
                        />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar}/>
                    </Col>
                </Row>
            </Container>
        </>
        )    
};
}

