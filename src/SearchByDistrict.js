import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Button } from '@material-ui/core';
import React, { Component } from 'react'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom/cjs/react-dom.development';

class SearchByDistrict extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            isLoaded: false,
            disIsLoaded: false,
            items: [],
            distr: [],
            sValue: '',
            dValue: '',
            statefetch: ()=>{

                fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`) 
                .then(pin => pin.json())
                .then(pind =>{
                    this.setState({
                        isLoaded: true,
                        items: pind.states
                    })
                })
              },

              distfetch: (stateid)=>{
                  console.log("state ID" + stateid)
                  fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`)
                  .then(dis => dis.json())
                  .then(district =>{
                      this.setState({
                          disIsLoaded: true,
                          distr: district.districts
                      })
                  },
                  (error) => {
                    this.setState({
                    disIsLoaded: true,
                    error
                    })
                })

              },

            //   districtHandleChange(event){
            //     // console.log("dist change")
            //     const distID = event.target.value
            //     console.log('DID' + distID)
            //     return distID
            //     // this.setState({
            //     //     dValue: event.target.value})
            //     // console.log("dist ID" + this.state.dValue)
        
            // }





             
        }

        this.stateHandleChange = this.stateHandleChange.bind(this)
        this.searchDist = this.searchDist.bind(this)
        this.districtHandleChange = this.districtHandleChange.bind(this)

    }
    
    componentDidMount() {
        this.state.statefetch()
        
    }

    searchDist(){

        
        console.log("dvalue" + this.state.dValue)
    }

    stateHandleChange(event) {

        // this.setState({distr: []})        
        let current_state= event.target.value
        console.log("stateid"+current_state)
        this.state.distfetch(current_state)
        
        // console.log("state handle"+current_state)
    }
    
    async districtHandleChange(event){
        // console.log("dist change")
        const distID = event.target.value
        console.log('DID' + distID)
        await this.setState((state, props) => ({
            dValue: distID}))
        console.log("dist ID" + this.state.dValue)

    }
    
    
    
    render() {

        const { error, isLoaded, items, distr } = this.state;
        
        return (
            <div>
                        
                <FormControl variant="outlined" style={{minWidth: 240}}>
                <InputLabel htmlFor="outlined-age-native-simple">Select State</InputLabel>
                    
                <Select
                    native
                    // value={state.age}
                    onChange={this.stateHandleChange}
                    label="Select State"
                    // inputProps={{
                    //     name: "age",
                    //     id: "outlined-age-native-simple"
                    // }}
                    >
                    <option aria-label="None" value={this.state.sValue}/>

                    {items.map(item=>(
                                <option value={item.state_id}>{item.state_name}</option>
                            ))}

                    
                    
                    </Select>
                    
                </FormControl>
                <FormControl variant="outlined" style={{minWidth: 240}}>
                <InputLabel htmlFor="outlined-age-native-simple">Select District</InputLabel>
                
                <Select
                  native
                //   value={state.age}
                  onChange={this.districtHandleChange}
                  label="Select District"
                //   inputProps={{
                //     name: "age",
                //     id: "outlined-age-native-simple"
                //   }}
                >
                    <option aria-label="None" value={this.state.dValue}  />

                    {distr.map(item=>(
                                <option value={item.district_id}>{item.district_name}</option>
                            ))}
                    
                    
                    
                    {/* <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option> */}
                </Select>
                
                </FormControl>
                <div style={{marginTop:'15px'}}>
                <Button variant="contained" color="primary" onClick={this.searchDist}>Search</Button>
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

export default SearchByDistrict
