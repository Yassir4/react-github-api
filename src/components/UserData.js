import React from 'react'

class UserData extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.data)


    }

    render() {
        let name;
        console.log('hey')
        fetch("https://api.github.com/users/Yassir4/following")
            .then(response => response.json())
            .then(data => {
                console.log("helo" + data)
            })
            .catch(function(error) {
                console.log(error);
            });
        return (
            <ul>
                <li>

                </li>
            </ul>
        )
    }
}

export default UserData