import { Component } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  // "https://fathomless-sierra-68956.herokuapp.com" in this case is the *API* url
  baseURL = 'https://coin-exchange-backend.herokuapp.com';
}
class NewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: '',
            img: '',
            year: '',
            quantity: '',
            grade: '',
            value: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
  
      handleChange (event) {
          this.setState({ [event.currentTarget.id]: event.currentTarget.value})
        }
  
        handleSubmit(event) {
          event.preventDefault()
          fetch(baseURL + '/coins', {
              method: 'POST',
              body: JSON.stringify({ country: this.state.country, img: this.state.img, year: this.state.year, quantity: this.state.quantity, grade: this.state.grade, value: this.state.value   }),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then (res => res.json())
            .then (resJson => {
              this.props.handleAddCoin(resJson)
              this.setState({
                country: '',
                img: '',
                year: '',
                quantity: '',
                grade: '',
                value: '',                
              })
          }).catch (error => console.error({'Error': error}))
        }
        
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

            <input type="submit" value="Add" />
        </form>
        </div>
    )
      }
    }
  





    




export default NewForm
