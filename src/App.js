import React,{Component} from 'react';
import axios from 'axios';
import { Card, Button,Modal } from 'antd';
let visible=true

class App extends Component {
  state={
    data:[],
    displayMOdalData:null,
    visible:false
  }
  componentDidMount(){
    axios.get("http://localhost:3333/members").then(res=>{
      this.setState({
        data:res.data
      })
    })
  }
  handleClick=(item)=>{
    this.setState({
      visible:true,
      displayMOdalData:item
    })
    
  }
  render(){
const {data,displayMOdalData,visible}=this.state
const activityCards=data.map(item=>{
  return <div>
  <Card title={"Real Name:"+""+item.real_name} 
  bordered={true} 
  style={{ width: 700,
  position:"relative",
  left:"5%",
  top:"50px" ,
  marginBottom:"10px"
  }} onClick={()=>this.handleClick(item)}>
<p>Place:{ item.tz}</p>
</Card>
  </div>
})

const displayActivityPeriod=displayMOdalData&&
displayMOdalData.activity_periods&&displayMOdalData.activity_periods.map(period=>{
  return <>
<p>{period.start_time} To {period.end_time}</p>
<p></p>
</>
})
  return (
    <div className="App">
      {activityCards}
      {displayMOdalData?<> 
        <Modal
          title={displayMOdalData.real_name}
          visible={visible}
          onCancel={()=>this.setState({visible:false})}
          onOk=""
          maskClosable={()=>this.setState({visible:false})}
        >
          {displayActivityPeriod}
        </Modal>
      </>:null}
    </div>
  );
  }
}

export default App;
