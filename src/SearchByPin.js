import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import React, { Component } from 'react';



class SearchByPin extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          value: '',

        getCurrentDate: ()=>{

            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            
            return `${date}-${month<10?`0${month}`:`${month}`}-${year}` 
            },

        pin: ()=>{
            if(this.state.value){
                return this.state.value
            }
            else{
                return '500021'
            }
        },

        dfetch: ()=>{

            fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${this.state.pin()}&date=${this.state.getCurrentDate()}`) 
            .then(pin => pin.json())
            .then(pind =>{
                this.setState({
                    isLoaded: true,
                    items: pind.sessions
                })
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
                })
            })
    
          }

          }

        
        this.handleChange = this.handleChange.bind(this);
        this.searchPin = this.searchPin.bind(this);
      }

     


    componentDidMount(){

        this.state.dfetch()

        // if(this.state.value!==null){
        // this.setState({Dfetch: ()=>

                

                // fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${this.state.pin()}&date=${this.state.getCurrentDate()}`) 
                // .then(pin => pin.json())
                // .then(pind =>{
                //     this.setState({
                //         isLoaded: true,
                //         items: pind.sessions
                //     })
                // },
                // (error) => {
                //     this.setState({
                //     isLoaded: true,
                //     error
                //     })
                // })
        
            // })
    }

    handleChange(event) {
        
        this.setState({value: event.target.value})
        console.log(this.state.value)
      }

      
      searchPin(){

        console.log("Ostundi") 
        

        this.state.dfetch();
        /*fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${this.state.pin()}&date=${this.state.getCurrentDate()}`) 
                .then(pin => pin.json())
                .then(pind =>{
                    this.setState({
                        isLoaded: true,
                        items: pind.sessions
                    })
                },
                (error) => {
                    this.setState({
                    isLoaded: true,
                    error
                    })
                })*/

        
      }

    
      
   
    


    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
                return (
                    <div>
                    <TextField id="filled-search" label="Enter Pincode" type="search" variant="outlined" value={this.state.value} onChange={this.handleChange} />
                    <div style={{marginTop:'15px'}}>
                    <Button style={{marginBottom:'20px'}} variant="contained" color="primary" onClick={this.searchPin}>Search</Button>
                    </div>
                    
                        <div>
                            {items.map(item=>(
                                <div style={{marginBottom:'20px'}}>
                                    <div>Center Name: {item.name}</div>
                                    <div>Address: {item.address}</div>
                                    <div>{item.vaccine}: {item.fee}</div>
                                </div>
                            ))}
                        </div>
                     
                </div>
                )
                }
    }
    // updateInputValue(evt) {
    //     this.setState({
    //       value: evt.target.value
    //     });
        
    //   }

      
}

export default SearchByPin;




















// function SearchByPin(){

//     componentDidMount(){
//         fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=500062&date=21-07-2021")
//     }

// return (
//     <div>
//         <TextField id="filled-search" label="Enter Pincode" type="search" variant="outlined" />
//         <div style={{marginTop:'15px'}}>
//         <Button variant="contained" color="primary">Search</Button>
//         </div>
//     </div>
// )

// }




