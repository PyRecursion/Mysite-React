import React from 'react'
import { connect } from 'react-redux'


import { AutoComplete, Input, Button, Icon } from 'antd';
import { seachSuggestMusic} from '../../api';
import { reqSeachList } from '../../redux/actions';
// import { handerTime, handersinger } from '../../utils/handerSongs';




class SeachTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            dataSource: [],
            SuggestMusics: []
        };
    }



    onSearch = searchText => {
        console.log(searchText)
        this.setState({
            dataSource: !searchText ? [] : this.state.dataSource,
        });
    };

    onChange = async value => {
        this.setState({ value })
        if (value) {
            const result = await seachSuggestMusic(value)
            // var SuggestMusics=[]
            if (result.code === 200) {
                const songs = result.result.songs
                if (songs) {
                    var dataSource = songs.map(item => item.name + " " + item.artists[0].name)
                    this.setState({
                        dataSource,
                    })
                }
            }
        }
    }



    onSelect = value => {
        console.log('onSelect', value);
        if (value) {
             this.props.reqSeachList(value)
        }
    }

    render() {
        const { dataSource, value } = this.state;
        return (
            <div className="certain-category-search-wrapper" style={{ width: 250 }}>
                <AutoComplete
                    value={value}
                    dataSource={dataSource}
                    style={{ width: 200 }}
                    onSelect={this.onSelect}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    placeholder=""
                >

                    <Input
                        suffix={
                            <Button
                                className="search-btn"
                                style={{ marginRight: -12, height: 32 }}
                                size="large"
                                type="primary"
                            >
                                <Icon type="search" />
                            </Button>
                        }
                    />
                </AutoComplete>

            </div>
        );
    }
}

export default connect(
    state => ({songList:state.songList}),
    {reqSeachList}
)(SeachTool)