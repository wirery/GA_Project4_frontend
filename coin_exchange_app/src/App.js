import { Component } from 'react'
import NewForm from './components/new_form'
import Coin from './components/coins'
import GoogleLogin from 'react-google-login'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  // "https://fathomless-sierra-68956.herokuapp.com" in this case is the *API* url
  baseURL = 'https://coin-exchange-backend.herokuapp.com/';
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coins:[],
      country: [],
      img: [],
      year: [],
      quantity: [],
      grade: [],
      value: [],
      coinUpdate: {},
      form: false

    }    
    // responseGoogle=(response) =>{
    //   console.log(response)
    //   console.log(response.profileObj)
    // }
    this.handleAddCoin = this.handleAddCoin.bind(this)
    this.updateCoin = this.updateCoin.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this.deleteCoin = this.deleteCoin.bind(this)

  }
  componentDidMount() {
    this.getCoins()

  }
  toggleForm(coin) {
    this.setState({
      form: true,
      coinUpdate: coin
    })
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value })
  }
  getCoins() {
    fetch(baseURL + '/coins')
      .then(data => {
        return data.json()
      },
        err => console.log(err))
      .then(parsedData => this.setState({coins:parsedData}),
        err => console.log(err))
  }

  handleAddCoin(coin) {
    const copyCoins = [...this.state.coins]
    copyCoins.unshift(coin)
    this.setState({
      coins: copyCoins,
      country: '',
      img: '',
      year: '',
      quantity: '',
      grade: '',
      value: '',
    })
  }
  updateCoin(coin) {
    coin.preventDefault()
    fetch(`${baseURL}/coins/${coin._id}`, {
      method: 'PUT',
      body: JSON.stringify({
      country: coin.country,
      img: coin.img,
      year: coin.year,
      quantity: coin.quantity,
      grade: coin.grade,
      value: coin.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(resJson => {
        const copyCoins = [...this.state.coins]
        const findIndex = this.state.coins.findIndex(coin => coin._id === resJson._id)
        copyCoins[findIndex].title = resJson.title
        copyCoins[findIndex].url = resJson.url
        this.setState({ coins: copyCoins })
      })
    this.setState({
      form: false
    })

  }

  deleteCoin(id) {
    fetch(`${baseURL}/coins/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.status === 200) {
          const findIndex = this.state.coins.findIndex(coin => coin._id === id)
          const copyCoins = [...this.state.coins]
          copyCoins.splice(findIndex, 1)
          this.setState({
            coins: copyCoins
          })
        }
      })
  }




  render() {
    return (
      <div className="container">
        <GoogleLogin 
        clientId='84135572591-85ia0vnbnu1pdunsj26leguear05qor0.apps.googleusercontent.com'
        buttonText = "Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
        <h1>Coins</h1>
        {
          this.state.form
            ?
            <Coin updateCoin={this.updateCoin} coinUpdate={this.state.coinUpdate} />
            : 
            <NewForm className="new-form" handleAddCoin={this.handleAddCoin} />
        } 
        <div>
          <div>
            < table >
              <tbody>
                {this.state.coins.map(coin => {
                  return (
                    <tr key={coin._id} >
                      <td><a href={coin.country}>{coin.img} {coin.year} {coin.quantity} {coin.grade} {coin.value}</a></td>
                      <td><button onClick={() => this.toggleForm(coin)}>update</button></td>
                      <td ><button onClick={() => this.deleteCoin(coin._id)}>delete</button></td>       
                       </tr>
                  )
                })
                }
              </tbody> 
            </table >
          </div>
        </div>
      </div>
    )
  }
}

export default App;
