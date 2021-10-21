function Hotel(props){
  let {name, photo, description, rooms, city, country, price}= props.hotelData
  return(
    <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src={photo} alt="Sainte Jeanne Boutique & Spa" />
    </figure>
  </div>
  <div className="card-content">
    <p className="title is-4">{name}</p>
    <p>{description}</p>
    <div className="field is-grouped is-grouped-multiline" style={{marginTop: '1em'}}>
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-medium is-info"><i className="fas fa-map-marker"></i></span>
          <span className="tag is-medium">{`${city}, ${country}`}</span>
        </div>
      </div>
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-medium is-info"><i className="fas fa-bed"></i></span>
          <span className="tag is-medium">{`${rooms} Habitaciones`}</span>
        </div>
      </div>
      <div className="control">
        <div className="tags">
          <span className="tag is-medium is-info">
            {price>=1?<i className="fas fa-dollar-sign" style={{margin: '0 .125em'}}></i>:<i className="fas fa-dollar-sign" style={{margin: '0 .125em', opacity: '.25'}}></i>}
            {price>=2?<i className="fas fa-dollar-sign" style={{margin: '0 .125em'}}></i>:<i className="fas fa-dollar-sign" style={{margin: '0 .125em', opacity: '.25'}}></i>}
            {price>=3?<i className="fas fa-dollar-sign" style={{margin: '0 .125em'}}></i>:<i className="fas fa-dollar-sign" style={{margin: '0 .125em', opacity: '.25'}}></i>}
            {price>=4?<i className="fas fa-dollar-sign" style={{margin: '0 .125em'}}></i>:<i className="fas fa-dollar-sign" style={{margin: '0 .125em', opacity: '.25'}}></i>}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div className="card-footer">
    <a href="javascript:alert('No implementamos esto aún :(')" className="card-footer-item has-background-primary has-text-white has-text-weight-bold">Reservar</a>
  </div>
</div>
  )
}
function Hero(props){
    let date1=props.filters.dateFrom;
    let date2=props.filters.dateTo;
    console.log(date1,date2)
    return(
        <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Hoteles</h1>
            <h2 className="subtitle">
              desde el <strong>{date1.toLocaleDateString('es-CO',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong> hasta el <strong>{date2.toLocaleDateString('es-CO',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </h2>
          </div>
        </div>
      </section>
    )
}
class DateFilter extends React.Component {

    constructor(props) {
        super(props)
        this.handleDateChange = this.handleDateChange.bind(this)
      }
    
      handleDateChange(event) {
        this.props.onDateChange(event)
      }
    
    render(){
        return(
            <div className="field">
            <div className="control has-icons-left">
            <input className="input" type="date" onChange={ this.handleDateChange } placeholder={ (this.props.date).toLocaleDateString() } name={ this.props.name } />
              <span className="icon is-small is-left">
                <i className={`fas ${this.props.icon}`}></i>
              </span>
            </div>
          </div>  
        )

    }
}
class OptionsFilter extends React.Component{
  constructor(props) {
    super(props)
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  handleOptionChange(event) {
    this.props.onOptionChange(event)
  }
  render(){
    return(
          <div className="field">
          <div className="control has-icons-left">
            <div className="select" style={ {width: '100%'} }>
              <select name={this.props.name} onChange={this.handleOptionChange} style={ {width: '100%'} }>
                {this.props.options.map((item,index)=>
                <option  key={index}  value={item.value}>{item.name}</option>
                )}
              </select>
            </div>
            <div className="icon is-small is-left">
              <i className={`fas ${this.props.icon}`}></i>
            </div>
          </div>
        </div> 
      )
  }
}
class Filters extends React.Component{

    constructor(props) {
    super(props)
    this.handleOptionChange=this.handleOptionChange.bind(this)
    this.handleDateChange=this.handleDateChange.bind(this)
      }

      handleOptionChange(event) {
        let payload = this.props.filters
        console.log("the option event", event)
        payload[event.target.name] = event.target.value
        this.props.onFilterChange(payload)
      }

      handleDateChange(event) {
        let payload = this.props.filters
        console.log("the date event", event)
        payload[event.target.name] = new Date((event.target.value).split("/").join("-"))
      
        this.props.onFilterChange(payload)
      }
render(){
    return(
        <nav className="navbar is-info" style={ {justifyContent: 'center'} }>
  <div className="navbar-item">
    <DateFilter
      date={ this.props.filters.dateFrom}
      icon="fa-sign-in-alt"
      name="dateFrom"
      onDateChange={this.handleDateChange}
      />
  </div>
  <div className="navbar-item">
    <DateFilter
      date={ this.props.filters.dateTo }
      icon="fa-sign-out-alt"
      name="dateTo"
      onDateChange={this.handleDateChange}
      
      />
  </div>
  <div className="navbar-item">
    <OptionsFilter
      options={ [ {value: undefined, name: 'Todos los países'}, {value: 'Argentina', name: 'Argentina'}, {value: 'Brasil', name: 'Brasil'}, {value: 'Chile', name: 'Chile'}, {value: 'Uruguay', name: 'Uruguay'} ] }
      selected={ this.props.filters.country }
      name="country"
      onOptionChange={this.handleOptionChange}
      icon="fa-globe" />
  </div>
  <div className="navbar-item">
    <OptionsFilter
      options={ [ {value: undefined, name: 'Cualquier precio'}, {value: 1, name: '$'}, {value: 2, name: '$$'}, {value: 3, name: '$$$'}, {value: 4, name: '$$$$'} ] }
      selected={ this.props.filters.price }
      onOptionChange={this.handleOptionChange}
      name="price"
      icon="fa-dollar-sign" />
  </div>
  <div className="navbar-item">
    <OptionsFilter
      options={ [ {value: undefined, name: 'Cualquier tamaño'}, {value: 10, name: 'Hotel pequeño'}, {value: 20, name: 'Hotel mediano'}, {value: 30, name: 'Hotel grande'} ] }
      selected={ this.props.filters.rooms }
      name="rooms"
      onOptionChange={this.handleOptionChange}
      icon="fa-bed" />
  </div>
</nav>
)
}
}

class Hotels extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      hotels:this.myHotels
    }
  }

render(){
  return(
    <section className="section" style={ {marginTop: '3em'} }>
  <div className="container">
    <div className="columns is-multiline">
      {this.props.hotels.length>0?
      (this.props.hotels).map(hotel=>(  
    <div className="column is-one-third">
      <Hotel hotelData={hotel}/>
    </div> 
      )):
      <article className="message is-warning">
  <div className="message-body">
    No se han encontrado hoteles que coincidan con los parámetros de búsqueda.
  </div>
</article>
      }
      
    </div>
  </div>
</section>
  )
}
}
class App extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            filters:{
            dateFrom: today, // Proviene del archivo data.js
            dateTo: new Date(today.valueOf() + 86400000),
            country: '',
            price: 0,
            rooms: 0
            },
          hotels:hotelsData
        }
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.myHotels = this.myHotels.bind(this)
    }
