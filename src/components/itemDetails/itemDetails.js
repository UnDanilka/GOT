import React, {Component} from 'react';
import './charDetails.css';
// import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner'
import ErrorMessage from '../errorMessage/errorMessage';

const Field = ({item, field, label})=>{
    return(
        <li className="list-group-item d-flex justify-content-between">
                        <span className="term">{label}</span>
                        <span>{item[field]}</span>
                    </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    

        state={
            item:null, 
            loading: true,
            error: false
        }
    componentDidMount(){
        this.updateItem();
    }    

    onError = (err)=>{
        this.setState({
            error:true
        })
    }

    updateItem(){
        const {itemId, getData} = this.props;
        if (!itemId){
            return;
        }
        getData(itemId)
        .then((item) =>{
            this.setState({
                item,
                loading: false
            })
        })
        .catch(this.onError)
        
    }    

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    render() {

        if(this.state.error){
            return <ErrorMessage/>
        }

        if (this.state.loading){
            return <Spinner/>
        }

        if(!this.state.item){
            return <span className='select-error'>Please select item in the list</span>
        }
        const {item} = this.state;
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child)=>{
                           return React.cloneElement(child,{item})
                        })
                    }
                </ul>
            </div>
        );
    }
}