import React, {Component} from 'react';



// ListItemInput Component

const ListItemInput = ({newItem, data}) => {
    return(
        <div>
            <textarea className={data ? "edit-content-data" : "new-content-data"} defaultValue={data && (data || "")} onChange={newItem}></textarea>
            <br/>
        </div>
    )

}



class ListOptions extends Component {
    constructor(props){
        super(props);

        this.listItemCount = this.listItemCount.bind(this);
        
        let listItems = []
        if(this.props.content){
            let data
            for(let i = 0; i < this.props.content.data.length; i++){
                data = this.props.content.data[i]
                listItems.push(<ListItemInput key={i} newItem={this.listItemCount} data={data}/>)
            }
        } else {
            listItems = [<ListItemInput key={0} newItem={this.listItemCount} />]
        } 
        
        this.state = {
            listItems
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


    render(){
        return(
            <div id="content-edit-options">
                <label>text</label><br/>
                {this.state.listItems}
                <br/>
                <label>Position (optional)</label><br/>
                <input id={this.props.content ? "edit-content-position" : "new-content-position"} type="number"/>
            </div>
        )
    }

}

export default ListOptions;