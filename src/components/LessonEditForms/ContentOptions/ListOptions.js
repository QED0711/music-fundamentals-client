import React, {Component} from 'react';



// ListItemInput Component

const ListItemInput = (props) => {
    let {newItem} = props
    return(
        <div>
            <textarea className="new-content-data" defaultValue="" onChange={newItem}></textarea>
            <br/>
        </div>
    )

}



class ListOptions extends Component {
    constructor(props){
        super(props);
        this.listItemCount = this.listItemCount.bind(this);
        this.state= {
            listItems: [<ListItemInput key={0} newItem={this.listItemCount} />]
        }
    }

    listItemCount(){
        let items = [...document.getElementsByClassName("new-content-data")];
        if(items[items.length - 1].value !== ""){
            let listItems = [...this.state.listItems]
            listItems.push(<ListItemInput key={this.state.listItems.length + 1} newItem={this.listItemCount} />)
            this.setState({
                listItems
            })

        }
    }

    // need to figure out a way to add a new textarea element whenever the last textarea element is typed in

    render(){
        return(
            <div id="content-edit-options">
                <label>text</label><br/>
                {/* <textarea className="new-content-data" required onChange={this.listItemCount}></textarea> */}
                {this.state.listItems}
                <br/>
                <label>Position (optional)</label><br/>
                <input id="new-content-position" type="number"/>
            </div>
        )
    }

}

export default ListOptions;