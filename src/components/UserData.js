import React from 'react'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";

class UserData extends React.Component {
    constructor(props) {
        super(props)
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            loading: true,
            data: '',
            hasMore: true,
            nextDataPage: 2
        }
    }
    componentDidMount() {
        this.fetchData(this.props.data)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
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
    // infinite scrolling
    fetchMoreData = () => {
        if (this.state.hasMore === true) {
            let num = this.state.nextDataPage;
            setTimeout(() => {
                fetch(`${this.props.data}?page=${num}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length > 0) {
                            this.setState((prevState) => ({
                                hasMore: true,
                                nextDataPage: num + 1,
                                data: prevState.data.concat(data)
                            }))
                        } else {
                            this.setState({
                                hasMore: false,
                                nextDataPage: 2,
                            })
                        }
                    })
            }, 1500);
        }
    }


    render() {
        if (this.state.display === false) {
            return <div></div>
        }
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.data.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {this.state.loading === true
                        ? <Loading />
                        :
                        <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {this.state.data.map(({ id, login, avatar_url, html_url }) => (

                                <li key={id} style={{ margin: 30 }}>
                                    <ul>
                                        <li><a href={html_url}>{login}</a></li>
                                        <li>@{avatar_url}</li>
                                    </ul>
                                </li>
                           
                        ))}
                    </ul>
                    }
                    </InfiniteScroll>
            </div>
                )
            }
        }
        
export default UserData