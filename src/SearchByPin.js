import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import './table.css';



class SearchByPin extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          value: '',
          count: 0,

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

    async handleChange(event) {
        
        await this.setState({value: event.target.value})
        console.log(this.state.value)
      }

      
      searchPin(){

        console.log("Ostundi") 
        this.setState({count: 1})
        

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
          }else{
              console.log(this.state.value)
                return (
                    <div>
                        <TextField id="filled-search" label="Enter Pincode" type="search" variant="outlined" value={this.state.value} onChange={this.handleChange} />
                        <div style={{marginTop:'15px'}}>
                        <Button style={{marginBottom:'20px'}} variant="contained" color="primary" onClick={this.searchPin}>Search</Button>
                        </div>
                        <div>{(items===undefined) ? <div>Enter valid pin</div> : 
                        ((items.length===0 && this.state.value === '' ) ? <div>  </div> : 
                        (items.length===0 && this.state.count===1 ) ? <div> No Vaccination slots available please come back later </div> : 
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>
                                        Center Name
                                    </th>
                                    <th>
                                        Address
                                    </th>
                                    <th>
                                        From - To
                                    </th>
                                    <th>
                                        FeeType | Fee | Min Age
                                    </th>
                                    <th>
                                        Available | Dose1 | Dose2
                                    </th>
                                    <th>
                                        Vaccine
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(item=>(
                                        <tr>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                {item.address}
                                            </td>
                                            <td>
                                                {item.from} - {item.to}
                                            </td>
                                            <td>
                                                {item.fee_type} | {item.fee} | {item.min_age_limit}+
                                            </td>
                                            <td>
                                                {item.available_capacity} | {item.available_capacity_dose1} | {item.available_capacity_dose2}
                                            </td>
                                            <td>
                                                {item.vaccine}
                                            </td>

                                        </tr>
                                    ))
                                    
                                }
                            </tbody>
                        </table>
                        
                        
                        ) }</div>
                    </div>
                )
                }


                // else{
                //     console.log("defined " + items.isLoaded)
                //     return(
                //         <div>
                //             <div>
                //             <TextField id="filled-search" label="Enter Pincode" type="search" variant="outlined" value={this.state.value} onChange={this.handleChange} />
                //             <div style={{marginTop:'15px'}}>
                //             <Button style={{marginBottom:'20px'}} variant="contained" color="primary" onClick={this.searchPin}>Search</Button>
                //             </div>
                //             </div>
                            
                            

                //             <div>
                //             {items.map(item=>(
                //             <div style={{marginBottom:'20px'}}>
                //                 <div>Center Name: {item.name}</div>
                //                 <div>Address: {item.address}</div>
                //                 <div>{item.vaccine}: {item.fee}</div>
                //             </div>
                //             ))} 
                //             </div>

                //         </div>

                        
                            

                //     )
                // }
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




