import { Component } from 'react';

const baseURL = 'http://localhost:3003';


class Coin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            country: '',
            img: '',
            year: 0,
            quantity: 0,
            grade: 0,
            value: 0,

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
            img: this.props.coinUpdate.img,
            year: this.props.coinUpdate.year,
            quantity: this.props.coinUpdate.quantity,
            grade: this.props.coinUpdate.grade,
            value: this.props.coinUpdate.value
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
                country: this.state.country, img: this.state.img, year: this.state.year, quantity: this.state.quantity, grade: this.state.grade, value: this.state.value
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
                    img: '',
                    year:'',
                    quantity:'',
                    grade:'',
                    value:'',
                })
            })
            .catch(error => console.log({ 'Error': error }))
    };



    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="country"></label>
            <input type="text" id="country" name="country" onChange={this.handleChange} value={this.state.country} placeholder = "title" required />

            <label htmlFor="img"></label>
            <input type="text" id="img" name="img" onChange={this.handleChange} value={this.state.img} placeholder="IMG" required />

            <label htmlFor="year"></label>
            <input type="text" id="year" name="year" onChange={this.handleChange} value={this.state.year} placeholder="YEAR" required />

            <label htmlFor="quantity"></label>
            <input type="text" id="quantity" name="quantity" onChange={this.handleChange} value={this.state.quantity} placeholder="QUANTITY" required />

            <label htmlFor="grade"></label>
            <input type="text" id="grade" name="grade" onChange={this.handleChange} value={this.state.grade} placeholder="GRADE" required />

            <label htmlFor="value"></label>
            <input type="text" id="value" name="value" onChange={this.handleChange} value={this.state.value} placeholder="VALUE" required />
                <input type="submit" value="Edit" />

            </form>
            </div>
        )
    }
};

export default Coin;
