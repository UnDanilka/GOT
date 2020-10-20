import React from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../pages/characterPage/characterPage';
import BooksPage from '../pages/booksPage/booksPage';
import HousesPage from '../pages/housesPage/housesPage';
// import ItemList from '../itemList/itemList';
// import CharDetails from '../itemDetails/itemDetails';
import gotService from '../../services/gotService';



export default class App extends React.Component {

    gotService = new gotService();
    
    state={
        hide:false,
        error: false,
        selectedHouse: 20
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
                <BooksPage/>
                <HousesPage/>
            </Container>
        </>
        )    
};
}

