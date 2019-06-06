import React, { Component } from 'react';
 

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            playlistsUser1: [],
            users: [],
            shares: [],
            isLoaded: false,
        }
    }


    componentDidMount() {

        fetch('https://aij27ag0j6.execute-api.us-west-2.amazonaws.com/dev/playlists')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    playlists: json,
                })
            });

        fetch('https://aij27ag0j6.execute-api.us-west-2.amazonaws.com/dev/playlists/by-user/1')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    playlistsUser1: json,
                })
            }); 

        fetch('https://aij27ag0j6.execute-api.us-west-2.amazonaws.com/dev/users')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    users: json,
                })
            });

        fetch('https://aij27ag0j6.execute-api.us-west-2.amazonaws.com/dev/shares')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    shares: json,
                })
            });         
    }

    render() {
        
        var { isLoaded, playlists, playlistsUser1, users, shares } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>
        } 

        else {

            return (
                <div className="Playlists">
                    "   Top Playlists   "

                    <ul>
                        {playlists.map(playlist => (
                            <li key={playlist.text}>
                                Playlist: {playlist.text} | Created by User: {playlist.user}
                            </li>
                        ))}
                    </ul>

                    "   User 1's Playlists   "
                    <ul>
                        {playlistsUser1.map(playlist => (
                            <li key={playlist.text}>
                                Playlist: {playlist.text} | Created by User: {playlist.user}
                            </li>
                        ))}
                    </ul>

                    "   Find a Friend   "
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                Username: {user.username} | Name: {user.name}
                            </li>
                        ))}
                    </ul>

                    "   Social Activity   "
                    <ul>
                        {shares.map(share => (
                            <li key={share.id}>
                                User ID: {share.id} | Shared: {share.playlistName} | With: {share.sharedWith}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

}

export default App;
