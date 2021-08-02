// import { react } from '@babel/types';
import React from 'react';
import {Component} from 'react';

class DataComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

      componentDidMount() {
        fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
          .then(res => res.json())  /*{res.json(); console.log("res Json result" + res)}*/
          .then(result =>{                                                                /*data => console.log("the result is " + data),*/
               
              this.setState({
                isLoaded: true,
                items: result.states
                
              });
              
              
            },
            
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }


    render(){
        const { error, isLoaded, items } = this.state;
        console.log(this.state)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.state_id}>
              {item.state_name} 
            </li>
          ))}
        </ul>

        
        // <div>
        //     loaded{console.log("render"+items)}
        // </div>

      );
    }

    }
}

export default DataComponent;