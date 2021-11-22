import React from 'react'
import './App.css'
import axios from 'axios'
import Slider from 'react-slick'
import Button from './Button'
import Sms from './RealTimeSms'

class App2 extends React.Component {
    state = {
      isLoading: true,
      data: [],
      numOfRows: 5,
      pageNo: 1,
      pageSize: null
    }
  
    getRealTimeSms() {
      const API_KEY = process.env.REACT_APP_API_KEY
      const url = `http://data.ex.co.kr/openapi/burstInfo/realTimeSms?key=${API_KEY}&type=json&numOfRows=10&pageNo=1&sortType=desc&pagingYn=Y` 
  
      axios.get(url).then((res) => {
        const data = res.data.realTimeSMSList
        const pageSize = res.data.pageSize
  
        this.setState({
          isLoading: false,
          data: data,
          pageSize: pageSize,
        }, () => {console.log(data)})
      })
    }
  
    componentDidMount() {
      this.getRealTimeSms()
    }
  
    render() {
      const {isLoading, data, pageNo, pageSize} = this.state
      const {nextPage, prevPage} = this
      const settings = {
        dots: false,
        infinite: true,
        speed: 10,
        slidesToShow: 4,
        slidesToScroll: 1
      }
  
      return(
        <div className="App">
          {isLoading ? (
            <div>
              <span>Loading...</span>
            </div>
          ): (
            <div>
              <Slider>
              {data.map((d,cnt) => {
                return (
                  <Sms
                  key = {cnt}
                  accDate = {data[cnt].accDate}
                  accHour = {data[cnt].accHour}
                  roadNM = {data[cnt].roadNM}
                  startEndTypeCode = {data[cnt].startEndTypeCode}
                  accPointNM = {data[cnt].accPointNM}
                  accType = {data[cnt].accType}
                  smsText = {data[cnt].smsText}                 
                  >
                  </Sms>
                )
              })}
              </Slider>
            </div>
          )}
        </div>
      )
    }
  }

  export default App2;