//THIS CODE WAS MADE BY SEBASTIAN GOMEZ MORE INFO: gomeztabaresjuansebastian@gmail.com
    handleFilterChange(payload) {
      this.setState({
        filters: payload
      })
      this.myHotels()
    }
    myHotels(){
      console.log("estoy en el filter de hoteles", this.state.filters)
      let filter=this.state.filters
      let allHotels=hotelsData
      let hotelByCountry=filter.country==='Todos los países' || !filter.country?allHotels:allHotels.filter(hotel=>hotel.country===filter.country)
      let hotelByPrice=filter.price==="Cualquier precio" || !filter.price?hotelByCountry:hotelByCountry.filter(hotel=>hotel.price<=(filter.price)*1)
      let hotelBySize=filter.rooms==="Cualquier tamaño" || !filter.rooms?hotelByPrice:hotelByPrice.filter(hotel=>hotel.rooms<=(filter.rooms)*1)

      console.log("nuevos hoteles", hotelBySize)
      this.setState({
        hotels: hotelBySize
      })
      
      console.log("cambie el de hoteles", this.state.filters)
    }
    render(){
        return (
            <div>
                <Hero filters={this.state.filters} />
                <Filters filters={this.state.filters} onFilterChange={this.handleFilterChange} />
                <Hotels hotels={this.state.hotels} filters={this.state.filters}/>
            </div>
        )
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('app'))




