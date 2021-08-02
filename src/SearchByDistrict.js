import Select from '@material-ui/core/Select';
// import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
import { Button } from '@material-ui/core';
import React, { Component } from 'react'
// import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom/cjs/react-dom.development';
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import './table.css';



class SearchByDistrict extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            merror: null,
            isLoaded: false,
            misLoaded: false,
            disIsLoaded: false,
            items: [],
            distr: [],
            res:[],
            sValue: '',
            dValue: '',
            id: 1,

            getCurrentDate: ()=>{

                let newDate = new Date()
                let date = newDate.getDate();
                let month = newDate.getMonth() + 1;
                let year = newDate.getFullYear();
                
                return `${date}-${month<10?`0${month}`:`${month}`}-${year}` 
                },

            statefetch: ()=>{

                fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`) 
                .then(pin => pin.json())
                .then(pind =>{
                    this.setState({
                        isLoaded: true,
                        items: pind.states
                    })
                },
                (error) => {
                    this.setState({
                    isLoaded: true,
                    error
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

              sessfetch: ()=>{

                fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.dValue}&date=${this.state.getCurrentDate()}`) 
                .then(sess => sess.json())
                .then(result =>{
                    this.setState({
                        isLoaded: true,
                        res: result.sessions
                    })
                },
                (merror) => {
                    this.setState({
                    isLoaded: true,
                    merror
                    })
                })
        
              },

              getID: ()=>{
                this.state.id += this.state.id
                return this.state.id
            }

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

        this.state.sessfetch();
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

        const { error, isLoaded, items, distr, res } = this.state;

        const columns = [
            { field: "id", headerName: "ID", width: 100 },
            { field: "col1", headerName: "Name", width: 150 },
            { field: "col2", headerName: "Address", width: 150 },
            { field: "col3", headerName: "From - To", width: 150 },
            { field: "col4", headerName: "FeeType | Fee | Agelimit" , width: 150 },
            { field: "col5", headerName: "Available capacity | Available dose1 | Available dose2", width: 150 },
            { field: "col6", headerName: "Vaccine", width: 150 },

          ];


          console.log("result" + res.length)

        
        

        const rows = res.map((item) => [
            {
                id:this.state.getID(),
                col1:item.name,
                col2:item.address,
                col3: [item.from, item.to],
                col4: [item.fee_type, item.fee, item.min_age_limit],
                col5: [item.available_capacity, item.available_capacity_dose1, item.available_capacity_dose2],
                col6: item.vaccine

            }
        ])

        console.log("value rows " + rows.length)

        // let rows = []

        //   const rows=[
        //         {id:1, col1:"apollo", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:2, col1:"apollo", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:3, col1:"apollo", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:4, col1:"apollo", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:5, col1:"apollo", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:6, col1:"apollo", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:7, col1:"apollo", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:8, col1:"apollo", col2:"secunderabad", col3:"24-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:9, col1:"apollo", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:10, col1:"apollo", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"},
        //         {id:11, col1:"test", col2:"secunderabad", col3:"26-07-2021", col4:18, col5:2009, col6:"covaxin"}
        //   ]


        //   res.map((item)=>

        // for(let i=0;i<res.length;i++){
        //     console.log("value " + i)

        //     rows  = [

        //         {
        //         id:i+1, 
        //         col1:res[i].name,
        //         col2:res[i].address,
        //         col3: [res[i].from, res[i].to],
        //         col4: [res[i].fee_type, res[i].fee, res[i].min_age_limit],
        //         col5: [res[i].available_capacity, res[i].available_capacity_dose1, res[i].available_capacity_dose2],
        //         col6: res[i].vaccine

        //         },
                // rows[i] =RowsProp[i]
            // ]
            // this.setState({id:this.state.id+1})
            // 
        // }
        // console.log("after i "+ rows[2].id)

        // id:item.center_id, 
        // col1:item.name,
        // col2:item.address,
        // col3: [item.from, item.to],
        // col4: [item.fee_type, item.fee, item.min_age_limit],
        // col5: [item.available_capacity, item.available_capacity_dose1, item.available_capacity_dose2],
        // col6: item.vaccine
            // this.setState({this.state.id:this.state.id+1})
            // )
        
            // console.log("rows data" + rows)

            // const rows = [

           
            // res.map(item=>`{ ${id: 1}, ${col1: item.name}, ${col2: item.address}, ${col3: item.from} | ${item.to}, ${col4: item.fee_type} | ${item.fee} | ${item.min_age_limit}, ${col5: item.available_capacity} | ${item.available_capacity_dose1} | ${item.available_capacity_dose2}, ${col6: item.vaccine}, },`)
            
           
        //   ];

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
        
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
                    <option aria-label="None" value=''/>

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
                <div style={{marginTop:'15px', marginBottom:'15px'}}>
                <Button variant="contained" color="primary" onClick={this.searchDist}>Search</Button>
                </div>
                {
                    (res===undefined) ? <div> No vaccine slots available please come back later </div> :
                

                    <div>
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
                                        res.map(item=>(
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






                                {/* <div style={{ height: 600, width: "100%" }}>
                                    <DataGrid rows={rows} columns={columns} />
                                </div> */}

                                {/* {rows.map(item=>(
                                <div style={{ height: 600, width: "100%" }}>
                                    <DataGrid rows={item} columns={columns} />
                                </div>
                                ))} */}

                                {/* {res.map((item, i)=>(
                                <div style={{ height: 600, width: "100%" }}>
                                    <DataGrid rows={
                                        [{
                                            id:i,
                                            col1:item.name,
                                            col2:item.address,
                                            col3: [item.from, item.to],
                                            col4: [item.fee_type, item.fee, item.min_age_limit],
                                            col5: [item.available_capacity, item.available_capacity_dose1, item.available_capacity_dose2],
                                            col6: item.vaccine
                                        },
                                    ]
                                    }
                                    columns={columns} />
                                </div>))
                                
                                } */}



                                {/* {res.map(item=>(
                                    <div style={{marginBottom:'20px'}}>
                                        <div>Center Name: {item.name}</div>
                                        <div>Address: {item.address}</div>
                                        <div>{item.vaccine}: {item.fee}</div>
                                    </div>
                                ))} */}
                    </div>

            
            }
                
            </div>
        )
    }
   
}
}

export default SearchByDistrict
