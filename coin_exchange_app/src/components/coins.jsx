import { Component } from 'react';

const baseURL = 'http://localhost:3003';


class Coin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            country: '',
            img: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    componentDidMount() {
        this.setUpdateCoin();
    }
    setUpdateCoin() {
        this.setState({
            _id: this.props.coinUpdate._id,
            country: this.props.coinUpdate.country,
            img: this.props.coinUpdate.img
        })
    }


    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }
    handleSubmit(event) {
        fetch(baseURL + '/coins/' + this.props.coinUpdate._id, {
            method: 'PUT',
            body: JSON.stringify({
                country: this.state.country,
                img: this.state.img
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resJson => {
                this.props.setUpdateCoin
                (resJson)
                this.setState({
                    country: '',
                    img: ''
                })
            })
            .catch(error => console.log({ 'Error': error }))
    };



    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="country"></label>
                <input type="text" name="country" id='country' value={this.state.country} onChange={this.handleChange} placeholder={this.state.country} />
                <label htmlFor="img"></label>
                <input type="img" name="img" id='img' value={this.state.img} onChange={this.handleChange} placeholder={this.state.img} />
                <input type="submit" value="Edit" />

            </form>
            </div>
        )
    }
};

export default Coin;
