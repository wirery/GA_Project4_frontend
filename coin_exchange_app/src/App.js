import { Component } from 'react'
import NewForm from './components/new_form'
import Coin from './components/coins'
const baseURL = 'http://localhost:3003';


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
    this.handleAddCoin = this.handleAddCoin.bind(this)
    this.updateCoin = this.updateCoin.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    // this.deleteCoin = this.deleteCoin.bind(this)

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

  deleteCoins(id) {
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
        <h1>Coins</h1>
        {
          this.state.form
            ?
            <Coin updateCoin={this.updateCoin} coinUpdate={this.state.coinUpdate} />
            : 
            <NewForm className="new-form" handleAddBookmark={this.handleAddCoin} />
        } 
        <div>
          <div>
            < table >
              <tbody>
                {this.state.coins.map(coin => {
                  return (
                    <tr key={coin._id} >
                      <td><a href={coin.country}>{coin.img}</a></td>
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
