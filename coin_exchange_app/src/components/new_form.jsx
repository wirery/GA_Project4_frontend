import { Component } from 'react'

const baseURL = 'http://localhost:3003'

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
              body: JSON.stringify({ country: this.state.country, img: this.state.img }),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then (res => res.json())
            .then (resJson => {
              this.props.handleAddBookmark(resJson)
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
            <input type="submit" value="Add" />
        </form>
        </div>
    )
      }
    }
  





    




export default NewForm
