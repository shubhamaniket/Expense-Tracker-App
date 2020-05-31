import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,TextInput,ActivityIndicator, Dimensions, ScrollView, FlatList, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
const {width,height} = Dimensions.get('window');
console.disableYellowBox = true;
export default class App extends React.Component{
  state = {
    desc : '',
    amount : null,
    data : [],
    loading : true,
    showModal : false,
    id : '',
    updatetext : '',
    updateamount : null
  }
  componentDidMount(){
    var temp = []
    fetch('http://192.168.1.6:3000/getAll',{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    .then((response)=>response.json())
    .then((responsejson)=>{
      this.setState({
        data : responsejson,
        loading : false,
      })
    })
  }
  addTransaction = () => {
    fetch('http://192.168.1.6:3000/createTrans',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        text : this.state.desc,
        amount : this.state.amount
      })
    })
    .then((response)=>response.json())
    .then((responsejson)=>{
      if(responsejson.error){
        alert(responsejson.error[0])
      }
      else{
        this.componentDidMount()
      }
    })
  }
  deleteTransaction = (id) => {
    fetch(`http://192.168.1.6:3000/deleteTrans/${id}`,{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    .then((response)=>response.json())
    .then((responsejson)=>{
      if(responsejson.error){
        alert(responsejson.error)
      }
      else{
        this.componentDidMount()
      }
    })
  }
  updateTransaction = (id) => {
    fetch(`http://192.168.1.6:3000/updateTrans/${id}`,{
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        text : this.state.updatetext,
        amount : this.state.updateamount
      })
    })
    .then((response)=>response.json())
    .then((responsejson)=>{
      if(responsejson.message){
        alert("Enter amount or description to update !")
      }
      else{
        this.componentDidMount();
        this.setState({
          showModal : false
        })
      }
    })
  }
  render(){
    if(this.state.loading){
      return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator size="large" color="cyan"/>
        </View>
      );
    }
    else{
      var count = this.state.data.count;
      var temp=[];
      var income = [];
      var expense = [];
      var sum = 0,incomesum=0,expensesum=0;
      for(var i=0;i<count;i++){
        if(this.state.data.data[i].amount >= 0){
          income.push(this.state.data.data[i].amount)
        }
        else{
          expense.push(this.state.data.data[i].amount)
        }
      }
      for(var i=0;i<(income.length);i++){
        incomesum = incomesum + income[i];
      }
      for(var i=0;i<(expense.length);i++){
        expensesum = expensesum + expense[i];
      }
      sum = incomesum + expensesum;
      return(
          <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1}} contentContainerStyle={{width:width,height:950}}>
            <Modal isVisible={this.state.showModal}>
              <View style={{ flex:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#fff' }}>
                <TouchableOpacity style={{flex:0.5,width:'100%',justifyContent:'center',alignItems:'flex-end'}} onPress={()=>this.setState({
                  showModal : false
                })}>
                  <Image source={require('./assets/close.png')} style={{width:20,height:20,margin:10}}/>
                </TouchableOpacity>
                <View style={{flex:3,width:'100%',alignItems:'center'}}>
              <Text style={{fontSize:20,fontWeight:'bold',letterSpacing:-0.5}}>Update Transaction</Text>
                <View style={{width:width-50,height:50,fontSize:20,backgroundColor:'#fff',marginTop:15,borderWidth:1,borderColor:'cyan'}}>
                  
                    <TextInput placeholder="Enter Description Here !" onChangeText={(text)=>{
                      this.setState({
                        updatetext : text
                      })
                    }}/>
                  </View>
                  <View style={{width:width-50,height:50,fontSize:20,backgroundColor:'#fff',marginTop:15,borderWidth:1,borderColor:'cyan'}}>
                    <TextInput placeholder="Enter Amount" onChangeText={(text)=>{
                      this.setState({
                        updateamount : text
                      })
                    }}/>
                  </View>
                  <TouchableOpacity style={styles.btn} onPress={()=>this.updateTransaction(this.state.id)}>
                    <Text style={{fontSize:15}}>Add Transaction</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
              <View style={styles.container}>
                  <Text style={styles.header}>Expense Tracker</Text>
                  <Text style={{fontSize:18,marginBottom:15}}>YOUR BALANCE</Text>
                  <Text style={{fontSize:30,fontWeight:'bold'}}>Rs {sum}</Text>
                  <View style={styles.card}>
                    <View style={{flex:0.97,borderRightWidth:1,borderRightColor:'grey',margin:8,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:15,marginBottom:5}}>INCOME</Text>
                      <Text style={{color:'green',fontWeight:'bold',fontSize:15}}>Rs {incomesum}</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:15,marginBottom:5}}>EXPENSE</Text>
                      <Text style={{color : 'red',fontWeight:'bold',fontSize:15}}>Rs {Math.abs(expensesum)}</Text>
                    </View>
                  </View>
                  <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'flex-start',marginTop:25,marginLeft:25,borderBottomWidth:1}}>Add New Transaction</Text>
                  <View style={{width:width-50,height:50,fontSize:20,backgroundColor:'#fff',marginTop:15,borderWidth:1,borderColor:'cyan'}}>
                    <TextInput placeholder="Enter Description Here !" onChangeText={(text)=>{
                      this.setState({
                        desc : text
                      })
                    }}/>
                  </View>
                  <View style={{width:width-50,height:50,fontSize:20,backgroundColor:'#fff',marginTop:15,borderWidth:1,borderColor:'cyan'}}>
                    <TextInput placeholder="Enter Amount" onChangeText={(text)=>{
                      this.setState({
                        amount : text
                      })
                    }}/>
                  </View>
                  <TouchableOpacity style={styles.btn} onPress={()=>this.addTransaction()}>
                    <Text style={{fontSize:15}}>Add Transaction</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize:16,marginBottom:15,fontWeight:'bold',alignSelf:'flex-start',marginTop:25,marginLeft:25,borderBottomWidth:1}}>History</Text>
                    <View style={{flex:1}}>
                        <FlatList
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                      data = {this.state.data.data}
                      renderItem={({item})=>{
                        return(
                            <View style={styles.history}>
                              <View style={styles.text}>
                                <Text style={{fontSize:15}}>{item.text}</Text>
                              </View>
                              <View style={styles.amount}>
                                <Text style={{fontSize:15}}>Rs  {item.amount}</Text>
                              </View>
                              <View style={{flex:1,flexDirection:'row'}}>
                                <TouchableOpacity onPress={()=>this.deleteTransaction(item._id)} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#93F393'}}>
                                  <Image source={require('./assets/trash.png')} style={{width:25,height:25}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{
                                  this.setState({
                                    showModal : true,
                                    id : item._id
                                  })
                                }} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'cyan'}}>
                                  <Image source={require('./assets/pencil.png')} style={{width:25,height:25}}/>
                                </TouchableOpacity>
                              </View>
                            </View>
                        );
                      }}
                      keyExtractor={item => item._id}
                      />
                    </View>
                  </View>
          </ScrollView>
          </SafeAreaView>
    );
    }
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
  },
  header : {
    fontSize : 30,
    fontWeight : 'bold',
    marginTop : 20,
    marginBottom : 20
  },
  card : {
    marginTop : 20,
    width : width - 50,
    height : 100,
    elevation : 5,
    backgroundColor : '#fff',
    flexDirection : 'row'
  },
  btn : {
    width : 125,
    height : 50,
    backgroundColor : 'cyan',
    justifyContent : 'center',
    alignItems:'center',
    marginTop : 20,
    borderRadius : 10
  },
  transactions : {
    width : width-50,
    backgroundColor : '#fff',
    marginTop : 20
  },
  history : {
    width : width - 50,
    height : 50,
    backgroundColor : '#fff',
    marginBottom : 12,
    elevation : 5,
    borderWidth : 1,
    borderColor : 'orange',
    flexDirection:'row'
  },
  text : {
    flex:2,
    alignItems:'flex-start',
    marginLeft : 10,
    justifyContent:'center'
  },
  amount : {
    flex:2,
    alignItems:'center',
    justifyContent:'center'
  }
})