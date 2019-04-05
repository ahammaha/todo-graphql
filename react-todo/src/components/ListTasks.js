import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Task from './Task'

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


class ListTasks extends React.Component{
  state = {
    id: 10,
    title: '',
    description: '',
    createdBy: 1
  }

  render(){
    const {id, title, description, createdBy} = this.state

    return(
      <div className="TodoContainer">
          <Query query={Tasks_Query}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
              const tasks = data.tasks
              return (
                <table>
                  {tasks.map(
                      task => <Task key={task.id} task={task} />
                    )
                  }
                </table>
              )
            }}
          </Query>
      </div>
    )
  }
}

export default ListTasks;
