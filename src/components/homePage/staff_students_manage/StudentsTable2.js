import React, {useState, useEffect} from "react";
import { Table,  Input, Button,  Menu, Dropdown, Row, Col, Modal} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from "styled-components";
import ModalStudent from './AddStudentModal'
import ActionButton from './ActionButton'

// import { VariableSizeGrid as Grid } from 'react-window';
// import ResizeObserver from 'rc-resize-observer';
// import classNames from 'classnames';

const TabsContent = styled.div`
  margin: '0 20px';
`;

const HeaderStyle = styled.div`
  padding: 20px;

`;

const AddStudentStyle = styled.div`
  display: flex; 
  justify-content: flex-end; 
  align-items: center;
  padding: 0 10px;
  p{
    margin: 10px; 
    padding: 10px;
  }

  @media (max-width: 576px) {
    justify-content: flex-start; 
    ${'' /* justify-content: center;  */}
  }
`;

const DropDownStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px; 

  @media (max-width: 576px) {
    justify-content: flex-start; 
    ${'' /* justify-content: center;  */}
    margin-left: 20px;
  }
`;


// Search
const { Search } = Input;

const onSearch = value => console.log(value);

const StudentsTable = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({});

  useEffect(() => {
    fetch('https://forked-student-dashboard.herokuapp.com/students', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(
      data => {
        console.log(data);
        setStudents(data)
      }
    )
    .catch(err => console.error(err));
  }, [])

  // Table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      sorter: {
          compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Course',
      dataIndex: 'course',
    },
  ];

  const data = [];
  students.map( student => (
    data.push({
      key: student.student_id,
      id: student.student_id,
      name: student.first_name + ' ' + student.last_name,
      email: student.user.email,
      course: student.student_course.course.course_name,
    })
  ))
  // for (let i = 1; i <=20; i++) {
  //   data.push({
  //     key: i,
  //     id: i,
  //     name: `Edward Smith`,
  //     email: 'email@email.com',
  //     course: `Sunrise`,
  //   });
  // }

  const onSelectChange = selectedRowKey => {
      console.log('selectedRowKeys changed: ', selectedRowKey);
      setSelectedRowKeys(selectedRowKey);
      // setStudent(students.)
  }; 

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange, 
  };

  return (
    <TabsContent>
      <Row>
        <Col 
          xs={24}
          sm={12}
          md={12}
          lg={12}
        >
        <HeaderStyle>
          <h3 style={{fontWeight: 'bold'}}>CTD Students's  List</h3>
          <Search
            placeholder="Search"
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </HeaderStyle>
              
        </Col>
        <Col 
          xs={24}
          sm={12}
          md={12}
          lg={12}
        >
          <AddStudentStyle>
            <p>Add Student</p>
            <ModalStudent/>
          </AddStudentStyle>
          <DropDownStyle>
           <ActionButton students={students}/>
          </DropDownStyle>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table 
            pagination={{ pageSize: 10 }} 
            style={{margin: '20px 10px'}} 
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={data} 
            // scroll={{ x: 1000 }}
            scroll={{ y: 1000, x: 800}}
          />

        </Col>
      
      </Row>
    </TabsContent>
  );

}

export default StudentsTable;