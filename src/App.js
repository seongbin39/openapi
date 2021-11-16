import React from 'react'
import './App.css'
import axios from "axios"
import Food from './Food'
import Button from './Button'

class App extends React.Component {
  state = {
    isLoading: true,
    data: [],
    numOfRows: 5,
    pageNo: 1,
    pageSize: null
  }
  
  getFood() {
    const API_KEY = process.env.REACT_APP_API_KEY
    const url = `http://data.ex.co.kr/openapi/business/representFoodServiceArea?key=${API_KEY}&type=json&numOfRows=${this.state.numOfRows}&pageNo=${this.state.pageNo}`
    
    axios.get(url).then((res) => {
      const data = res.data.list
      const pageSize = res.data.pageSize
      // const pageNo = res.data.pageNo

      //console.log(data)
      //console.log(pageSize)
      //console.log(pageNo)

      this.setState({
        isLoading: false,
        data: data,
        pageSize: pageSize,
      })
    })
  }

  nextPage = () => {
    const nextPage = this.state.pageNo +1
    this.setState({pageNo: nextPage<=this.state.pageSize? nextPage : this.state.pageNo}, () => {
      this.getFood() 
      console.log(this.state.pageNo)
    })
  }

  prevPage = () => {
    const prevPage = this.state.pageNo -1
    this.setState({pageNo: (prevPage>0) ? prevPage : this.state.pageNo+0}, () => {
      this.getFood()
      console.log(this.state.pageNo)
    })
  }

  changeRows = () => {
    this.setState({numOfRows: this.state.numOfRows===10? this.state.numOfRows=5 : this.state.numOfRows=10})
    this.getFood()
    console.log(this.state.numOfRows)
  }

  componentDidMount() {
    this.getFood()
  }

  render() {
    const {isLoading, data, pageNo, pageSize} = this.state
    const {nextPage, prevPage, changeRows} = this

    return(
      <div className="App">
        {isLoading ? (
          <div>
            <span>Loading...</span>
          </div>
        ): (
          <div>
            {data.map((d,cnt) => {
              return (
                <Food
                key = {data[cnt].id}
                serviceAreaName = {data[cnt].serviceAreaName}
                svarAddr = {data[cnt].svarAddr}
                // batchMenu = {data[cnt].batchMenu}
                // salePrice = {data[cnt].salePrice}
                batchMenu = {data[cnt].batchMenu===null? data[cnt].batchMenu='정보없음':data[cnt].batchMenu}
                salePrice = {data[cnt].salePrice===null? data[cnt].salePrice='정보없음':data[cnt].salePrice}
                >
              </Food>
              )
            })}
            <Button handleClick={prevPage}>이전 페이지</Button>
            {pageNo}/{pageSize}
            <Button handleClick={nextPage}>다음 페이지</Button>
            <Button handleClick={changeRows}>{this.state.numOfRows===10? 5:10}개씩 보기</Button>
          </div>
        )}
      </div>
    )
  }
}

export default App;
