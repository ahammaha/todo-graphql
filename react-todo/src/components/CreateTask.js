import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ListTasks from './ListTasks'

const Tasks_Query =  gql`
  {
    tasks {
      id
      title
      description
      createdBy
      status
    }
  }
`;

const CREATE_TASK_MUTATION = gql`
  mutation InsertTask($id: Int!, $title: String!, $description: String!, $createdBy: Int!){
    insert_task(objects:{id: $id, title: $title, description: $description, status:"incomplete", created_by: $createdBy}) {
      returning{
        id
        title
        description
        status
        created_by
      }
    }
  }
`


class Tasks extends React.Component{
  state = {
    id: 10,
    title: '',
    description: '',
    createdBy: 1,
    data:""
  }

  render(){
    const {id, title, description, createdBy} = this.state

    return(
      <div className="TodoContainer">
          <div>
            <input
              className="mb2"
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
              type="text"
              placeholder="Task name"
            />
            <input
              className="mb2"
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
              type="text"
              placeholder="Task description"
            />
            <Mutation mutation={CREATE_TASK_MUTATION}
                      variables={{ id, title, description, createdBy }}>
              {(insertTask, {data}) => (
                <button onClick={insertTask}>Submit</button>
              )}
            </Mutation>
            <ListTasks />
          </div>
      </div>
    )
  }
}

export default Tasks;
