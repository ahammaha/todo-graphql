import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Int!){
    delete_task(where:{id:{_eq:$id}}) {
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
const UPDATE_TASK_STATUS_MUTATION = gql`
  mutation UpdateTask($id: Int!, $status: String!){
    update_task(where:{id:{_eq:$id}}, _set:{status:$status}) {
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


class Task extends React.Component{
  render(){
    let incomplete="incomplete";
    let complete="complete";
    const id=parseInt(this.props.task.id)
    return(
      <tr>
        <td>
          {this.props.task.status=="incomplete"?
            <Mutation mutation={UPDATE_TASK_STATUS_MUTATION} variables={{ id, status:complete }}>
              {updateTask=> <button onClick={updateTask}>Incompleted</button>}
            </Mutation> :
            <Mutation mutation={UPDATE_TASK_STATUS_MUTATION} variables={{ id, status:incomplete }}>
              {updateTask => <button onClick={updateTask}>Completed</button>}
            </Mutation>
          }
        </td>
        <td>{this.props.task.title}</td>
        <td>
          <Mutation mutation={DELETE_TASK_MUTATION} variables={{ id }}>
            {deleteTask => <button className="deleteTask" onClick={deleteTask}>Delete</button>}
          </Mutation>
        </td>
      </tr>
    )
  }
}

export default Task
