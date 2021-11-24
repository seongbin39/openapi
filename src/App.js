import React, { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import Food from './Food'
import Button from './Button'
import Sms from './RealTimeSms'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [numOfRows, setNumOfRows] = useState(99)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(null)
  
  useEffect( () => {
    // GetFood(foodId).then(data => setData(data))
    const API_KEY = process.env.REACT_APP_API_KEY
    const url = `http://data.ex.co.kr/openapi/business/representFoodServiceArea?key=${API_KEY}&type=json&numOfRows=${numOfRows}&pageNo=${pageNo}`
    axios.get(url).then(async (res) => {
      const data = res.data.list
      const pageSize = res.data.pageSize
      const pageNo = res.data.pageNo
      // setData(...data, data)

      // console.log(pageNo)
      
      setIsLoading(false)
      setData(data)
      console.log(data)
      setPageSize(pageSize)

      // const res2 = axios.get(`http://data.ex.co.kr/openapi/business/representFoodServiceArea?key=${API_KEY}&type=json&numOfRows=${numOfRows}&pageNo=2`)
      // .then(async (res) => {
      //   const data2 = res.data.list
      //   const temp = data.concat(...data2)
      //   const res3 = axios.get(`http://data.ex.co.kr/openapi/business/representFoodServiceArea?key=${API_KEY}&type=json&numOfRows=${numOfRows}&pageNo=3`)
      //   .then((res) => {
      //     const data3 = res.data.list
      //     const full = temp.concat(data3)
      //     setData(full)

      //     setQuery('부산')

      //     console.log(full)
      //     // console.log(data.direction)
      //   })
      // })

    })
  },[])

  // const foodUI = 
  //     console.log(data[0].serviceAreaName)
  //     // .filter(data => {
  //     //   const direction = data.direction   
  //     //   const q = query
  //     //   return direction.includes('부산')
  //     // })
      
  //     data.map((data,cnt) => {
  //       <Food
  //         key = {cnt}
  //         serviceAreaName = {data.serviceAreaName}
  //         svarAddr = {data.svarAddr}
  //         batchMenu = {data.batchMenu}
  //         salePrice = {data.salePrice} />
  //     })

  return(
    <div className="App">
      {isLoading ? (
        <div>
          <span>Loading...</span>
        </div>
      ): (
        <div>
          {data
          .filter(data => {
            const direction = data.routeCode
            const q = '0010'
            return direction.includes(q)
          })
          .map((d,cnt) => {
            return (
              <Food
              key = {cnt}
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
            
          {/* <Button handleClick={prevPage}>이전 페이지</Button> */}
          {/* {pageNo}/{pageSize} */}
          {/* <Button handleClick={nextPage}>다음 페이지</Button> */}
        </div>
      )}
    </div>
  )
}

// class App extends React.Component {
//   state = {
//     isLoading: true,
//     data: [],
//     numOfRows: 5,
//     pageNo: 1,
//     pageSize: null
//   }

//   getRealTimeSms() {
//     const API_KEY = process.env.REACT_APP_API_KEY
//     const url = `http://data.ex.co.kr/openapi/burstInfo/realTimeSms?key=${API_KEY}&type=json&numOfRows=10&pageNo=1&sortType=desc&pagingYn=Y` 

//     axios.get(url).then((res) => {
//       const data = res.data.realTimeSMSList
//       const pageSize = res.data.pageSize

//       this.setState({
//         isLoading: false,
//         data: data,
//         pageSize: pageSize,
//       }, () => {console.log(data)})
//     })
//   }

//   componentDidMount() {
//     this.getRealTimeSms()
//   }

//   render() {
//     const {isLoading, data, pageNo, pageSize} = this.state
//     const {nextPage, prevPage} = this

//     return(
//       <div className="App">
//         {isLoading ? (
//           <div>
//             <span>Loading...</span>
//           </div>
//         ): (
//           <div>
//             {data.map((d,cnt) => {
//               return (
//                 <Sms
//                 key = {cnt}
//                 smsText = {data[cnt].smsText}
//                 >
//               </Sms>
//               )
//             })}
//           </div>
//         )}
//       </div>
//     )
//   }
// }

  // const nextPage = () => {
  //   const nextPage = pageNo +1
  //   setPageNo(() => {
  //     return (nextPage<=pageSize) ? nextPage : pageNo
  //   })
  // }

  // const prevPage = () => {
  //   const prevPage = pageNo -1
  //   setPageNo((prevPage>0) ? prevPage : pageNo+0)
  // }

  // const changeRows = () => {
  //   setNumOfRows(numOfRows===10? numOfRows=5 : numOfRows=10)
  // }

export default App;
