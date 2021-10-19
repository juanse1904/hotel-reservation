
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
function DateFilter(props){
    let dateValue=props.date.toLocaleDateString().split("/").join("/")
    console.log("date input value", dateValue)
    return(
        <div className="field">
        <div className="control has-icons-left">
          <input className="input" type="date" value={`${dateValue}`} />
          <span className="icon is-small is-left">
            <i className={`fas ${props.icon}`}></i>
          </span>
        </div>
      </div>  
    )
}
function OptionsFilter(props){
    return(
        <div className="field">
        <div className="control has-icons-left">
          <div className="select" style={ {width: '100%'} }>
            <select style={ {width: '100%'} }>
              {props.options.map((item)=>
              <option value={item.name}>{item.name}</option>
              )}
            </select>
          </div>
          <div className="icon is-small is-left">
            <i className={`fas ${props.icon}`}></i>
          </div>
        </div>
      </div> 
    )
}
function Filters(props){
    return(
        <nav className="navbar is-info" style={ {justifyContent: 'center'} }>
  <div className="navbar-item">
    <DateFilter
      date={ props.filters.dateFrom}
      icon="fa-sign-in-alt" />
  </div>
  <div className="navbar-item">
    <DateFilter
      date={ props.filters.dateTo }
      icon="fa-sign-out-alt" />
  </div>
  <div className="navbar-item">
    <OptionsFilter
      options={ [ {value: undefined, name: 'Todos los países'}, {value: 'Argentina', name: 'Argentina'}, {value: 'Brasil', name: 'Brasil'}, {value: 'Chile', name: 'Chile'}, {value: 'Uruguay', name: 'Uruguay'} ] }
      selected={ props.filters.country }
      icon="fa-globe" />
  </div>
  <div className="navbar-item">
    <OptionsFilter
      options={ [ {value: undefined, name: 'Cualquier precio'}, {value: 1, name: '$'}, {value: 2, name: '$$'}, {value: 3, name: '$$$'}, {value: 4, name: '$$$$'} ] }
      selected={ props.filters.price }
      icon="fa-dollar-sign" />
  </div>
  <div className="navbar-item">
    <OptionsFilter
      options={ [ {value: undefined, name: 'Cualquier tamaño'}, {value: 10, name: 'Hotel pequeño'}, {value: 20, name: 'Hotel mediano'}, {value: 30, name: 'Hotel grande'} ] }
      selected={ props.filters.rooms }
      icon="fa-bed" />
  </div>
</nav>
    )
}

function App() {
    const filters = {
        dateFrom: today, // Proviene del archivo data.js
        dateTo: new Date(today.valueOf() + 86400000),
        country: '',
        price: 0,
        rooms: 0
      }
    return (
        <div>
            <Hero filters={filters} />
            <Filters filters={filters} />
        </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('app'))