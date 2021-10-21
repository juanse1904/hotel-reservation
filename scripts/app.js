
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
              <select name={this.props.name} onClick={this.handleOptionChange} style={ {width: '100%'} }>
                {this.props.options.map((item,index)=>
                <option  key={index} value={item.value}>{item.name}</option>
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
      icon="fa-dollar-sign" />
  </div>
  <div className="navbar-item">
    <OptionsFilter
      options={ [ {value: undefined, name: 'Cualquier tamaño'}, {value: 10, name: 'Hotel pequeño'}, {value: 20, name: 'Hotel mediano'}, {value: 30, name: 'Hotel grande'} ] }
      selected={ this.props.filters.rooms }
      name="country"
      onOptionChange={this.handleOptionChange}
      icon="fa-bed" />
  </div>
</nav>
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
            }
        }
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    handleFilterChange(payload) {
      this.setState({
        filters: payload
      })
    }
    render(){
        return (
            <div>
                <Hero filters={this.state.filters} />
                <Filters filters={this.state.filters} onFilterChange={this.handleFilterChange} />
            </div>
        )
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('app'))