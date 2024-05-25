import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Button, Table } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const UsersManager = () => {
   const [users, setUsers] = useState([])

   useEffect( () => {
    getAllUser()
   }, [])

   const getAllUser = async () => {
      try {
         const res = await fetch(`${BASE_URL}/users`, {
            method:'get',
            headers: {
               'content-type':'application/json',
               "Access-Control-Allow-Origin": "*/*"
            },
            credentials:'include',
         })

         const result = await res.json()
         if(!res.ok) alert(result.message)
         console.log(result.data)
         setUsers(result.data ?? [])

      } catch(err) {
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='12' className='pt-5 text-center'>
                  <div className="thank__you">
                     <span><i className='ri-checkbox-circle-line'></i></span>
                     <h1 className='mb-3 fw-semibold'>User Manager</h1>
                     <Table>
                        <thead>
                           <tr>
                              <th>#</th>
                              <th>Username</th>
                              <th>Email</th>
                              <th>Role</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              users.map((item, index) => <tr>
                                 <th>{index}</th>
                                 <td>{item.username ?? ''}</td>
                                 <td>{item.email ?? ''}</td>
                                 <td>{item.role ?? ''}</td>
                              </tr>)
                           }
                        </tbody>
                     </Table>
                     <Button className='btn primary__btn w-25'><Link to='/home'>Back To Home</Link></Button>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default UsersManager