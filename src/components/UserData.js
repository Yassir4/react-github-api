import React from 'react'
import Loading from './Loading'
class UserData extends React.Component {
    constructor(props) {
        super(props)
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            loading: true,
            data: '',
        }
    }
    componentDidMount() {
        this.fetchData(this.props.data)
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            console.log('the component is updated')
            this.setState({
                display: false
            })
        }
      }
    fetchData(data_url) {
        this.setState({
            loading: true,
            display: false
        })
        fetch(data_url)
            .then(response => response.json())
            .then(data => {
                // data.map(({id, login, avatar_url, html_url }) => {
                //     console.log('the following are ' + login)
                // })
                this.setState({
                    loading: false,
                    display: true,
                    data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if(this.state.display === false){
            return <div></div>
        }
        return (
            <div>
                {this.state.loading === true
                    ? <Loading />
                    : <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {this.state.data.map(({id, login, avatar_url, html_url }) => ( 
                            <li key={id} style={{ margin: 30 }}>
                                <ul>
                                    <li><a href={html_url}>{login}</a></li>
                                    <li>@{avatar_url}</li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                }

            </div>
        )
    }
}

export default UserData